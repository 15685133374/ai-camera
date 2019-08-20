function show_live(did) {
    console.log('show_live',did)
    // var did = $(this).attr('id')
    // 创建一个弹出框.
    $('#exampleModa2').modal('show')
    // $('#exampleModa2').find('img').attr('id', 'modal-img-live-' + did)
    socket.emit('dolive', { did: did, opt: 1 });
    // $('#qidong').show();
    // socket.on(did, function (msg) {
    //     // $('#qidong').hide();
    //     var value = msg.did;
    //     $('#modal-img-live-' + value).attr('src', 'data:image/jpg;base64,' + msg.data);
    // })
    var player = document.getElementById('videoElement');
    var flvPlayer = flvjs.createPlayer({
        type: 'flv',
        isLive: true,
        hasAudio: false,
        url: 'http://192.168.1.249:8080/live/livestream.flv' //srs播放地址
    });
    flvPlayer.attachMediaElement(videoElement);
    flvPlayer.load(); 

    let response_res=sessionStorage.getItem('response_res');
    let d=JSON.parse(response_res)
    console.log(d)
    console.log(did)
    d.forEach(e=>{
        if(did==e.did){
            console.log(e)
             $('.video_title').html(e.ip+'<br>'+e.location);
        }
    })
}
 // 直播弹窗关闭
 $('#exampleModa2').on('hide.bs.modal', function(e) {
    var img = $('#exampleModa2').find('img')
    img.attr('src', '')
    var s_id = img.attr('id')
    var did = s_id.slice("modal-img-live-".length)
    socket.off(did) //停止对当前cam的直播
    socket.emit('dolive', { did: did, opt: 0 });
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
