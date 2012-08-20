;(function() {
  if (location.hostname.indexOf('.im') > 0) {
    var code = document.getElementById('code-link')
    code.href = code.href.replace('https://github.com/aralejs', 'http://git.alipay.im')
  }
})()
