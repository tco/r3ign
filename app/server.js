// Core modules
import path         from 'path';
import http         from 'http';

// Express and modules
import Express      from 'express';
import compression  from 'compression';
import CookieDough  from 'cookie-dough';
import cookieParser from 'cookie-parser';
import staticServer from 'serve-static';

// React
import React                        from 'react';
import ReactDOM                     from 'react-dom/server';
import { Provider }                 from 'react-redux';
import { RoutingContext, match }    from 'react-router';

// Redux
import createStore  from './redux/create.js';

// Radium
import ConfiguredRadium                     from './configuredRadium.js';
import { create as createMatchMediaMock }   from 'match-media-mock';

// Routing
import getRoutes    from './routes.js';

// Tools
import {
    ApiClient,
    getStatusFromRoutes,
    fetchAllData
} from 'tools';

// Containers
import HTML from './containers/HTML.jsx';

const app = new Express(),
    server = new http.Server(app),
    staticsPath = path.join(__dirname, '..', 'static'),
    matchMediaMock = createMatchMediaMock();

ConfiguredRadium.setMatchMedia(matchMediaMock);

app.use(compression());
app.use(cookieParser());
app.use(staticServer(staticsPath));

app.use((request, response) => {
    if(__DEVELOPMENT__) {
        // Do not cache webpack stats: the script file would change since
        // hot module replacement is enabled in the development env
        webpackIsomorphicTools.refresh();
    }

    const client = new ApiClient(request),
        cookies = new CookieDough(request),
        store = createStore(client, {
            cookies: cookies.all()
        });

    ConfiguredRadium.setUserAgent(request.headers['user-agent']);

    matchMediaMock.setConfig({
        type: 'screen',
        width: cookies.get('screenWidth') + 'px',
        height: cookies.get('screenHeight') + 'px'
    });

    function doctypify(content) {
        return '<!DOCTYPE html>\n' + content;
    }

    function hydrateOnClient() {
        response.send(doctypify(
            ReactDOM.renderToString(<HTML assets={ webpackIsomorphicTools.assets() } store={ store } />)
        ));
    }

    if(__DISABLE_SSR__) {
        hydrateOnClient();
        return;
    }

    match({ routes: getRoutes(store), location: request.originalUrl }, (error, redirectLocation, renderProps) => {
        if(redirectLocation) {
            response.redirect(redirectLocation.pathname + redirectLocation.search);
        } else if(error) {
            console.error('ROUTER ERROR:', error);
            response.status(500);
            hydrateOnClient();
        } else if(!renderProps) {
            response.status(500);
            hydrateOnClient();
        } else {
            fetchAllData(
                renderProps.components,
                store.getState, store.dispatch,
                renderProps.location,
                renderProps.params
            ).then(() => {
                const component = (
                    <Provider store={ store } key="provider">
                        <RoutingContext { ...renderProps } />
                    </Provider>
                );

                const status = getStatusFromRoutes(renderProps.routes);
                if (status) {
                    response.status(status);
                }
                response.send(doctypify(
                    ReactDOM.renderToString(
                        <HTML assets={ webpackIsomorphicTools.assets() } component={ component } store={ store } />
                    )
                ));
            }).catch((error) => {
                console.error('DATA FETCHING ERROR:', error);
                response.status(500);
                hydrateOnClient();
            });
        }
    });
});

server.listen(process.env.PORT || 3000, (error) => {
    if (error) {
        console.error(error);
    }
    console.info('Server is running on port %s.', process.env.PORT || 3000);
});
