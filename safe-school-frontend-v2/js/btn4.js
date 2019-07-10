var tag = false,ox = 0,left = 0,bgleft = 0;
var num=$(".progress4").width();
$('.progress_btn4').mousedown(function(e) {
    ox = e.pageX - left;
    tag = true;
});
$(document).mouseup(function() {
    tag = false;
});
$('.progress4').mousemove(function(e) {//鼠标移动
    if (tag) {
        left = e.pageX - ox;
        if (left <= 0) {
            left = 0;
        }else if (left > num) {
            left = num;
        }
        $('.progress_btn4').css('left', left);
        $('.progress_bar4').width(left);
        $('.text_4').html(parseInt((left/num)*100) + '%');
        $(".InputBox_4").val(parseInt((left/num)*100) + '%');
    }
});
$('.progress_bg4').click(function(e) {//鼠标点击
    if (!tag) {
        bgleft = $('.progress_bg4').offset().left;
        left = e.pageX - bgleft;
        if (left <= 0) {
            left = 0;
        }else if (left > num) {
            left = num;
        }
        $('.progress_btn4').css('left', left);
        $('.progress_bar4').animate({width:left},num);
        $('.text_4').html(parseInt((left/num)*100) + '%');
        $(".InputBox_4").val(parseInt((left/num)*100) + '%');
    }
});
$(".InputBox_4").blur(function(){
    var a= $('.InputBox_4').val()
    var b=(a/num)*100;
    $(".progress_btn4").css('left',b+"px");
    $(".progress_bar4").css('width',b+"px");

    $('.text_4').html(a+'%')
});


