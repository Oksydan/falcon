import wretch from "wretch";
import QueryStringAddon from "wretch/addons/queryString"
import AbortAddon from "wretch/addons/abort"

const useHttpRequest = (url, options = {}) => {
    if (!options?.headers) {
        options.headers = {};
    }

    if (!(options.headers?.['Content-Type'])) {
        options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    }

    const controller = new AbortController();

    const request = wretch(url, options)
        .addon(QueryStringAddon)
        .addon(AbortAddon())
        .signal(controller);

    return {
        request,
        controller,
    };
}

export default useHttpRequest;
