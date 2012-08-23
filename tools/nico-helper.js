seajs.use(['https://a.alipayobjects.com/static/arale/jquery/1.7.2/jquery.js'], function($) {
    if (location.hostname.indexOf('alipay.im') > 0) {
        // 更改源码的对应地址
        var code = $('#code-link');
        code.attr('href', code.attr('href').replace('https://github.com/aralejs', 'http://git.alipay.im'));

        // 将用例的链接设为新窗口打开
        $('#nav-test').attr('target', '_blank');

        // 去掉gitlab下的icon
        $('#nav a').each(function(index, item) {
            item.className = '';
        });

        // 增加一个全局导航触发点
        $('#main .container').append($('<div class="document-index"><input type="text" id="search" /></div>'))
    }
});
