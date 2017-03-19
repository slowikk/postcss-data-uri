var postcss = require('postcss');
var mime = require('mime');
var fs = require('fs');

module.exports = postcss.plugin('postcss-data-uri', function (opts) {
    opts = opts || {};
    return function (css) {
        css.walkDecls(/background(\-image)?/i, function (decl) {
            var rePattern = /data-uri\(['|"]?(.*?)['|"]?\)/i;

            if (rePattern.test(decl.value)) {
                var path = decl.value.match(rePattern)[1].trim();
                if (fs.existsSync(path)) {
                    decl.value = decl.value.replace(rePattern, 'url(data:' + mime.lookup(path) + ';base64,' + new Buffer(fs.readFileSync(path)).toString('base64') + ')');
                } else {
                    console.log('Image ',path,' not foud.')
                    // decl.prop = 'background-image';
                }
            }
        });
    };
});