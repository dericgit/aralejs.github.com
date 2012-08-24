define(function(require) {

    var $ = require('https://a.alipayobjects.com/static/arale/jquery/1.7.2/jquery.js');

    if (location.hostname.indexOf('alipay.im') > 0) {

        var GitlabBaseUrl = "http://git.alipay.im";

        // 更改源码的对应地址
        var code = $('#code-link');
        if (code.length) {
            code.attr('href', code.attr('href').replace('https://github.com/aralejs', GitlabBaseUrl));
        }

        // 将用例的链接设为新窗口打开，主页设为本窗口打开
        $('#nav-test').attr('target', '_blank');
        $('#logo').attr('target', '');

        // 去掉gitlab下的icon
        /*
        $('#nav a').each(function(index, item) {
            item.className = '';
        });
        */

        // 增加一个全局导航触发点
        $('#main .container').append($(
            '<div class="document-index"><input placeholder="搜索组件，回车到达" type="text" id="search" /></div>'));

        // 载入组件信息
        $.get('/info.json', function(data) {
            $(['arale', 'alipay', 'alice']).each(function(i, item) {
                var html = '<h2>' + item + '</h2><ul class="document-section fn-clear">',
                    projects = data[item];
                if(!projects.length) {
                    html += '<li class="' + item + '"><a href="#">暂无</a></li>';
                }
                for(var i=0; i<projects.length; i++) {
                    var name = (item === 'arale') ? projects[i].name : item + '.' + projects[i].name;
                    html += '<li class="' + item + '"><a href="http://' + location.hostname + '/' + name + '">';
                    html += projects[i].name;
                    html += '</a></li>';
                }
                html += '</ul>';
                $('.document-index').append($(html));
            });
        }, 'json');

        // 搜索功能
        $('#search').on('keyup', function(e) {
            var str = $(this).val();
            $('.document-index li a').each(function(i, item) {
                $(item).parent()[ ($(item).html().indexOf(str) !== -1) ? 'show' : 'hide' ]();
            }); 
        }).on('keypress', function(e) {
            if (e.keyCode === 13) {
                location.href = 'http://' + location.hostname + '/' + $('.document-index li:visible a')[0].innerHTML;
            }
        }).focus()
    }
});

