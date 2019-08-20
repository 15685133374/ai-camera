var player = document.getElementById('videoElement');
if (flvjs.isSupported()) {
    var flvPlayer = flvjs.createPlayer({
        type: 'flv',
        isLive: true,
        hasAudio: false,
        url: 'http://192.168.1.249:8080/live/livestream.flv' //srs播放地址
    });
    flvPlayer.attachMediaElement(videoElement);
    flvPlayer.load(); //加载
}

function flv_start() {
    player.play();
}

function flv_pause() {
    player.pause();
}

function flv_destroy() {
    player.pause();
    player.unload();
    player.detachMediaElement();
    player.destroy();
    player = null;
}

function flv_seekto() {
    player.currentTime = parseFloat(document.getElementsByName('seekpoint')[0].value);
}