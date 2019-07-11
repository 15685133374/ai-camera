/**
 * 主要功能: updating time 
 * DC
 * 2019-07-11 20:43dd
 */
var realTime = (function() {
    var container = $('.time');
    function getTime() {
        var time=new Date();
        var year= time.getFullYear();
        var month=time.getMonth()+1;
        var day=time.getDate();
        var hour=time.getHours();
        var minutes=time.getMinutes();
        var seconds=time.getSeconds();
        var timeStr=year+"-"+month+"-"+day+" "+hour+":"+minutes+":"+seconds
        container.text("")
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