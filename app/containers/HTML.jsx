import React, { Component, PropTypes }  from 'react';
import ReactDOM                         from 'react-dom/server';
import serialize                        from 'serialize-javascript';

export default class HTML extends Component {
    static propTypes = {
        assets: PropTypes.object,
        component: PropTypes.node,
        store: PropTypes.object
    };

    render() {
        const { assets, component, store } = this.props;
        const content = component ? ReactDOM.renderToString(component) : '';

        return (
            <html lang="en-us">
                <head>
                    <meta charSet="utf-8" />

                    <title>R3IGN</title>

                    <link rel="apple-touch-icon" sizes="57x57" href="/icons/apple-icon-57x57.png" />
                    <link rel="apple-touch-icon" sizes="60x60" href="/icons//apple-icon-60x60.png" />
                    <link rel="apple-touch-icon" sizes="72x72" href="/icons//apple-icon-72x72.png" />
                    <link rel="apple-touch-icon" sizes="76x76" href="/icons//apple-icon-76x76.png" />
                    <link rel="apple-touch-icon" sizes="114x114" href="/icons//apple-icon-114x114.png" />
                    <link rel="apple-touch-icon" sizes="120x120" href="/icons//apple-icon-120x120.png" />
                    <link rel="apple-touch-icon" sizes="144x144" href="/icons//apple-icon-144x144.png" />
                    <link rel="apple-touch-icon" sizes="152x152" href="/icons//apple-icon-152x152.png" />
                    <link rel="apple-touch-icon" sizes="180x180" href="/icons//apple-icon-180x180.png" />
                    <link rel="icon" type="image/png" sizes="192x192"  href="/icons//android-icon-192x192.png" />
                    <link rel="icon" type="image/png" sizes="32x32" href="/icons//favicon-32x32.png" />
                    <link rel="icon" type="image/png" sizes="96x96" href="/icons//favicon-96x96.png" />
                    <link rel="icon" type="image/png" sizes="16x16" href="/icons//favicon-16x16.png" />
                    <link rel="manifest" href="/icons/manifest.json" />
                    <meta name="msapplication-TileColor" content="#ffffff" />
                    <meta name="msapplication-TileImage" content="/icons//ms-icon-144x144.png" />
                    <meta name="theme-color" content="#ffffff" />

                    <link href="/styles/reset.css" rel="stylesheet" type="text/css" />
                </head>
                <body>
                    <div id="content" dangerouslySetInnerHTML={{ __html: content }}></div>
                    <script dangerouslySetInnerHTML={{ __html: `window.__data=${serialize(store.getState())};` }}></script>
                    <script src={ assets.javascript.main }></script>
                </body>
            </html>
        );
    }
}
