'use strict';

const buildScriptTag = ({ value = '', type = 'default' }) => {
    if (type === 'default') {
        return `<script defer src="${value}" ></script>`;
    }
    return `<script type="${type}" defer src="${value}"></script>`;
};

const buildCSSLinkTag = ({ value = '', type = 'default' }) => {
    return `<link rel="stylesheet" type="text/css" href="${value}">`;
};

const document = (incoming = {}, body = '', head = '') => {
    let scripts = incoming.js;
    let styles = incoming.css;

    // backwards compatibility for scripts and styles
    if (typeof incoming.js === 'string') scripts = [{ type: 'default', value: incoming.js }];
    if (typeof incoming.css === 'string') styles = [{ type: 'default', value: incoming.css }];

    return `<!doctype html>
<html lang="${incoming.context.locale ? incoming.context.locale : 'en-US'}">
    <head>
        <meta charset="${incoming.view.encoding ? incoming.view.encoding : 'utf-8'}">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta http-equiv="X-UA-Compatible" content="IE=Edge">
        ${styles.map(buildCSSLinkTag).join('\n        ')}
        ${scripts.map(buildScriptTag).join('\n        ')}
        <title>${incoming.view.title ? incoming.view.title : ''}</title>
        ${head}
    </head>
    <body>
        ${body}
    </body>
</html>`;
};

module.exports = document;
