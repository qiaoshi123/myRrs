/**
 * Created by zhufengpeixun on 2016/5/8.
 */
;
(function (undefined) {
    /**
     * @param {string} url 请求的jsonp接口
     * @param {string|object} data 发送的数据
     * @param {string} jsonpcallback
     * @param {Function} callback 回调函数
     * @type {Function}
     *
     */
    window.jsonp = function (url, data, jsonpcallback, callback){
        // 生成jsonp的静态函数名
        var count = 'test' + window.jsonp.counter++;
        // 生成jsonpcallabck后面的回调函数名
        var callbackName = 'window.jsonp.' + count;
        window.jsonp[count] = function (data) {
            try {
                callback(data);
            } finally {
                delete window.jsonp[count];
                script.parentNode.removeChild(script);
            }
        };
        if (data) {
            data = tools.encodeToURIString(data);
            url = tools.hasSearch(url, data);
        }
        url = tools.hasSearch(url, jsonpcallback + '=' + callbackName);
        var script = document.createElement('script');
        script.type = "text/javascript";
        script.async = 'async';
        script.src = url;
        document.body.appendChild(script);
    };
    // 计数器
    window.jsonp.counter = 1;

    var tools = {
        encodeToURIString: function (data) {
            if (typeof data !== 'object') {
                return data;
            }
            var arr = [];
            for (var n in data) {
                if (!data.hasOwnProperty(n)) continue;
                arr.push(encodeURIComponent(n) + '=' + encodeURIComponent(data[n]));
            }
            return arr.join('&');
        },
        hasSearch: function (url, padString) {
            return url + (/\?/.test(url) ? '&' : '?') + padString;
        }
    }
})();