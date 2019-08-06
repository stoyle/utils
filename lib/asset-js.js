'use strict';

const { validate } = require('@podium/schemas');
const { uriIsRelative, pathnameBuilder } = require('./utils');

// Ref: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script
// NOTE: "nonce" is deliberately left out since we do not support inline scripts

const _referrerpolicy = Symbol('podium:asset:js:referrerpolicy');
const _crossorigin = Symbol('podium:asset:js:crossorigin');
const _integrity = Symbol('podium:asset:js:integrity');
const _pathname = Symbol('podium:asset:js:pathname');
const _nomodule = Symbol('podium:asset:js:nomodule');
const _prefix = Symbol('podium:asset:js:prefix');
const _value = Symbol('podium:asset:js:value');
const _async = Symbol('podium:asset:js:async');
const _defer = Symbol('podium:asset:js:defer');
const _type = Symbol('podium:asset:js:type');

const toUndefined = value => {
    if (value === false) return undefined;
    if (value === '') return undefined;
    return value;
};

const notEmpty = value => {
    if (value === false) return value;
    if (value !== '') return true;
    return false;
};

const PodiumAssetJs = class PodiumAssetJs {
    constructor({
        referrerpolicy = '',
        crossorigin = '',
        integrity = '',
        pathname = '',
        nomodule = false,
        prefix = false,
        value = undefined,
        async = false,
        defer = false,
        type = 'default',
    } = {}) {
        if (validate.js(value).error)
            throw new Error(
                `Value for argument variable "value", "${value}", is not valid`,
            );

        this[_pathname] = pathname;
        this[_prefix] = prefix;
        this[_value] = value;

        this[_referrerpolicy] = referrerpolicy;
        this[_crossorigin] = crossorigin;
        this[_integrity] = integrity;
        this[_nomodule] = nomodule;
        this[_async] = async;
        this[_defer] = defer;
        this[_type] = type;
    }

    get referrerpolicy() {
        return this[_referrerpolicy];
    }

    set referrerpolicy(value) {
        this[_referrerpolicy] = value;
    }

    get crossorigin() {
        return this[_crossorigin];
    }

    set crossorigin(value) {
        this[_crossorigin] = value;
    }

    get integrity() {
        return this[_integrity];
    }

    set integrity(value) {
        this[_integrity] = value;
    }

    get nomodule() {
        return this[_nomodule];
    }

    set nomodule(value) {
        this[_nomodule] = value;
    }

    get value() {
        const pathname = this[_prefix] ? this[_pathname] : '';
        const value = this[_value];
        return uriIsRelative(value) ? pathnameBuilder(pathname, value) : value;
    }

    set value(value) {
        throw new Error('Cannot set read-only property.');
    }

    get async() {
        return this[_async];
    }

    set async(value) {
        this[_async] = value;
    }

    get defer() {
        return this[_defer];
    }

    set defer(value) {
        this[_defer] = value;
    }

    get type() {
        return this[_type];
    }

    set type(value) {
        this[_type] = value;
    }

    get src() {
        return this.value;
    }

    set src(value) {
        throw new Error('Cannot set read-only property.');
    }

    toJSON() {
        return {
            referrerpolicy: toUndefined(this.referrerpolicy),
            crossorigin: toUndefined(this.crossorigin),
            integrity: toUndefined(this.integrity),
            nomodule: toUndefined(this.nomodule),
            value: this[_value],
            async: toUndefined(this.async),
            defer: toUndefined(this.defer),
            type: this.type,
        };
    }

    toHTML() {
        const args = [];

        args.push(`src="${this.src}"`);

        if (this.type === 'esm' || this.type === 'module') {
            args.push('type="module"');
        }

        if (notEmpty(this.referrerpolicy)) {
            args.push(`referrerpolicy="${this.referrerpolicy}"`);
        }

        if (notEmpty(this.crossorigin)) {
            args.push(`crossorigin="${this.crossorigin}"`);
        }

        if (notEmpty(this.integrity)) {
            args.push(`integrity="${this.integrity}"`);
        }

        if (notEmpty(this.nomodule)) {
            args.push('nomodule');
        }

        if (notEmpty(this.async)) {
            args.push('async');
        }

        if (notEmpty(this.defer)) {
            args.push('defer');
        }

        return `<script ${args.join(' ')}></script>`;
    }

    get [Symbol.toStringTag]() {
        return 'PodiumAssetJs';
    }
};

module.exports = PodiumAssetJs;
