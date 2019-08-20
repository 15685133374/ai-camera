var cameras = (function () {
    var container = $('.temp');
    var template = {
        canvas: ['<canvas width="320" >', '</canvas>'].join(""),
        li_1: '<li><span class="camera_title">beidou</span></li>',
        img: ['<img width="320px" src="../images/bdlog.png">'].join(""),
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
        api = '/api/v1/device_test/list';
        axios
            .get(host + api)
            .then(function (response) {
                // response.data.result = '';
                updateContent(response.data.result);
                let ipArray = new Array();
                let locationArray = new Array();
                let ipobj;
                let locobj;
                for(let x=0;x<response.data.result.length;x++){
                    $('.camera_title').eq(x).html(response.data.result[x].location);
                    ipArray.ipobj=response.data.result[x].ip;
                    locationArray.locobj=response.data.result[x].location;
                    ipArray.push( ipArray.ipobj);
                    locationArray.push(response.data.result[x].location);
                }
                console.log('摄像头数量：',response.data.result.length);
                let res_length = response.data.result.length;
                if(res_length<16){
                    let num=16-res_length;
                    $('.change ').css('display','none');
                    for(let i=0;i<num;i++){
                        $('.temp').append('<li><img src="../images/bdlog.png"></li>')
                    }

                }

                sessionStorage.setItem('response_res',JSON.stringify(response.data.result))
               
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    function updateContent(data) {
        for (var key in data) {
            var item = data[key].did;
            console.log()
            // var id = "camera" + item;
            var img = $(template.img);
            img.attr("id", item);
            img.click(function () {
                //点击图片,播放实时视频流
                var did = $(this).attr('id')
                show_live(did);
                console.log('did'+did);
            });
            container.append($(template.li_1).append(img));
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