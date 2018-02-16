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
