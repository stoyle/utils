'use strict';

const camelcase = require('camelcase');
const { URL } = require('url');

/**
 * Checks if a value is a string
 *
 * @param {*} str A value to check
 *
 * @returns {Boolean}
 */
const isString = str => typeof str === 'string';

/**
 * Checks if a value is a function
 *
 * @param {*} fn A value to check
 *
 * @returns {Boolean}
 */
const isFunction = fn => {
    const type = {}.toString.call(fn);
    return type === '[object Function]' || type === '[object AsyncFunction]';
};

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

const uriBuilder = (input = '', base = '', extra = '') => {
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

const uriIsRelative = uri => uri.substr(0, 4) !== 'http';

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

const uriRelativeToAbsolute = (input = '', base = '', extra = '') => {
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

const setAtLocalsPodium = (response = {}, property, value) => {
    if (!response.locals) {
        response.locals = {};
    }

    if (!response.locals.podium) {
        response.locals.podium = {};
    }

    if (isString(property) && property !== '') {
        response.locals.podium[property] = value;
    }

    return response;
};

/**
 * Serialize a context object into a http header object
 *
 * @param {Object} headers A http headers object the context will be copied into.
 * @param {Object} context A contect object
 * @param {*} arg An argument value passed on to the function if a context value is a function
 *
 * @returns {Object} A http header object
 */

const serializeContext = (headers = {}, context = {}, arg = '') => {
    Object.keys(context).forEach(key => {
        if (isString(context[key])) {
            headers[key] = context[key];
        }

        if (isFunction(context[key])) {
            headers[key] = context[key](arg);
        }
    });
    return headers;
};

/**
 * Deserialize a context object from a http header object
 *
 * @param {Object} headers A http headers object the context will be extracted from.
 * @param {String} prefix The prefix used to mark what properties are context properties
 *
 * @returns {Object} A object containing context properties and values
 */

const deserializeContext = (headers = {}, prefix = 'podium') => {
    const context = {};
    Object.keys(headers).forEach(key => {
        if (key.startsWith(prefix)) {
            const k = camelcase(key.replace(`${prefix}-`, ''));
            context[k] = headers[key];
        }
    });
    return context;
};

module.exports.isString = isString;
module.exports.isFunction = isFunction;
module.exports.uriBuilder = uriBuilder;
module.exports.uriIsRelative = uriIsRelative;
module.exports.uriRelativeToAbsolute = uriRelativeToAbsolute;
module.exports.setAtLocalsPodium = setAtLocalsPodium;
module.exports.serializeContext = serializeContext;
module.exports.deserializeContext = deserializeContext;
