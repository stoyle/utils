'use strict';

const pkgconf = require('pkg-conf');
const pkgUp = require('pkg-up');
const findBabel = require('find-babel-config');

const { join, dirname } = require('path');

exports.findConfig = (cwd = process.cwd()) => {
    const podium = pkgconf.sync('podium', { cwd });
    const packageDir = dirname(pkgUp.sync(cwd));

    let presets = {};
    if (typeof podium.presets === 'object' && !Array.isArray(podium.presets)) {
        presets = podium.presets;
    } else if (typeof podium.presets === 'string') {
        presets = require(join(packageDir, podium.presets));
    }

    let config;
    if (typeof podium.config === 'string') {
        const configPath = join(packageDir, podium.config);
        config = require(configPath);
    } else {
        console.warn(`No local config defined / loaded for ${cwd}`);
    }

    let babelConfig;
    try {
        babelConfig = findBabel.sync(cwd).config;
    } catch (e) {
        // nothing
    }

    return { presets, config, babelConfig };
};

exports.getRouterHandleImplementations = function getRouterHandleImplementations(
    router,
) {
    return router.stack
        .filter(entry => entry.route)
        .map(({ route }) => {
            const { path } = route;

            return {
                [path]: route.stack
                    .map(({ method, handle }) => ({
                        [method]: handle,
                    }))
                    .reduce(
                        (handlers, handle) => ({ ...handlers, ...handle }),
                        {},
                    ),
            };
        })
        .reduce((handlers, handle) => ({ ...handlers, ...handle }), {});
};
