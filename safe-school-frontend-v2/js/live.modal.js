function show_live(did) {
    console.log('show_live', did)
    // var did = $(this).attr('id')
    // 创建一个弹出框.
    $('#exampleModa2').modal('show')
    // $('#exampleModa2').find('img').attr('id', 'modal-img-live-' + did)
    socket.emit('dolive', { did: did, opt: 1 });
    socket.on(did, function (msg) {
        var live_src = msg.live_src;
        var user_watch_token = msg.user_watch_token;
        console.log(msg)
        var domain = document.domain;
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
$('#exampleModa2').on('hide.bs.modal', function (e) {
    var player = $('#exampleModa2').find('video')
    var user_watch_token = player.attr('user_watch_token')
    var did = player.attr('did')
    player.attr('user_watch_token', '')
    player.attr('did', '')
    socket.off(did) //停止对当前cam的直播
    socket.emit('dolive', { did: did, opt: 0, user_watch_token: user_watch_token });
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
// })