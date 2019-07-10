/**
 * Created by Administrator on 2019/7/8.
 */var tag = false,ox = 0,left = 0,bgleft = 0;
var num=$(".progress5").width();
$('.progress_btn5').mousedown(function(e) {
    ox = e.pageX - left;
    tag = true;
});
$(document).mouseup(function() {
    tag = false;
});
$('.progress5').mousemove(function(e) {//鼠标移动
    if (tag) {
        left = e.pageX - ox;
        if (left <= 0) {
            left = 0;
        }else if (left > num) {
            left = num;
        }
        $('.progress_btn5').css('left', left);
        $('.progress_bar5').width(left);
        $('.text_5').html(parseInt((left/num)*100) + '%');
        $(".InputBox_5").val(parseInt((left/num)*100) + '%');
    }
});
$('.progress_bg5').click(function(e) {//鼠标点击
    if (!tag) {
        bgleft = $('.progress_bg5').offset().left;
        left = e.pageX - bgleft;
        if (left <= 0) {
            left = 0;
        }else if (left > num) {
            left = num;
        }
        $('.progress_btn5').css('left', left);
        $('.progress_bar5').animate({width:left},num);
        $('.text_5').html(parseInt((left/num)*100) + '%');
        $(".InputBox_5").val(parseInt((left/num)*100) + '%');
    }
});
$(".InputBox_5").blur(function(){
    var a= $('.InputBox_4').val()
    var b=(a/num)*100;
    $(".progress_btn5").css('left',b+"px");
    $(".progress_bar5").css('width',b+"px");

    $('.text_5').html(a+'%')
});



