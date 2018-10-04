import { headers, methods } from "../constants";
import { JSONHelper } from "../helpers";

class ApiHandler {
    
    constructor() {
        this.headers = {
            [ headers.accept ]: headers.applicationJson,
            [ headers.contentType ]: headers.contentType
        };
    }

    get(url, queryParams = {}, headers = {}) {
        const mergedHeaders = this.mergeHeaders(headers);
        return fetch(`${url}${this.getUrlProps(queryParams)}`, {
          headers: mergedHeaders,
          method: methods.GET
        }).then(response => response.json()).catch(this.handleError.bind(this));
    }

    post(url, body, queryParams = {}, headers = {}) {

        const mergedHeaders = this.mergeHeaders(headers);

        return fetch(`${url}${this.getUrlProps(queryParams)}`, {
            headers: mergedHeaders,
            method: methods.POST,
            body: body && JSONHelper.stringify(body)
          }).then(response => response.json()).catch(this.handleError.bind(this));
    }

    put(url, body, queryParams = {}, headers = {}) {

        const mergedHeaders = this.mergeHeaders(headers);

        return fetch(`${url}${this.getUrlProps(queryParams)}`, {
            headers: mergedHeaders,
            method: methods.PUT,
            body: body && JSONHelper.stringify(body)
          }).then(response => response.json()).catch(this.handleError.bind(this));
    }

    delete(url, queryParams = {}, headers = {}) {

        const mergedHeaders = this.mergeHeaders(headers);

        return fetch(`${url}${this.getUrlProps(queryParams)}`, {
            headers: mergedHeaders,
            method: methods.DELETE
          }).then(response => response.json()).catch(this.handleError.bind(this));
    }

    handleError(error) {
      console.error(error);

      return error;
    }

    getHeaders() {
        return this.headers;
    }

    setHeader(type, value) {
        this.headers[type] = value;
    }


    mergeHeaders(headers) {
        return {...this.headers, ...headers};
    }

    getUrlProps(object) {
        if (!object && (typeof object !== 'object')) {
          return '';
        }
        const mFn = (obj) => {
          const objPropNames = Object.keys(obj);
          return objPropNames.reduce((acc, curr) => {
            const objCurr = obj[curr];
            if (objCurr || objCurr === false || objCurr === 0) {
              if (objCurr instanceof Object && !(objCurr instanceof Array)) {
                return acc + mFn(objCurr);
              } else if (objCurr instanceof Array) {
                const arr = objCurr.reduce((item, item2) => {
                  return `${item}${curr}=${item2}&`;
                }, '');
                return acc + arr.slice(0, arr.length);
              }
              return acc + curr + '=' + objCurr + '&';
            }
            return acc;
          }, '');
        };
        const res = mFn(object);
        return '?' + res.slice(0, res.length - 1);
    }

}

export default ApiHandler;