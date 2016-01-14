import superagent from 'superagent';

export default class ApiClient {
    constructor(/* request */) {
        ['get', 'post', 'put', 'patch', 'del'].
            forEach((method) => {
                this[method] = (path, options) => {
                    return new Promise((resolve, reject) => {
                        const url = this.formatUrl(path);
                        const superRequest = superagent[method](url);
                        if(options && options.params) {
                            superRequest.query(options.params);
                        }
                        if(options && options.data) {
                            superRequest.send(options.data);
                        }
                        superRequest.end((err, response) => {
                            if(err) {
                                reject((response && response.body) || err);
                            } else {
                                resolve(response.body);
                            }
                        });
                    });
                };
            });
    }
}
