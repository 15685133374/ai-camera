<<<<<<< HEAD
/**
 * 主要功能: updating time 
 * DC
 * 2019-07-11 20:43dd
 */
document.ondragstart = document.onselectstart = function(){return false;};	//阻止页面内容被选中或拖动（选中之后整体颜色很难看）

var realTime = (function() {
    var container = $('.current_time');

    function formatTime(t) {
        if (t < 10) {
            t = '0' + t;
        }
        return t
    }

    function getTime() {
        var time = new Date();
        var year = time.getFullYear();
        var month = formatTime(time.getMonth() + 1);
        var day = formatTime(time.getDate());
        var hour = formatTime(time.getHours());
        var minutes = formatTime(time.getMinutes());
        var seconds = formatTime(time.getSeconds());

        var timeStr = year + "-" + month + "-" + day + " " + hour + ":" + minutes + ":" + seconds
        container.text(timeStr)
        setTimeout(getTime, 1000);
    }

    function main() {
        // var timeout=;
        getTime();
    }
    return {
        main: main
    }
})($); 

=======
/**
 * 主要功能: updating time 
 * DC
 * 2019-07-11 20:43dd
 */
document.ondragstart = document.onselectstart = function(){return false;};	//阻止页面内容被选中或拖动（选中之后整体颜色很难看）

var realTime = (function() {
    var container = $('.current_time');

    function formatTime(t) {
        if (t < 10) {
            t = '0' + t;
        }
        return t
    }

    function getTime() {
        var time = new Date();
        var year = time.getFullYear();
        var month = formatTime(time.getMonth() + 1);
        var day = formatTime(time.getDate());
        var hour = formatTime(time.getHours());
        var minutes = formatTime(time.getMinutes());
        var seconds = formatTime(time.getSeconds());

        var timeStr = year + "-" + month + "-" + day + " " + hour + ":" + minutes + ":" + seconds
        container.text(timeStr)
        setTimeout(getTime, 1000);
    }

    function main() {
        // var timeout=;
        getTime();
    }
    return {
        main: main
    }
})($); 

>>>>>>> anhuiyou
