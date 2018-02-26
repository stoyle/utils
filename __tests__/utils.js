'use strict';

const utils = require('../lib/utils');

/**
 * .uriBuilder()
 */

test('.uriBuilder() - no arguments - should throw', () => {
    expect(() => {
        utils.uriBuilder();
    }).toThrowError(/Invalid URL/);
});

test('.uriBuilder() - "base is empty" - should throw', () => {
    expect(() => {
        utils.uriBuilder('/podlet.html');
    }).toThrowError(/Invalid URL/);
});

test('.uriBuilder() - "base" has long path with <filename>.json - should replace <filename>.json file with "input"', () => {
    const result = utils.uriBuilder(
        '/podlet.html',
        'http://localhost:7000/podlet/a/manifest.json'
    );
    expect(result).toBe('http://localhost:7000/podlet/a/podlet.html');
});

test('.uriBuilder() - "base" has short path with <filename>.json - should replace <filename>.json file with "input"', () => {
    const result = utils.uriBuilder(
        '/podlet.html',
        'http://localhost:7000/manifest.json'
    );
    expect(result).toBe('http://localhost:7000/podlet.html');
});

test('.uriBuilder() - "base" has long path without <filename>.json - should append "input" to "base"', () => {
    const result = utils.uriBuilder(
        '/podlet.html',
        'http://localhost:7000/podlet/a/'
    );
    expect(result).toBe('http://localhost:7000/podlet/a/podlet.html');
});

test('.uriBuilder() - "base" has short path without <filename>.json - should append "input" to "base"', () => {
    const result = utils.uriBuilder('/podlet.html', 'http://localhost:7000/');
    expect(result).toBe('http://localhost:7000/podlet.html');
});

test('.uriBuilder() - "input" does not begin with "/" - should replace <filename>.json file with "input"', () => {
    const result = utils.uriBuilder(
        'podlet.html',
        'http://localhost:7000/podlet/a/manifest.json'
    );
    expect(result).toBe('http://localhost:7000/podlet/a/podlet.html');
});

test('.uriBuilder() - "base" is without <filename>.json and does not end with "/" - should append "input" to "base"', () => {
    const result = utils.uriBuilder('/podlet.html', 'http://localhost:7000');
    expect(result).toBe('http://localhost:7000/podlet.html');
});

test('.uriBuilder() - "extra" is provided - should append "extra"', () => {
    const result = utils.uriBuilder(
        '/podlet',
        'http://localhost:7000/foo/',
        '/a/b'
    );
    expect(result).toBe('http://localhost:7000/foo/podlet/a/b');
});

/**
 * .uriIsRelative()
 */

test('.uriIsRelative() - "uri" is relative - should return "true"', () => {
    expect(utils.uriIsRelative('/manifest.json')).toBe(true);
});

test('.uriIsRelative() - "uri" is absolute - should return "false"', () => {
    expect(utils.uriIsRelative('http://localhost:7000/manifest.json')).toBe(
        false
    );
});

/**
 * .uriRelativeToAbsolute()
 */

test('.uriRelativeToAbsolute() - "input" is relative - should build absolute URI', () => {
    const result = utils.uriRelativeToAbsolute(
        '/podlet',
        'http://localhost:7000/foo/',
        '/a/b'
    );
    expect(result).toBe('http://localhost:7000/foo/podlet/a/b');
});

test('.uriRelativeToAbsolute() - "input" is absolute - should return absolute URI', () => {
    const result = utils.uriRelativeToAbsolute(
        'http://localhost:7000/foo/podlet/a/b',
        'http://localhost:7000/bar/',
        '/b/a'
    );
    expect(result).toBe('http://localhost:7000/foo/podlet/a/b');
});

test('.uriRelativeToAbsolute() - no arguments - should throw', () => {
    expect.hasAssertions();

    expect(() => {
        utils.uriRelativeToAbsolute();
    }).toThrowError(/Invalid URL/);
});

/**
 * .setAtLocalsPodium()
 */

test('.setAtLocalsPodium() - no arguments - should return res.locals.podium', () => {
    expect(utils.setAtLocalsPodium()).toEqual({
        locals: {
            podium: {},
        },
    });
});

test('.setAtLocalsPodium() - response argument is an empty object - should return res.locals.podium', () => {
    expect(utils.setAtLocalsPodium({})).toEqual({
        locals: {
            podium: {},
        },
    });
});

test('.setAtLocalsPodium() - response argument has .locals - should return res.locals.podium', () => {
    expect(
        utils.setAtLocalsPodium({
            locals: {},
        })
    ).toEqual({
        locals: {
            podium: {},
        },
    });
});

test('.setAtLocalsPodium() - response argument has .locals.podium - should return res.locals.podium', () => {
    expect(
        utils.setAtLocalsPodium({
            locals: {
                podium: {},
            },
        })
    ).toEqual({
        locals: {
            podium: {},
        },
    });
});

test('.setAtLocalsPodium() - property argument has value - should set property', () => {
    expect(utils.setAtLocalsPodium({}, 'foo')).toEqual({
        locals: {
            podium: {
                foo: undefined,
            },
        },
    });
});

test('.setAtLocalsPodium() - property argument is empty string - should not set property', () => {
    expect(utils.setAtLocalsPodium({}, '')).toEqual({
        locals: {
            podium: {},
        },
    });
});

test('.setAtLocalsPodium() - property argument is not string - should not set property', () => {
    expect(utils.setAtLocalsPodium({}, [])).toEqual({
        locals: {
            podium: {},
        },
    });
});

test('.setAtLocalsPodium() - value argument has value - should set value on property', () => {
    expect(utils.setAtLocalsPodium({}, 'foo', 'bar')).toEqual({
        locals: {
            podium: {
                foo: 'bar',
            },
        },
    });
});

test('.setAtLocalsPodium() - .locals.podium already have properties - should append new property and value', () => {
    expect(
        utils.setAtLocalsPodium(
            {
                locals: {
                    podium: {
                        xyz: 'zyx',
                    },
                },
            },
            'foo',
            'bar'
        )
    ).toEqual({
        locals: {
            podium: {
                xyz: 'zyx',
                foo: 'bar',
            },
        },
    });
});


/**
 * .serializeContext()
 */

test('.serializeContext() - no arguments given - should return empty object', () => {
    const result = utils.serializeContext();
    expect(result).toEqual({});
});

test('.serializeContext() - headers and context is given - should copy context into headers', () => {
    const context = {
        'podium-foo': 'bar',
        'podium-bar': 'foo',
    };

    const headers = {
        test: 'xyz',
    };

    const result = utils.serializeContext(headers, context);
    expect(result).toEqual({
        'podium-foo': 'bar',
        'podium-bar': 'foo',
        test: 'xyz',
    });
});

test('.serializeContext() - one key on the context is a function - should call the function and set value on headers', () => {
    const context = {
        'podium-foo': 'bar',
        'podium-bar': name => `${name}-test`,
    };

    const headers = {
        test: 'xyz',
    };

    const result = utils.serializeContext(headers, context, 'foo');
    expect(result).toEqual({
        'podium-foo': 'bar',
        'podium-bar': 'foo-test',
        test: 'xyz',
    });
});


/**
 * .deserializeContext()
 */

test('.deserializeContext() - no arguments given - should return empty object', () => {
    const result = utils.deserializeContext();
    expect(result).toEqual({});
});

test('.deserializeContext() - headers argument with context is given - should return object with podium prefixed properties', () => {
    const headers = {
        bar: 'foo',
        'podium-foo': 'bar podium',
    };

    const result = utils.deserializeContext(headers);
    expect(result).toEqual({ foo: 'bar podium' });
});

test('.deserializeContext() - prefix argument with alternate value is given - should return object with only given prefixed properties', () => {
    const headers = {
        bar: 'foo',
        'podium-foo': 'bar podium',
        'helium-foo': 'foo helium',
    };

    const result = utils.deserializeContext(headers, 'helium');
    expect(result).toEqual({ foo: 'foo helium' });
});
