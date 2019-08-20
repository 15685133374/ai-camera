$(function(){
  function btn0(){
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
  }

  
  function btn1(){
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
  }
 
  
  function btn2(){
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
  }
  

	
	function btn3(){
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

	}
	
	
	function btn4(){
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

	}
	
	
	function btn5(){
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
		
	}
	
	
	function btn6(){
		/**
		 * Created by Administrator on 2019/7/8.
		 */
		var tag = false,ox = 0,left = 0,bgleft = 0;
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
		
	}
	
	
	function btn7(){
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
		
	}
	
	function btn8(){
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
	}
	
	
	function btn9(){
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
	}
	
	
	//调用滑块方法
	btn0();
	btn1();
	btn2();
	btn3();
	btn4();
	btn5();
	btn6();
	btn7();
	btn8();
	btn9();
});