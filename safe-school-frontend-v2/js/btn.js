$(function(){
    var tag = false,ox = 0,left = 0,bgleft = 0;
    var num=$(".progress1").width();
    $('.progress_btn1').mousedown(function(e) {
        ox = e.pageX - left;
        tag = true;
    });
    $(document).mouseup(function() {
        tag = false;
    });
    $('.progress1').mousemove(function(e) {//鼠标移动
        if (tag) {
            left = e.pageX - ox;
            if (left <= 0) {
                left = 0;
            }else if (left > num) {
                left = num;
            }
            $('.progress_btn1').css('left', left);
            $('.progress_bar1').width(left);
            $('.text').html(parseInt((left/num)*100) + '%');
            $(".InputBox_1").val(parseInt((left/num)*100) + '%');
        }
    });
    $('.progress_bg1').click(function(e) {//鼠标点击
        if (!tag) {
            bgleft = $('.progress_bg1').offset().left;
            left = e.pageX - bgleft;
            if (left <= 0) {
                left = 0;
            }else if (left > num) {
                left = num;
            }
            $('.progress_btn1').css('left', left);
            $('.progress_bar1').animate({width:left},num);
            $('.text').html(parseInt((left/num)*100) + '%');
            $(".InputBox_1").val(parseInt((left/num)*100) + '%');
        }
    });
    $(".InputBox_1").blur(function(){
        var a= $('.InputBox_1').val()
        var b=(a/num)*100;
        $(".progress_btn1").css('left',b+"px");
        $(".progress_bar1").css('width',b+"px");

        $('.text').html(a+'%')
    });





});