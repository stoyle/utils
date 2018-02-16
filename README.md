# Podium Utils

Misc common / generic utility methods.

## Installation

```bash
$ npm install @podium/utils
```

## API

This module has the following API:

### .uriBuilder(input, base, extra)

Constructs an absolute URI out of a absolute manifest URI and a relative URI.

The method takes the following arguments:

 * input - `String` - Relative URI. Required.
 * base - `String` - Absolute manifest URI to append the input too. Required.
 * extra - `String` - Relative path to be appended at the end of the URI. Optional.

Returns a resolved URI.

```js
const utils = require('@podium/utils');
const manifest = 'http://foo.site.com/bar/manifest.json';
const content = '/here/is/content.html';

const url = utils.uriBuilder(content, manifest);
console.log(url) // outputs: http://foo.site.com/bar/here/is/content.html
```

### .uriIsRelative(uri)

Checks if a URI is relative

The method takes the following arguments:

 * uri - `String` - The URI to check. Required.

Returns a Boolean.

```js
const utils = require('@podium/utils');

utils.uriIsRelative('http://foo.site.com/bar/');  // false
utils.uriIsRelative('/bar/');  // true
```

### .uriRelativeToAbsolute(input, base, extra)

Check if a URI is absolute or relative and if relative compose an
absolute URI out of a absolute mainfest URI.

The method takes the following arguments:

 * input - `String` - Relative or absolute URI. Required.
 * base - `String` - Absolute manifest URI to append the possible relative input too. Required.
 * extra - `String` - Relative path to be appended at the end of the URI. Optional.

Returns a resolved URI.

```js
const utils = require('@podium/utils');
const manifest = 'http://foo.site.com/bar/manifest.json';
const content = 'http://foo.site.com/here/is/content.html';

const url = utils.uriRelativeToAbsolute(content, manifest);
console.log(url) // outputs: http://foo.site.com/here/is/content.html
```
