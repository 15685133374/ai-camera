function show_live(did) {
    // var did = $(this).attr('id')
    // 创建一个弹出框.
    $('#exampleModal').modal('show')
    $('#exampleModal').find('img').attr('id', 'modal-img-live-' + did)
    socket.emit('dolive', { did: did, opt: 1 });
    $('#qidong').show();
    socket.on(did, function (msg) {
        $('#qidong').hide();
        var value = msg.did;
        $('#modal-img-live-' + value).attr('src', 'data:image/jpg;base64,' + msg.data);
    })
}
 // 直播弹窗关闭
 $('#exampleModal').on('hide.bs.modal', function(e) {
    var img = $('#exampleModal').find('img')
    img.attr('src', '')
    var s_id = img.attr('id')
    var did = s_id.slice("modal-img-live-".length)
    socket.off(did) //停止对当前cam的直播
    socket.emit('dolive', { did: did, opt: 0 });
})
