define(['#jquery/1.7.2/jquery'], function(require, exports) {
    var $ = require('#jquery/1.7.2/jquery');

    $('#nav a').click(function(e) {
        var href = $(this).attr('href');
        if (href.indexOf('#') === 0) {
            e.preventDefault();
            history.pushState && history.pushState(null, null, href);
            $('.highlight').removeClass('highlight');
            $('html, body').animate({
                scrollTop: $(href).addClass('highlight').offset().top
            }, 400);
        }
    });

    var $modules = $('.modules');
    $modules.hide();
    if (location.hash == '#utilities' || location.hash == '#widgets') {
        $(location.hash).show();
    } else {
        $('#infrastructure').show();
        if (location.hash && location.hash != '#infrastructure') {
            $(location.hash).addClass('highlight');
        }
    }

    $('.tab a').click(function(e) {
        e.preventDefault();
        switchTab($(this).attr('href'));
        history.pushState && history.pushState(null, null, this.href);
    });

    function switchTab(id) {
        var $target = $(id);
        if ($target.is(':visible')) {
            return;
        }
        $modules.slideUp('ease-in');
        $target.slideDown('ease-out');
    }
});
