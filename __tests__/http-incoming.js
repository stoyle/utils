'use strict';

const HttpIncoming = require('../lib/http-incoming');

// TODO: This is silly, send PR to original-url.
const SIMPLE_REQ = {
    headers: {},
};

const ADVANCED_REQ = {
    headers: {
        host: 'localhost:3030',
    },
    hostname: 'localhost',
    url: '/some/path',
};

const SIMPLE_RES = {
    locals: {},
};

const SIMPLE_PARAMS = {
    foo: 'bar',
};

test('PodiumHttpIncoming() - object tag - should be PodiumHttpIncoming', () => {
    const incoming = new HttpIncoming(SIMPLE_REQ);
    expect(Object.prototype.toString.call(incoming)).toEqual(
        '[object PodiumHttpIncoming]',
    );
});

test('PodiumHttpIncoming() - no arguments given - should construct object with default values', () => {
    const incoming = new HttpIncoming(SIMPLE_REQ);
    expect(incoming.request).toEqual(SIMPLE_REQ);
    expect(incoming.response).toEqual({});
    expect(incoming.url).toEqual({});
    expect(incoming.params).toEqual({});
    expect(incoming.context).toEqual({});
    expect(incoming.development).toEqual(false);
    expect(incoming.name).toEqual('');
    expect(incoming.css).toEqual('');
    expect(incoming.js).toEqual('');
});

test('PodiumHttpIncoming() - "request" argument given - should store request on ".request"', () => {
    const incoming = new HttpIncoming(ADVANCED_REQ);
    expect(incoming.request).toEqual(ADVANCED_REQ);
});

test('PodiumHttpIncoming() - "request" argument given - should set parsed URL on ".url"', () => {
    const incoming = new HttpIncoming(ADVANCED_REQ);
    expect(incoming.url.hostname).toEqual('localhost');
    expect(incoming.url.host).toEqual('localhost:3030');
    expect(incoming.url.port).toEqual('3030');
    expect(incoming.url.protocol).toEqual('http:');
});

test('PodiumHttpIncoming() - "response" argument given - should store request on ".response"', () => {
    const incoming = new HttpIncoming(ADVANCED_REQ, SIMPLE_RES);
    expect(incoming.response).toEqual(SIMPLE_RES);
});

test('PodiumHttpIncoming() - "params" argument given - should store request on ".params"', () => {
    const incoming = new HttpIncoming(ADVANCED_REQ, SIMPLE_RES, SIMPLE_PARAMS);
    expect(incoming.params).toEqual(SIMPLE_PARAMS);
});

test('PodiumHttpIncoming.request - set value - should throw', () => {
    expect.hasAssertions();
    const incoming = new HttpIncoming(ADVANCED_REQ, SIMPLE_RES);
    expect(() => {
        incoming.request = 'foo';
    }).toThrowError(
        'Cannot set read-only property.',
    );
});

test('PodiumHttpIncoming.response - set value - should throw', () => {
    expect.hasAssertions();
    const incoming = new HttpIncoming(ADVANCED_REQ, SIMPLE_RES);
    expect(() => {
        incoming.response = 'foo';
    }).toThrowError(
        'Cannot set read-only property.',
    );
});

test('PodiumHttpIncoming.development - set value - should set value', () => {
    const incoming = new HttpIncoming(ADVANCED_REQ, SIMPLE_RES);
    incoming.development = true;
    expect(incoming.development).toEqual(true);
});

test('PodiumHttpIncoming.name - set value - should set value', () => {
    const incoming = new HttpIncoming(ADVANCED_REQ, SIMPLE_RES);
    incoming.name = 'a_name';
    expect(incoming.name).toEqual('a_name');
});

test('PodiumHttpIncoming.css - set value - should set value', () => {
    const incoming = new HttpIncoming(ADVANCED_REQ, SIMPLE_RES);
    incoming.css = 'a_css';
    expect(incoming.css).toEqual('a_css');
});

test('PodiumHttpIncoming.js - set value - should set value', () => {
    const incoming = new HttpIncoming(ADVANCED_REQ, SIMPLE_RES);
    incoming.js = 'a_js';
    expect(incoming.js).toEqual('a_js');
});

test('PodiumHttpIncoming.view - set value - should set value', () => {
    const incoming = new HttpIncoming(ADVANCED_REQ, SIMPLE_RES);
    const fn = (value) => `bar-${value}`;
    incoming.view = fn;
    expect(incoming.view).toEqual(fn);
});

test('PodiumHttpIncoming.render() - ".view" is not set - ".development" is "false" - should return passed in value', () => {
    const incoming = new HttpIncoming(ADVANCED_REQ, SIMPLE_RES);
    expect(incoming.render('foo')).toEqual('foo');
});

test('PodiumHttpIncoming.render() - ".view" is not set - ".development" is "true" - should return passed in value', () => {
    const incoming = new HttpIncoming(ADVANCED_REQ, SIMPLE_RES);
    incoming.development = true;
    expect(incoming.render('foo')).toEqual('foo');
});

test('PodiumHttpIncoming.render() - ".view" is set - ".development" is "false" - should return passed in value', () => {
    const incoming = new HttpIncoming(ADVANCED_REQ, SIMPLE_RES);
    const fn = (value) => `bar-${value}`;
    incoming.view = fn;
    expect(incoming.render('foo')).toEqual('foo');
});

test('PodiumHttpIncoming.render() - ".view" is set - ".development" is "true" - should execute function set on view', () => {
    const incoming = new HttpIncoming(ADVANCED_REQ, SIMPLE_RES);
    const fn = (value) => `bar-${value}`;
    incoming.view = fn;
    incoming.development = true;
    expect(incoming.render('foo')).toEqual('bar-foo');
});
