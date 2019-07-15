var cameras = (function() {
    var container = $('.temp');
    var template = {
        canvas: ['<canvas width="320" >', '</canvas>'].join(""),
        li_1:'<li></li>',
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
        var host=window.location.host;
        host = 'http://' + host
        api = '/api/v1/device/list';
        axios
            .get(host + api)
            .then(function(response) {
                updateContent(response.data.result);
            })
            .catch(function(error) {
                console.log(error);
            });
    }

    function updateContent(data) {
        for(var key in data){
            var item = key;
            // var id = "camera" + item;
            var img = $(template.img);
            img.attr("id", item)
            img.click(function() {
                //点击图片,播放实时视频流
                var did = $(this).attr('id')
                    // 创建一个弹出框.
                $('#exampleModal').modal('show')
                $('#exampleModal').find('img').attr('id', 'modal-img-live-' + did)
                socket.emit('dolive', { did: did, opt: 1 });
                $('#qidong').show();
                socket.on(did, function(msg) {
                    // console.log('接受实时frame')
                    $('#qidong').hide();
                    var value = msg.did;
                    // 显示base64图片
                    $('#modal-img-live-'+value).attr('src', 'data:image/jpg;base64,' + msg.data);
                    // 直接读取二进制数据.
                    // console.log(msg.data)
                    // var arrayBufferView = new Uint8Array(this.response);
                    // var blob = new Blob([arrayBufferView], { type: "image/jpeg" });
                    // var urlCreator = window.URL || window.webkitURL;
                    // var imageUrl = urlCreator.createObjectURL(blob);
                    // var img = $('[id$="modal-img-live-' + value + '"]');
                    // img.attr('src', imageUrl);
                })
            })
            container.append($(template.li_1).append(img))
        }
        // 直播弹窗关闭
        $('#exampleModal').on('hide.bs.modal', function(e) {
            // console.log('modal hide')
            var img = $('#exampleModal').find('img')
            img.attr('src', '')
            var s_id = img.attr('id')
            var did = s_id.slice("modal-img-live-".length)
                // console.log('img id is '+did)
            socket.off(did) //停止对当前cam的直播
            socket.emit('dolive', { did: did, opt: 0 });
        })
    }

    function main() {
        console.log("获取摄像头");
        getData();
        // setOneFrame();

        // var playlistHeight = $(".playlist").height();
        // var w = $('.playlist').width();
        // $('.resultlist2').css('width', w);
        // $(".box").css("max-height", playlistHeight);



        
        socket.on('frame', function(msg) {
            value = msg.did
            // console.log(value)
            // console.log($('#' + value))
            // $('[id$="' + value + '"]').attr('src', 'data:image/jpg;base64,' + msg.data);
            $('#' + value).attr('src', 'data:image/jpg;base64,' + msg.data);
            // $('#onecamera').attr('src', 'data:image/jpg;base64,' + msg.data);
            // $("#cam").attr('src', 'data:image/jpg;base64,' +  msg.data);
        });
        // socket.on('result', function(msg) {
        //     console.log(msg)
        //         // uid,face,time,did
        //         // log_id = msg.id
        //         // // 将数据显示到界面上。
        //         // var eq1 = JSON.stringify(log) === JSON.stringify(msg)
        //         // if (!eq1) {
        //     lis = $('.resultlist2').find('li')
        //     flag = 1
        //     lis.each(function() {
        //         current = $(this)
        //         if (current.attr('user_data') == msg.uid) {
        //             current.find(".re_name").text(msg.name);
        //             var result_time = msg.time;
        //             var a = result_time.split(" ")
        //             var result_time_str = a[1] + "<br>" + a[0]
        //             current.find(".time_t").html(result_time_str);
        //             current.find("img").attr('src', 'data:image/jpg;base64,' + msg.face);
        //             // console.log($('.resultlist2').find('user_data'))
        //             flag = 0
        //         }
        //     })
        //     if (flag) {
        //         var li = $(template.li_str);
        //         li.attr('user_data', msg.uid)
        //         li.find(".re_name").text(msg.name);
        //         var result_time = msg.time;
        //         var a = result_time.split(" ")
        //         var result_time_str = a[1] + "<br>" + a[0]
        //         li.find(".time_t").html(result_time_str);
        //         // li.find(".location").text(msg.device)
        //         li.find("img").attr('src', 'data:image/jpg;base64,' + msg.face);
        //         $('.resultlist2').find("ul").prepend(li);
        //     }

        //     // 这里要控制元素的个数。
        //     // log=msg
        //     // }
        // });

        // //一条实时视频流
        // socket.on('onelive', function(msg) {
        //     value = msg.did
        //     $('[id$="' + value + '"]').attr('src', 'data:image/jpg;base64,' + msg.data);
        // })
    }
    return {
        main: main
    }
})($);