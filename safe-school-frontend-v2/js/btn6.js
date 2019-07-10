/**
 * Created by Administrator on 2019/7/8.
 */var tag = false,ox = 0,left = 0,bgleft = 0;
var num=$(".progress6").width();
$('.progress_btn6').mousedown(function(e) {
    ox = e.pageX - left;
    tag = true;
});
$(document).mouseup(function() {
    tag = false;
});
$('.progress6').mousemove(function(e) {//鼠标移动
    if (tag) {
        left = e.pageX - ox;
        if (left <= 0) {
            left = 0;
        }else if (left > num) {
            left = num;
        }
        $('.progress_btn6').css('left', left);
        $('.progress_bar6').width(left);
        $('.text_6').html(parseInt((left/num)*100) + '%');
        $(".InputBox_6").val(parseInt((left/num)*100) + '%');
    }
});
$('.progress_bg6').click(function(e) {//鼠标点击
    if (!tag) {
        bgleft = $('.progress_bg6').offset().left;
        left = e.pageX - bgleft;
        if (left <= 0) {
            left = 0;
        }else if (left > num) {
            left = num;
        }
        $('.progress_btn6').css('left', left);
        $('.progress_bar6').animate({width:left},num);
        $('.text_6').html(parseInt((left/num)*100) + '%');
        $(".InputBox_6").val(parseInt((left/num)*100) + '%');
    }
});
$(".InputBox_6").blur(function(){
    var a= $('.InputBox_6').val()
    var b=(a/num)*100;
    $(".progress_btn6").css('left',b+"px");
    $(".progress_bar6").css('width',b+"px");

    $('.text_6').html(a+'%')
});




