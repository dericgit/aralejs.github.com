;(function() {

  var CDN_MODULES = [
    'jquery', 'zepto', 'json', 'jasmine', 'underscore', 'handlebars',
    'seajs', 'moment', 'async', 'store', 'swfobject', 'backbone', 'raphael'
  ]

  var ALIPAY_BASE = 'https://a.alipayobjects.com/static/arale/'
  var GITHUB_BASE = 'https://raw.github.com/aralejs/'

  var mapRules = []
  mapRules.push(function(url) {

    // CDN_MODULES 直接从 alipay 的 cdn 上加载
    for (var i = 0; i < CDN_MODULES.length; i++) {
      if (url.indexOf(CDN_MODULES[i] + '/') > 0) {
        return url.replace(GITHUB_BASE, ALIPAY_BASE)
      }
    }

    // 将 "/master/xxx.js" 转换成 "/master/src/xxx.js"
    url = url.replace(/\/master\/([^\/]+\.js)$/, '/master/src/$1')

    // 将 "/1.0.2/xxx.js" 转换成 "/1.0.2/dist/xxx.js"
    url = url.replace(/\/([\d.]+)\/([^\/]+\.js)$/, '/$1/dist/$2')

    // 本地开发中的文件，直接从本地加载
    if (url.indexOf('src') < 0 && url.indexOf('dist') < 0) {
        url = url.replace(GITHUB_BASE, '../src/')
    }

    return url
  })


  seajs.config({
    base: GITHUB_BASE,
    alias: {
      '$': 'jquery/1.7.2/jquery',
      '$-debug': 'jquery/1.7.2/jquery-debug',
      'jquery': 'jquery/1.7.2/jquery',
      'jquery-debug': 'jquery/1.7.2/jquery-debug'
    },
    map: mapRules,
    preload: [
      'seajs/plugin-json'
    ]
  })

  var aliasIsParsed = false
  var _use = seajs.use

  seajs.use = function(ids, callback) {
    _use('../../package.json', function(data) {

      if (aliasIsParsed === false) {
        // 有可能存在 { '$': '$' } 配置，需排除掉
        data.dependencies && (delete data.dependencies['$'])
        data.devDependencies && (delete data.devDendencies['$'])

        seajs.config({ alias: data.dependencies })
        seajs.config({ alias: data.devDependencies })

        aliasIsParsed = true
        seajs.use = _use
      }

      _use(ids, callback)
    })
  }

})()
