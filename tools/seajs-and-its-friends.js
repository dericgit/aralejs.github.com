
// load sea.js
(function(m, o, d, u, l, a, r) {
    if(m[d]) return;
    function f(n, t) { return function() { r.push(n, arguments); return t; } }
    m[d] = a = { args: (r = []), config: f(0, a), use: f(1, a) };
    m.define = f(2);
    u = o.createElement('script');
    u.id = d + 'node';
    u.src = 'http://seajs.org/dist/sea.js';
    l = o.getElementsByTagName('head')[0];
    l.insertBefore(u, l.firstChild);
})(window, document, 'seajs');


// and its friends
seajs.config({

    base: 'https://a.alipayobjects.com/static/arale/',

    alias: {
        '$': 'jquery/1.7.2/jquery',
        'jquery': 'jquery/1.7.2/jquery',
        'zepto': 'zepto/0.9.0/zepto',
        'underscore': 'underscore/1.3.3/underscore',
        'json': 'json/1.0.2/json',
        'handlebars': 'handlebars/1.0.0/handlebars',
        'moment': 'moment/1.6.2/moment',
        'async': 'async/0.1.18/async',
        'store': 'store/1.3.3/store',
        'swfobject': 'swfobject/2.2.0/swfobject',
        'backbone': 'backbone/0.9.2/backbone',
        'jasmine': 'jasmine/1.1.0/jasmine-html',
    },

    preload: [this.JSON ? '' : 'json', 'seajs/plugin-text']
});
