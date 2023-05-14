import wretch from "wretch";
import QueryStringAddon from "wretch/addons/queryString"

const useHttpRequest = (url, options = {}) => {
    if (!options?.headers) {
        options.headers = {};
    }

    if (!(options.headers?.['Content-Type'])) {
        options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    }

    const request = wretch(url, options).addon(QueryStringAddon);

    return {
        request,
    };
}

export default useHttpRequest;
