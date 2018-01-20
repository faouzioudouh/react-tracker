import queryString from 'query-string';

/**
 * @description get the parameter from location (hash)
 * @param {String} - key
 * @return {Any} - value
 */
export const getUrlParam = (param) => {
    const parsed = queryString.parse(location.hash) || {};
    return parsed[param];
}

/**
 * @description set the paramter (in hash) on location and update the url
 * @param  {String, String} key - value
 */
export const setUrlParam = (key, value) => {
    const parsedHash = queryString.parse(location.hash);

    parsedHash[key] = value;
    const stringified = queryString.stringify(parsedHash);

    if (history && history.pushState) {
        history.pushState(null, null, `#${stringified}`);
    } else {
        location.hash = stringified;
    }
};
