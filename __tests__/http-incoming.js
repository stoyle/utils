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
    expect(incoming.proxy).toEqual(false);
    expect(incoming.context).toEqual({});
    expect(incoming.development).toEqual(false);
    expect(incoming.name).toEqual('');
    expect(incoming.css).toEqual([]);
    expect(incoming.js).toEqual([]);
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
    }).toThrowError('Cannot set read-only property.');
});

test('PodiumHttpIncoming.response - set value - should throw', () => {
    expect.hasAssertions();
    const incoming = new HttpIncoming(ADVANCED_REQ, SIMPLE_RES);
    expect(() => {
        incoming.response = 'foo';
    }).toThrowError('Cannot set read-only property.');
});

test('PodiumHttpIncoming.params - set value - should throw', () => {
    expect.hasAssertions();
    const incoming = new HttpIncoming(ADVANCED_REQ, SIMPLE_RES);
    expect(() => {
        incoming.params = 'foo';
    }).toThrowError(
        'Cannot set read-only property.',
    );
});

test('PodiumHttpIncoming.url - set value - should throw', () => {
    expect.hasAssertions();
    const incoming = new HttpIncoming(ADVANCED_REQ, SIMPLE_RES);
    expect(() => {
        incoming.url = 'foo';
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

test('PodiumHttpIncoming.css - set legal value - should set value', () => {
    const incoming = new HttpIncoming(ADVANCED_REQ, SIMPLE_RES);
    incoming.css = ['a_css'];
    expect(incoming.css).toEqual(['a_css']);
});

test('PodiumHttpIncoming.css - set illegal value - should throw', () => {
    expect.hasAssertions();
    const incoming = new HttpIncoming(ADVANCED_REQ, SIMPLE_RES);

    expect(() => {
        incoming.css = 'a_css';
    }).toThrowError(
        'Value for property \".css\" must be an Array',
    );
});

test('PodiumHttpIncoming.js - set legal value - should set value', () => {
    const incoming = new HttpIncoming(ADVANCED_REQ, SIMPLE_RES);
    incoming.js = ['a_js'];
    expect(incoming.js).toEqual(['a_js']);
});

test('PodiumHttpIncoming.js - set illegal value - should throw', () => {
    expect.hasAssertions();
    const incoming = new HttpIncoming(ADVANCED_REQ, SIMPLE_RES);

    expect(() => {
        incoming.js = 'a_js';
    }).toThrowError(
        'Value for property \".js\" must be an Array',
    );
});

test('PodiumHttpIncoming.proxy - set value - should set value', () => {
    const incoming = new HttpIncoming(ADVANCED_REQ, SIMPLE_RES);
    incoming.proxy = true;
    expect(incoming.proxy).toEqual(true);
});

test('PodiumHttpIncoming.context - set value - should set value', () => {
    const incoming = new HttpIncoming(ADVANCED_REQ, SIMPLE_RES);
    incoming.context = { foo: 'bar' };
    expect(incoming.context).toEqual({ foo: 'bar' });
});

test('PodiumHttpIncoming.view - set value - should set value', () => {
    const incoming = new HttpIncoming(ADVANCED_REQ, SIMPLE_RES);
    const fn = value => `bar-${value}`;
    incoming.view = fn;
    expect(incoming.view).toEqual(fn);
});

test('PodiumHttpIncoming.render() - ".view" is not set', () => {
    const incoming = new HttpIncoming(ADVANCED_REQ, SIMPLE_RES);
    expect(incoming.render({ body: 'foo' })).toEqual('foo');
});

test('PodiumHttpIncoming.render() - ".view" is not set, a string is passed to render', () => {
    const incoming = new HttpIncoming(ADVANCED_REQ, SIMPLE_RES);
    expect(incoming.render('foo')).toEqual('foo');
});

test('PodiumHttpIncoming.render() - ".view" is set', () => {
    const incoming = new HttpIncoming(ADVANCED_REQ, SIMPLE_RES);
    const fn = data => `bar-${data.body}`;
    incoming.view = fn;
    expect(incoming.render({ body: 'foo' })).toEqual('bar-foo');
});

test('PodiumHttpIncoming.render() - ".view" is set, a data object is passed to render', () => {
    const incoming = new HttpIncoming(ADVANCED_REQ, SIMPLE_RES);
    const fn = data => `bar-${data.body}`;
    incoming.view = fn;
    expect(incoming.render('foo')).toEqual('bar-foo');
});

test('PodiumHttpIncoming.toJSON() - call method - should return object without ".request" and ".response"', () => {
    const incoming = new HttpIncoming(SIMPLE_REQ, SIMPLE_RES);
    const result = incoming.toJSON();
    expect(result.request).toEqual(undefined);
    expect(result.response).toEqual(undefined);
    expect(result.url).toEqual({});
    expect(result.params).toEqual({});
    expect(result.context).toEqual({});
    expect(result.proxy).toEqual(false);
    expect(result.development).toEqual(false);
    expect(result.name).toEqual('');
    expect(result.css).toEqual([]);
    expect(result.js).toEqual([]);
});
