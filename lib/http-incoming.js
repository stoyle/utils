'use strict';

const originalUrl = require('original-url');
const { URL } = require('url');

const _development = Symbol('podium:httpincoming:development');
const _response = Symbol('podium:httpincoming:response');
const _request = Symbol('podium:httpincoming:request');
const _context = Symbol('podium:httpincoming:context');
const _params = Symbol('podium:httpincoming:params');
const _view = Symbol('podium:httpincoming:view');
const _name = Symbol('podium:httpincoming:name');
const _url = Symbol('podium:httpincoming:url');
const _css = Symbol('podium:httpincoming:css');
const _js = Symbol('podium:httpincoming:js');

const noop = str => str;

const PodiumHttpIncoming = class PodiumHttpIncoming {
    constructor(request = {}, response = {}, params = {}) {
        const url = originalUrl(request);

        // Private properties
        this[_development] = false;
        this[_response] = response;
        this[_request] = request;
        this[_context] = {};
        this[_params] = params;
        this[_name] = '';
        this[_view] = noop;
        this[_url] = url.full ? new URL(url.full) : {};
        this[_css] = '';
        this[_js] = '';
    }

    set development(value) {
        this[_development] = value;
    }

    get development() {
        return this[_development];
    }

    set response(value) {
        throw new Error('Cannot set read-only property.');
    }

    get response() {
        return this[_response];
    }

    set request(value) {
        throw new Error('Cannot set read-only property.');
    }

    get request() {
        return this[_request];
    }

    set context(value) {
        this[_context] = value;
    }

    get context() {
        return this[_context];
    }

    set params(value) {
        throw new Error('Cannot set read-only property.');
    }

    get params() {
        return this[_params];
    }

    set name(value) {
        this[_name] = value;
    }

    get name() {
        return this[_name];
    }

    set view(value) {
        this[_view] = value;
    }

    get view() {
        return this[_view];
    }

    set url(value) {
        throw new Error('Cannot set read-only property.');
    }

    get url() {
        return this[_url];
    }

    set css(value) {
        this[_css] = value;
    }

    get css() {
        return this[_css];
    }

    set js(value) {
        this[_js] = value;
    }

    get js() {
        return this[_js];
    }

    render(fragment) {
        if (this.development) {
            return this.view(fragment, this);
        }
        return fragment;
    }

    toJSON() {
        return {
            development: this.development,
            context: this.context,
            params: this.params,
            name: this.name,
            url: this.url,
            css: this.css,
            js: this.js,
        };
    }

    get [Symbol.toStringTag]() {
        return 'PodiumHttpIncoming';
    }
};

module.exports = PodiumHttpIncoming;
