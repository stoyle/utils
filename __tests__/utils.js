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
