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

const document = ({
    head = '',
    body = '',
    encoding = 'utf-8',
    locale = 'en-US',
    title = '',
    js = [],
    css = [],
} = {}) => {
    let scripts = js;
    let styles = css;

    // backwards compatibility for scripts and styles
    if (typeof js === 'string') scripts = [{ type: 'default', value: js }];
    if (typeof css === 'string') styles = [{ type: 'default', value: css }];

    return `<!doctype html>
<html lang="${locale}">
    <head>
        <meta charset="${encoding}">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta http-equiv="X-UA-Compatible" content="IE=Edge">
        ${styles.map(buildCSSLinkTag).join('\n        ')}
        ${scripts.map(buildScriptTag).join('\n        ')}
        <title>${title}</title>
        ${head}
    </head>
    <body>
        ${body}
    </body>
</html>`;
};

module.exports = document;
