seajs.use('$', function() {
    if (location.hostname.indexOf('.im') > 0) {
        // 更改源码的对应地址
        var code = $('#code-link');
        code.attr('href', code.attr('href')replace('https://github.com/aralejs', 'http://git.alipay.im'));

        // 将用例的链接设为新窗口打开
        $('#nav-test').attr('target', '_blank');
    }
});
