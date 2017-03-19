var postcss = require('postcss'),
    mime = require('mime'),
    fs = require('fs');

module.exports = postcss.plugin('postcss-data-uri', function (opts) {
    return function (css) {
        css.walkDecls(/background(\-image)?/i, function (decl) {
            var rePattern = /data-uri\(\s*['|"]?(.*?)['|"]?\s*\)/i,
                path;

            if (rePattern.test(decl.value)) {
                path = decl.value.match(rePattern)[1];
                if (fs.existsSync(path)) {
                    decl.value = decl.value.replace(rePattern, 'url(data:' + mime.lookup(path) + ';base64,' + new Buffer(fs.readFileSync(path)).toString('base64') + ')');
                } else {
                    console.log('Image ',path,' not found.')
                }
            }
        });
    };
});