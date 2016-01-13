import superagent from 'superagent';

export default class ApiClient {
    constructor(req) {
        ['get', 'post', 'put', 'patch', 'del'].
            forEach((method) => {
                this[method] = (path, options) => {
                    return new Promise((resolve, reject) => {
                        const url = this.formatUrl(path);
                        const request = superagent[method](url);
                        if(options && options.params) {
                            request.query(options.params);
                        }
                        if(__SERVER__ && req.get('cookie')) {
                            request.set('cookie', req.get('cookie'));
                        }
                        if(options && options.data) {
                            request.send(options.data);
                        }
                        request.end((err, res) => {
                            if(err) {
                                reject((res && res.body) || err);
                            } else {
                                resolve(res.body);
                            }
                        });
                    });
                };
            });
    }

    formatUrl(path) {
        const adjustedPath = path[0] !== '/' ? '/' + path : path;
        return adjustedPath;
    }
}
