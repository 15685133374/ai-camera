var tag = false,ox = 0,left = 0,bgleft = 0;
var num=$(".progress2").width();
$('.progress_btn2').mousedown(function(e) {
    ox = e.pageX - left;
    tag = true;
});
$(document).mouseup(function() {
    tag = false;
});
$('.progress2').mousemove(function(e) {//鼠标移动
    if (tag) {
        left = e.pageX - ox;
        if (left <= 0) {
            left = 0;
        }else if (left > num) {
            left = num;
        }
        $('.progress_btn2').css('left', left);
        $('.progress_bar2').width(left);
        $('.text_2').html(parseInt((left/num)*100) + '%');
        $(".InputBox_2").val(parseInt((left/num)*100) + '%');
    }
});
$('.progress_bg2').click(function(e) {//鼠标点击
    if (!tag) {
        bgleft = $('.progress_bg2').offset().left;
        left = e.pageX - bgleft;
        if (left <= 0) {
            left = 0;
        }else if (left > num) {
            left = num;
        }
        $('.progress_btn2').css('left', left);
        $('.progress_bar2').animate({width:left},num);
        $('.text_2').html(parseInt((left/num)*100) + '%');
        $(".InputBox_2").val(parseInt((left/num)*100) + '%');
    }
});
$(".InputBox_2").blur(function(){
    var a= $('.InputBox_2').val()
    var b=(a/num)*100;
    $(".progress_btn2").css('left',b+"px");
    $(".progress_bar2").css('width',b+"px");

    $('.text_2').html(a+'%')
});

