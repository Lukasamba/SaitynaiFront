import Http from '../http';

class Client {
  protected http: Http;

  protected api: { [key: string]: string };

  constructor(http: Http) {
    this.http = http;
    this.api = {};
  }

  buildUrl = (url: string, params: { [key: string]: string | number }): string => {
    for (const key in params) {
      const value = params[key];
      url = url.replace('{' + key + '}', value.toString());
    }

    return url;
  };
}

export default Client;
