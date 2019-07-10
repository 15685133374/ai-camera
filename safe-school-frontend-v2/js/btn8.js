$(function(){
    var tag = false,ox = 0,left = 0,bgleft = 0;
    var num=$(".progress8").width();
    $('.progress_btn8').mousedown(function(e) {
        ox = e.pageX - left;
        tag = true;
    });
    $(document).mouseup(function() {
        tag = false;
    });
    $('.progress8').mousemove(function(e) {//鼠标移动
        if (tag) {
            left = e.pageX - ox;
            if (left <= 0) {
                left = 0;
            }else if (left > num) {
                left = num;
            }
            $('.progress_btn8').css('left', left);
            $('.progress_bar8').width(left);
            $('.text_8').html(parseInt((left/num)*100) + '%');
            $(".InputBox_8").val(parseInt((left/num)*100) + '%');
        }
    });
    $('.progress_bg8').click(function(e) {//鼠标点击
        if (!tag) {
            bgleft = $('.progress_bg8').offset().left;
            left = e.pageX - bgleft;
            if (left <= 0) {
                left = 0;
            }else if (left > num) {
                left = num;
            }
            $('.progress_btn8').css('left', left);
            $('.progress_bar8').animate({width:left},num);
            $('.text8').html(parseInt((left/num)*100) + '%');
            $(".InputBox_8").val(parseInt((left/num)*100) + '%');
        }
    });
    $(".InputBox_8").blur(function(){
        var a= $('.InputBox_8').val()
        var b=(a/num)*100;
        $(".progress_btn8").css('left',b+"px");
        $(".progress_bar8").css('width',b+"px");
        $('.text_8').html(a+'%')
    });
});