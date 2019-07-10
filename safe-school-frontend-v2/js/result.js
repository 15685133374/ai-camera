/**
 * 获取识别的结果。
 */
var Result = (function ($) {
    var container = $('.resultlist').find("ul");
    var template = {
        li_str: ['<li>',
            '    <span></span>',
            '    <img width="50" height="50">',
            '    <div class="re_name">',
            '    </div>',
            '    <div class="time">',
            '        <span class="time_t"></span>',
            '        <span class="location"></span>',
            '    </div>',
            '</li>'].join(""),
    };
    function getData() {    }
    function updateContent(data) { }
    function main() {
        // 设置识别结果栏的高度
        var playlistHeight = $(".playlist").height();
        $(".box").css("max-height", playlistHeight);

        console.log("拉取识别结果");
        // getData();
        var log_id = 0;
        // 与服务器建立socket链接
        var socket = io.connect();
        socket.on('connect', function () {
            console.log("链接到安全平台上");
             socket.emit('ai_result', { data:  '0'});
        })
        // var timer = setInterval(function () {
        //     //  console.log("log_id is  "+log_id);
        //     socket.emit('ai_result', { data: "1" });
        // }, 1000)
        // 收到服务器端返回的消息
        var log;
        socket.on('result', function (msg) {
            console.log('get result')
            // uid,face,time,did
            // log_id = msg.id
            // // 将数据显示到界面上。
            // var eq1 = JSON.stringify(log) === JSON.stringify(msg)
            // if (!eq1) {
                var li = $(template.li_str);
                li.find(".re_name").text(msg.name);
                var result_time = msg.time;
                var a = result_time.split(" ")
                var result_time_str = a[1] + "<br>" + a[0]
                li.find(".time_t").html(result_time_str);
                li.find(".location").text(msg.device)
                li.find("img").attr('src', 'data:image/jpg;base64,' +  msg.face);
                container.prepend(li);
                // log=msg
            // }
        });
    }
    return {
        main: main
    }
})($);