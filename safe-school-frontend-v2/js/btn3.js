var tag = false,ox = 0,left = 0,bgleft = 0;
var num=$(".progress3").width();
$('.progress_btn3').mousedown(function(e) {
    ox = e.pageX - left;
    tag = true;
});
$(document).mouseup(function() {
    tag = false;
});
$('.progress3').mousemove(function(e) {//鼠标移动
    if (tag) {
        left = e.pageX - ox;
        if (left <= 0) {
            left = 0;
        }else if (left > num) {
            left = num;
        }
        $('.progress_btn3').css('left', left);
        $('.progress_bar3').width(left);
        $('.text_3').html(parseInt((left/num)*100) + '%');
        $(".InputBox_3").val(parseInt((left/num)*100) + '%');
    }
});
$('.progress_bg3').click(function(e) {//鼠标点击
    if (!tag) {
        bgleft = $('.progress_bg3').offset().left;
        left = e.pageX - bgleft;
        if (left <= 0) {
            left = 0;
        }else if (left > num) {
            left = num;
        }
        $('.progress_btn3').css('left', left);
        $('.progress_bar3').animate({width:left},num);
        $('.text_3').html(parseInt((left/num)*100) + '%');
        $(".InputBox_3").val(parseInt((left/num)*100) + '%');
    }
});
$(".InputBox_3").blur(function(){
    var a= $('.InputBox_3').val()
    var b=(a/num)*100;
    $(".progress_btn3").css('left',b+"px");
    $(".progress_bar3").css('width',b+"px");

    $('.text_3').html(a+'%')
});


