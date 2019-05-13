'use strict';

const document = require('../lib/html-document');

/**
 * .document()
 */

test('.document() - no arguments given - should render template', () => {
    const result = document();
    expect(result).toMatchSnapshot();
});

test('.document() - arguments given - should render template using values given', () => {
    const result = document({
        head: 'this goes in the head section',
        body: 'this goes in the body section',
        encoding: 'utf-pretend-encoding',
        locale: 'en-NZ',
        title: 'this goes in the title tag',
        js: 'http://somejsurl.com',
        css: 'http://somecssurl.com',
    });
    expect(result).toMatchSnapshot();
});

test('.document() - arguments given - handles v4 js and css syntax', () => {
    const result = document({
        js: [
            { value: 'http://somejsurl1.com', type: 'default' },
            { value: 'http://somejsurl2.com', type: 'default' },
            { value: 'http://somejsurl3.com', type: 'default' },
        ],
        css: [
            { value: 'http://somecssurl1.com', type: 'default' },
            { value: 'http://somecssurl2.com', type: 'default' },
            { value: 'http://somecssurl3.com', type: 'default' },
        ],
    });
    expect(result).toMatchSnapshot();
});

test('.document() - js "type" is "module" - should set type to module on script tags', () => {
    const result = document({
        js: [
            { value: 'http://somejsurl1.com', type: 'module' },
            { value: 'http://somejsurl2.com', type: 'module' },
            { value: 'http://somejsurl3.com', type: 'module' },
        ],
        css: [
            { value: 'http://somecssurl1.com', type: 'default' },
            { value: 'http://somecssurl2.com', type: 'default' },
            { value: 'http://somecssurl3.com', type: 'default' },
        ],
    });
    expect(result).toMatchSnapshot();
});