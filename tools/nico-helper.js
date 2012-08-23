seajs.use(['https://a.alipayobjects.com/static/arale/jquery/1.7.2/jquery.js'], function($) {
    if (location.hostname.indexOf('alipay.im') > 0) {

        var GitlabBaseUrl = "http://git.alipay.im";

        // 更改源码的对应地址
        var code = $('#code-link');
        code.attr('href', code.attr('href').replace('https://github.com/aralejs', GitlabBaseUrl));

        // 将用例的链接设为新窗口打开
        $('#nav-test').attr('target', '_blank');

        // 去掉gitlab下的icon
        /*
        $('#nav a').each(function(index, item) {
            item.className = '';
        });
        */

        // 增加一个全局导航触发点
        $('#main .container').append($('<div class="document-index"><input type="text" id="search" /></div>'))

        $.get('/info.json', function(data) {
            console.log(data);
            $(['arale', 'alipay', 'alice']).each(function(i, item) {
                var html = '<ul class="document-section fn-clear">',
                    projects = data[item];
                if(!projects.length) {
                    html += '<li class="' + item + '"><a href="#">暂无</a></li>';
                }
                for(var i=0; i<projects.length; i++) {
                    var name = (item === 'arale') ? projects[i].name : item + '.' + projects[i].name;
                    html += '<li class="' + item + '"><a href="' + GitlabBaseUrl + '/' + name + '">';
                    html += projects[i].name;
                    html += '</a></li>';
                }
                html += '</ul>';
                $('.document-index').append($(html));
            });
        }, 'json');
    }
});
