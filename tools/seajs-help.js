;(function() {
  var reserved = [
    'jquery', 'zepto', 'json', 'jasmine', 'underscore', 'handlebars',
    'seajs'
  ]
  var alipayBase = 'https://a.alipayobjects.com/static/arale/'
  var githubBase = 'https://raw.github.com/aralejs/'
  var rules = []
  rules.push(function(url) {
    for(var i = 0; i < reserved.length; i++) {
      if(url.indexOf(reserved[i]) > 0) {
        url = url.replace(githubBase, alipayBase)
        return url;
      }
    }

    url = url.replace(/\/([a-z\-]*\.js)$/g, '/src/$1')
    return url;
  })

  // [/^(?:#|[a-z\d-]*\/)[a-z\d-]*\/\d+\.\d+\.\d+\/([a-z\d-]*)$/g, '../src/$1']

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

  var isSetAlias = false
  var use = seajs.use
  seajs.use = function(ids, callback) {
    use.call(seajs, ['../package.json'], function(data) {
      if (data.moduleDependencies && !isSetAlias) {
        seajs.config({
          alias: data.moduleDependencies
        })
        isSetAlias = true
      }
      use.call(seajs, ids, callback)
    })
  }
})()
