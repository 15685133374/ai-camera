$(function(){
    var tag = false,ox = 0,left = 0,bgleft = 0;
    var num=$(".progress9").width();
    $('.progress_btn9').mousedown(function(e) {
        ox = e.pageX - left;
        tag = true;
    });
    $(document).mouseup(function() {
        tag = false;
    });
    $('.progress9').mousemove(function(e) {//鼠标移动
        if (tag) {
            left = e.pageX - ox;
            if (left <= 0) {
                left = 0;
            }else if (left > num) {
                left = num;
            }
            $('.progress_btn9').css('left', left);
            $('.progress_bar9').width(left);
            $('.text_9').html(parseInt((left/num)*100) + '%');
            $(".InputBox_9").val(parseInt((left/num)*100) + '%');
        }
    });
    $('.progress_bg9').click(function(e) {//鼠标点击
        if (!tag) {
            bgleft = $('.progress_bg9').offset().left;
            left = e.pageX - bgleft;
            if (left <= 0) {
                left = 0;
            }else if (left > num) {
                left = num;
            }
            $('.progress_btn9').css('left', left);
            $('.progress_bar9').animate({width:left},num);
            $('.text_9').html(parseInt((left/num)*100) + '%');
            $(".InputBox_9").val(parseInt((left/num)*100) + '%');
        }
    });
    $(".InputBox_9").blur(function(){
        var a= $('.InputBox_9').val()
        var b=(a/num)*100;
        $(".progress_btn9").css('left',b+"px");
        $(".progress_bar9").css('width',b+"px");
        $('.text_9').html(a+'%')
    });
});