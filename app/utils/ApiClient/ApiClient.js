import superagent from 'superagent';

export default class ApiClient {
    constructor(/* request */) {
        ['get', 'post', 'put', 'patch', 'del'].
            forEach((method) => {
                this[method] = (path, options) => {
                    return new Promise((resolve, reject) => {
                        const superRequest = superagent[method](path);
                        if(options && options.params) {
                            superRequest.query(options.params);
                        }
                        if(options && options.data) {
                            superRequest.send(options.data);
                        }
                        superRequest.end((error, response) => {
                            if(error) {
                                reject((response && response.body) || error);
                            } else {
                                resolve(response.body);
                            }
                        });
                    });
                };
            });
    }
}
