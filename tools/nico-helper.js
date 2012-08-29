seajs.use('$', function($) {
    
    if (location.hostname.indexOf('alipay.im') > 0) {

        var GitlabBaseUrl = "http://git.alipay.im";

        // 更改源码的对应地址
        var code = $('#code-link');
        if (code.length) {
            var projectUrl = location.href.match(/^http:\/\/arale2\.alipay\.im\/[^\/.]*\//);
            code.attr('href', projectUrl.replace('arale2.alipay.im', 'git.alipay.im'));
        }

        // 将用例的链接设为新窗口打开，主页设为本窗口打开
        $('#nav-test').attr('target', '_blank');
        $('#logo').attr('target', '');
        $('#code-link').attr('target', '_blank');

        // 增加一个全局导航触发点
        $('#main .container').append($(
            '<div class="document-index">' +
            '<input placeholder="搜索组件，回车到达" type="text" id="search" />' +
            '<button id="update">更新文档</button>' +
            '</div>'));

        $('#update').click(function() {
            $(this).html('更新中...')
                   .attr('disabled', 'disabled')
                   .css('background-color', '#ccc');
            $.get('/-webhook', function() {
                location.reload();
            });
        });

        // 载入组件信息
        $.get('/info.json', function(data) {
            $(['arale', 'alipay', 'alice']).each(function(i, item) {
                var html = '<h2>' + item + '</h2><ul class="document-section fn-clear">',
                    projects = data[item];
                if(!projects.length) {
                    html += '<li class="' + item + '"><a href="#">暂无</a></li>';
                }
                for(var i=0; i<projects.length; i++) {
                    var name = (item === 'arale') ? projects[i].name : item + '_' + projects[i].name;
                    html += '<li class="' + item + '"><a href="http://' + location.hostname + '/' + name + '">';
                    html += projects[i].name;
                    html += '</a></li>';
                }
                html += '</ul>';
                $('#update').before($(html));
                
                $('.document-index').show();
                $('#search').focus();
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
                location.href = $('.document-index li:visible a')[0].getAttribute('href');
            }
        });
        
    }
    else if (location.hostname.indexOf('127.0.0.1') > 0) {
        $('#main .container').append($(
            '<div class="document-index">这尼玛是本地调试环境吧！</div>'));
    }

});

