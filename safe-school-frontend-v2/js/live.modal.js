<<<<<<< HEAD
<<<<<<< HEAD
var timer;

function show_live(did) {
    console.log('show_live', did)
        // var did = $(this).attr('id')
        // 创建一个弹出框.
    $('#exampleModa2').modal('show')
    var domain = document.domain;
    // $('#exampleModa2').find('img').attr('id', 'modal-img-live-' + did)
    socket.emit('dolive', { did: did, opt: 1, domain: domain });
    socket.on(did, function(msg) {
        var live_src = msg.live_src;
        var user_watch_token = msg.user_watch_token;
        console.log(msg)

        // var src='http://'+domain+":8080/live/livestream/"+did+'.flv'
        // console.log(src)
        $('#videoElement').attr('user_watch_token', user_watch_token)
        $('#videoElement').attr('did', did)
        var videoElement = document.getElementById('videoElement');
        var flvPlayer = flvjs.createPlayer({
            type: 'flv',
            isLive: true,
            hasAudio: false,
            url: live_src //srs播放地址
        });
        flvPlayer.attachMediaElement(videoElement);
        flvPlayer.load();
        flvPlayer.play();
        // start sending user_watch_token to server to extend watch
        // 启动定时任务
        timer = setInterval(function() { socket.emit('extend_watch', { user_watch_token: user_watch_token }); }, 5000);
    })

    let response_res = sessionStorage.getItem('response_res');
    let d = JSON.parse(response_res)
    console.log(d)
    console.log(did)
    d.forEach(e => {
            if (did == e.did) {
                console.log(e)
                $('.video_title').html(e.location);
            }
        })
        //
}


// 直播弹窗关闭
$('#exampleModa2').on('hide.bs.modal', function(e) {
    var player = $('#exampleModa2').find('video')
    var user_watch_token = player.attr('user_watch_token')
    var did = player.attr('did')
    player.attr('user_watch_token', '')
    player.attr('did', '')
    socket.off(did) //停止对当前cam的直播
    socket.emit('dolive', { did: did, opt: 0, user_watch_token: user_watch_token });
    clearInterval(timer)
})

// $('#exampleModal1').on('hide.bs.modal', function(e) {
//     var imgs = $('#exampleModal1').find('img');
//     // console.log(imgs)
//     imgs.forEach(e => {

//     });
//     // imgs.attr('src', '')
//     // var s_id = img.attr('class')
//     // var did = s_id.slice("modal-img-live-".length)
//     // socket.off(did) //停止对当前cam的直播
//     // socket.emit('dolive', { did: did, opt: 0 });
//     // console.log("关闭直播")
// }
=======
/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-02 16:23:55
 * @LastEditTime: 2019-09-02 16:51:43
 * @LastEditors: Please set LastEditors
 */
var timer;

//播放视频方法，一个参数为弹窗播放，二个参数为点击播放
function show_live(did,video_type) {
    console.log('show_live', did)
        // var did = $(this).attr('id')
    if ($('#videoElement').attr('did') == did) {
        // 该摄像头已经在直播中,
        console.log("该摄像头已经在直播中")
        return;
    }
    // 创建一个弹出框.
    $('#exampleModa2').modal('show');
    var domain = document.domain;
    var host = window.location.host;
    host = 'http://' + host;
    var api = '/api/v1/onelive/watchtoken';
	refresh_token();//刷新token
    // 添加到观看直播
    axios.post(host + api, {
			headers:request_header,
            did: did,
            domain: domain
        })
        .then(function(response) {
            var data = response.data.data
            var live_src = data.live_src;
            var user_watch_token = data.user_watch_token;
            $('#videoElement').attr('user_watch_token', user_watch_token)
            $('#videoElement').attr('did', did)
            var videoElement = document.getElementById('videoElement');
            var flvPlayer = flvjs.createPlayer({
                type: 'flv',
                isLive: true,
                hasAudio: false,
                url: live_src //srs播放地址
            });
            flvPlayer.attachMediaElement(videoElement);
            flvPlayer.load();
            flvPlayer.play();
            // start sending user_watch_token to server to extend watch
            // 启动定时任务
            clearInterval(timer) //先清掉定时器再设置定时器
            timer = setInterval(function() {
                // socket.emit('extend_watch', { user_watch_token: user_watch_token });
                axios.patch(host + api, {
                        user_watch_token: user_watch_token,
                    })
                    .then(function(response) {
                        console.log(response.data)
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
                console.log("*************************************")
                console.log('发送报活,继续观看 ' + user_watch_token)
                console.log("*************************************")

            }, 4 * 60 * 1000);

        })
        .catch(function(error) {
            console.log(error);
        });
	
    // 从数据库中获取摄像头地址,于播放器显示在一起.
    let response_res = sessionStorage.getItem('response_res');
    let d = JSON.parse(response_res);
	for(let i in d){
		if(did == d[i].did){
			$('.video_title').html(d[i].location);
		}
	}
	
	//当前视频为点击播放执行以下代码
	if(video_type==1){	
		$('#event_num').hide();
		$('#exampleModalLabel').hide();
		$('.modal-title').hide();
		$('.btn_event_process').hide();
		$('.modal-content .modal-header').attr('id','video_close');
	}
}
>>>>>>> anhuiyou
=======
/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-02 16:23:55
 * @LastEditTime: 2019-09-02 16:51:43
 * @LastEditors: Please set LastEditors
 */
var timer;

//播放视频方法，一个参数为弹窗播放，二个参数为点击播放
function show_live(did,video_type) {
    console.log('show_live', did)
        // var did = $(this).attr('id')
    if ($('#videoElement').attr('did') == did) {
        // 该摄像头已经在直播中,
        console.log("该摄像头已经在直播中")
        return;
    }
    // 创建一个弹出框.
    $('#exampleModa2').modal('show');
    var domain = document.domain;
    var host = window.location.host;
    host = 'http://' + host;
    var api = '/api/v1/onelive/watchtoken';
	refresh_token();//刷新token
    // 添加到观看直播
    axios.post(host + api, {
			headers:request_header,
            did: did,
            domain: domain
        })
        .then(function(response) {
            var data = response.data.data
            var live_src = data.live_src;
            var user_watch_token = data.user_watch_token;
            $('#videoElement').attr('user_watch_token', user_watch_token)
            $('#videoElement').attr('did', did)
            var videoElement = document.getElementById('videoElement');
            var flvPlayer = flvjs.createPlayer({
                type: 'flv',
                isLive: true,
                hasAudio: false,
                url: live_src //srs播放地址
            });
            flvPlayer.attachMediaElement(videoElement);
            flvPlayer.load();
            flvPlayer.play();
            // start sending user_watch_token to server to extend watch
            // 启动定时任务
            clearInterval(timer) //先清掉定时器再设置定时器
            timer = setInterval(function() {
                // socket.emit('extend_watch', { user_watch_token: user_watch_token });
                axios.patch(host + api, {
                        user_watch_token: user_watch_token,
                    })
                    .then(function(response) {
                        console.log(response.data)
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
                console.log("*************************************")
                console.log('发送报活,继续观看 ' + user_watch_token)
                console.log("*************************************")

            }, 4 * 60 * 1000);

        })
        .catch(function(error) {
            console.log(error);
        });
	
    // 从数据库中获取摄像头地址,于播放器显示在一起.
    let response_res = sessionStorage.getItem('response_res');
    let d = JSON.parse(response_res);
	for(let i in d){
		if(did == d[i].did){
			$('.video_title').html(d[i].location);
		}
	}
	
	//当前视频为点击播放执行以下代码
	if(video_type==1){	
		$('#event_num').hide();
		$('#exampleModalLabel').hide();
		$('.modal-title').hide();
		$('.btn_event_process').hide();
		$('.modal-content .modal-header').attr('id','video_close');
	}
}
>>>>>>> anhuiyou
