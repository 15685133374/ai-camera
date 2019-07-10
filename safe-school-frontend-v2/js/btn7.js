var tag = false,ox = 0,left = 0,bgleft = 0;
var num=$(".progress7").width();
$('.progress_btn7').mousedown(function(e) {
    ox = e.pageX - left;
    tag = true;
});
$(document).mouseup(function() {
    tag = false;
});
$('.progress7').mousemove(function(e) {//鼠标移动
    if (tag) {
        left = e.pageX - ox;
        if (left <= 0) {
            left = 0;
        }else if (left > num) {
            left = num;
        }
        $('.progress_btn7').css('left', left);
        $('.progress_bar7').width(left);
        $('.text_7').html(parseInt((left/num)*100) + '%');
        $(".InputBox_7").val(parseInt((left/num)*100) + '%');
    }
});
$('.progress_bg7').click(function(e) {//鼠标点击
    if (!tag) {
        bgleft = $('.progress_bg7').offset().left;
        left = e.pageX - bgleft;
        if (left <= 0) {
            left = 0;
        }else if (left > num) {
            left = num;
        }
        $('.progress_btn7').css('left', left);
        $('.progress_bar7').animate({width:left},num);
        $('.text_7').html(parseInt((left/num)*100) + '%');
        $(".InputBox_7").val(parseInt((left/num)*100) + '%');
    }
});
$(".InputBox_7").blur(function(){
    var a= $('.InputBox_7').val()
    var b=(a/num)*100;
    $(".progress_btn7").css('left',b+"px");
    $(".progress_bar7").css('width',b+"px");

    $('.text_7').html(a+'%')
});


