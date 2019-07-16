var cameras = (function () {
    var container = $('.temp');
    var template = {
        canvas: ['<canvas width="320" >', '</canvas>'].join(""),
        li_1: '<li></li>',
        img: ['<img width="320px" src="../images/15687_main.jpg">'].join(""),
        result: ['<div><li></li></div>'].join(""),
        li_str: ['<li user_data="0">',
            '    <span></span>',
            '    <img width="50" height="50">',
            '    <div class="re_name">',
            '    </div>',
            '    <div class="time">',
            '        <span class="time_t"></span>',
            '        <span class="location"></span>',
            '    </div>',
            '</li>'
        ].join(""),
    };

    function getData() {
        var uid = getCookie("uid");
        var host = window.location.host;
        host = 'http://' + host
        api = '/api/v1/device/list';
        axios
            .get(host + api)
            .then(function (response) {
                updateContent(response.data.result);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    function updateContent(data) {
        for (var key in data) {
            var item = key;
            // var id = "camera" + item;
            var img = $(template.img);
            img.attr("id", item);
            img.click(function () {
                //点击图片,播放实时视频流
                var did = $(this).attr('id')
                show_live(did)

            });
            container.append($(template.li_1).append(img))
        }

    }

    function main() {
        getData();
        socket.on('frame', function (msg) {
            value = msg.did;
            $('#' + value).attr('src', 'data:image/jpg;base64,' + msg.data);
        });
    }
    return {
        main: main
    }
})($);