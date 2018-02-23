'use strict';

const { URL } = require('url');

/**
 * Constructs an absolute URI out of a absolute manifest URI
 * and a relative URI.
 *
 * @param {String} input Relative URI
 * @param {String} base Absolute manifest URI to append the input too
 * @param {String} extra Relative path to be appended at the end of the URI
 *
 * @returns {String} an absolute URI
 */

module.exports.uriBuilder = (input = '', base = '', extra = '') => {
    const uriObj = new URL(base);
    const inputPath = input.split('/').filter(item => item);
    const basePath = uriObj.pathname
        .split('/')
        .filter(item => item && !item.includes('.json'));
    const extraPath = extra.split('/').filter(item => item);

    uriObj.pathname = basePath.concat(inputPath, extraPath).join('/');
    return uriObj.toString();
};

/**
 * Checks if a URI is relative
 *
 * @param {String} uri A URI to check
 *
 * @returns {Boolean}
 */

module.exports.uriIsRelative = uri => uri.substr(0, 4) !== 'http';

/**
 * Check if a URI is absolute or relative and if relative compose an
 * absolute URI out of a absolute mainfest URI.
 *
 * @param {String} input Relative or absolute URI
 * @param {String} base Absolute manifest URI to append the possible relative input too
 * @param {String} extra Relative path to be appended at the end of the URI
 *
 * @returns {String} an absolute URI
 */

module.exports.uriRelativeToAbsolute = (input = '', base = '', extra = '') => {
    if (this.uriIsRelative(input)) {
        return this.uriBuilder(input, base, extra);
    }
    return input;
};

/**
 * Set a value on a property on .locals.podium on a http response object
 * Ensures that .locals.podium exists on the http response object.
 *
 * If property is not provided, .locals.podium will be created, if not
 * already existing, on the response object.
 *
 * @param {Object} response A http response object
 * @param {String} property Property for the value
 * @param {*} value Value to store on the property
 *
 * @returns {Object} The http response object
 */

module.exports.setAtLocalsPodium = (response = {}, property, value) => {
    if (!response.locals) {
        response.locals = {};
    }

    if (!response.locals.podium) {
        response.locals.podium = {};
    }

    if (typeof property === 'string' && property !== '') {
        response.locals.podium[property] = value;
    }

    return response;
};
