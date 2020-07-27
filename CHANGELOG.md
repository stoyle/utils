# [5.0.0-next.3](https://github.com/podium-lib/utils/compare/v5.0.0-next.2...v5.0.0-next.3) (2020-07-27)


### Features

* Use ES private properties instead of Symbols for privacy ([#72](https://github.com/podium-lib/utils/issues/72)) ([4083fa1](https://github.com/podium-lib/utils/commit/4083fa17301630d3669f8c819978fa2a99e5274d))


### BREAKING CHANGES

* Due to dropping node 10.x support we use ES private properties instead of Symbols.

We've been using Symbols to define private properties in classes up until now. This has the downside that they are not true private and in later versions of node.js one would see these Symbols when inspecting an object. What we want is proper private properties.

This PR does also add a pretty printer which outputs an object literal or the object so when debugging one can see the getters and setters of the object.

Example: printing a object with `console.log()` would previously print the following:

```sh
PodiumHttpIncoming {
  [Symbol(podium:httpincoming:development)]: false,
  [Symbol(podium:httpincoming:response)]: {},
  [Symbol(podium:httpincoming:request)]: {},
  [Symbol(podium:httpincoming:context)]: {},
  [Symbol(podium:httpincoming:params)]: {},
  [Symbol(podium:httpincoming:proxy)]: false,
  [Symbol(podium:httpincoming:name)]: '',
  [Symbol(podium:httpincoming:view)]: {},
  [Symbol(podium:httpincoming:url)]: {},
  [Symbol(podium:httpincoming:css)]: [],
  [Symbol(podium:httpincoming:js)]: []
}
```

Now the following will be printed:

```sh
{
  development: false,
  response: {},
  request: {},
  context: {},
  params: {},
  proxy: false,
  name: '',
  view: {},
  url: {},
  css: [],
  js: []
}
```

Co-authored-by: Trygve Lie <trygve.lie@finn.no>

# [5.0.0-next.2](https://github.com/podium-lib/utils/compare/v5.0.0-next.1...v5.0.0-next.2) (2020-07-15)


### Bug Fixes

* Simplify js and css value validation ([#70](https://github.com/podium-lib/utils/issues/70)) ([05a1ffc](https://github.com/podium-lib/utils/commit/05a1ffc17bce3249b349b218a9b5ea8585db5df8))

# [5.0.0-next.1](https://github.com/podium-lib/utils/compare/v4.3.0...v5.0.0-next.1) (2020-07-12)


### Features

* Drop node 10.x support ([#67](https://github.com/podium-lib/utils/issues/67)) ([84203f8](https://github.com/podium-lib/utils/commit/84203f8ee2591b331aa52b2f70035b2a73f9d95e))


### BREAKING CHANGES

* Only support node 12 and 14.

Co-authored-by: Trygve Lie <trygve.lie@finn.no>

# [4.3.0](https://github.com/podium-lib/utils/compare/v4.2.5...v4.3.0) (2020-06-26)


### Features

* support data attributes on javascript assets ([#61](https://github.com/podium-lib/utils/issues/61)) ([9f418b2](https://github.com/podium-lib/utils/commit/9f418b2d04ce7bb04fcfe6e1e1c9cf7de6d50107))

# Changelog

Notable changes to this project.

The latest version of this document is always available in [releases][releases-url].

## [Unreleased]

## [3.1.2] - 2019-03-21

-   Improved performance of HttpIncoming - [#6](https://github.com/podium-lib/utils/pull/6)

## [3.1.1] - 2019-02-07

- Initial open source release.

[unreleased]: https://github.com/podium-lib/utils/compare/v3.1.2...HEAD
[3.1.2]: https://github.com/podium-lib/utils/releases/tag/v3.1.2
[3.1.1]: https://github.com/podium-lib/utils/releases/tag/v3.1.1
[releases-url]: https://github.com/podium-lib/utils/blob/master/CHANGELOG.md
