if (location.search.indexOf('github') == -1) {
  document.write('<script src="https://a.alipayobjects.com/static/arale/seajs/1.2.0/sea.js"><\/script>');
} else {
  document.write('<script src="http://seajs.org/dist/sea.js"><\/script>');
}
;(function() {
  var reserved = [
    'jquery', 'zepto', 'json', 'jasmine', 'underscore', 'handlebars',
    'seajs', 'moment', 'async', 'store', 'swfobject', 'backbone', 'raphael'
  ]
  var alipayBase = 'https://a.alipayobjects.com/static/arale/'
  var githubBase = 'https://raw.github.com/aralejs/'
  var rules = []
  rules.push(function(url) {
    for (var i = 0; i < reserved.length; i++) {
      if (url.indexOf(reserved[i]+'/') > 0) {
        url = url.replace(githubBase, alipayBase)
        return url;
      }
    }

    url = url.replace(
        /\/master\/([a-z\-]*\.js)$/g,
        '/master/src/$1'
    ).replace(
        /\/(\d+\.\d+\.\d+)\/([a-z\-]*\.js)$/g,
        '/$1/dist/$2'
    )
    if (url.indexOf('src') < 0 && url.indexOf('dist') < 0) {
        url = url.replace(githubBase, '../src/')
    }
    return url;
  })


  seajs.config({
    base: githubBase,
    alias: {
      '$': 'jquery/1.7.2/jquery',
      '$-debug': 'jquery/1.7.2/jquery-debug',
      'jquery': 'jquery/1.7.2/jquery',
      'zepto': 'zepto/0.9.0/zepto',
      'json': 'json/1.0.2/json',
      'jasmine': 'jasmine/1.1.0/jasmine-html'
    },
    map: rules,
    preload: [
      this.JSON ? '' : 'json',
      'seajs/plugin-json',
      'seajs/plugin-text'
    ]
  })

  var readPackage = false
  var use = seajs.use
  seajs.use = function(ids, callback) {
    use.call(seajs, ['../package.json'], function(data) {
      if (data.dependencies && !readPackage) {
        var alias = {};
        mixin(alias, data.dependencies);
        data.devDependencies && mixin(alias, data.devDependencies);
        seajs.config({
          alias: alias
        })
        readPackage = true
      }
      use.call(seajs, ids, callback)

      function mixin(target, object) {
        var i;
        for (i in object) {
          if (object.hasOwnProperty(i)) {
            (i !== '$') && (target[i] = object[i]);
          }
        }
      }
    })
  }
})()
