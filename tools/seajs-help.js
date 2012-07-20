;(function() {
  var reserved = [
    'jquery', 'zepto', 'json', 'jasmine', 'underscore', 'handlebars',
    'seajs', 'moment', 'async', 'store', 'swfobject', 'backbone'
  ]
  var alipayBase = 'https://a.alipayobjects.com/static/arale/'
  var githubBase = 'https://raw.github.com/aralejs/'
  var rules = []
  rules.push(function(url) {
    for (var i = 0; i < reserved.length; i++) {
      if (url.indexOf(reserved[i]) > 0) {
        url = url.replace(githubBase, alipayBase)
        return url;
      }
    }

    url = url.replace(
        /\/(\d+\.\d+\.\d+|master)\/([a-z\-]*\.js)$/g,
        '/$1/src/$2'
    )
    if (url.indexOf('src') < 0 || url.indexOf('dist') < 0) {
        url.replace(githubBase, '../src/')
    }
    return url;
  })


  seajs.config({
    base: githubBase,
    alias: {
      '$': 'jquery/1.7.2/jquery',
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
      if (data.devDependencies && !readPackage) {
        seajs.config({
          alias: data.devDependencies
        })
        readPackage = true
      }
      use.call(seajs, ids, callback)
    })
  }
})()
