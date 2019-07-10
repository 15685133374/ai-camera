$(function() {
    $(".click").toggle(function() {
        $(".click").attr("src", "../images/right.png");
    }, function() {
        $(".click").attr("src", "../images/Left.png");
    })
    $(".click_1").toggle(function() {
        $(".click_1").attr("src", "../images/right.png");
    }, function() {
        $(".click_1").attr("src", "../images/Left.png");
    })
    $(".click_2").toggle(function() {
        $(".click_2").attr("src", "../images/right.png");
    }, function() {
        $(".click_2").attr("src", "../images/Left.png");
    })
    $(".click_3").toggle(function() {
        $(".click_3").attr("src", "../images/right.png");
    }, function() {
        $(".click_3").attr("src", "../images/Left.png");
    })
    $(".click_4").toggle(function() {
        $(".click_4").attr("src", "../images/right.png");
    }, function() {
        $(".click_4").attr("src", "../images/Left.png");
    })
    $(".click_5").toggle(function() {
        $(".click_5").attr("src", "../images/right.png");
    }, function() {
        $(".click_5").attr("src", "../images/Left.png");
    })
    $(".click_6").toggle(function() {
        $(".click_6").attr("src", "../images/right.png");
    }, function() {
        $(".click_6").attr("src", "../images/Left.png");
    })
    $(".click_7").toggle(function() {
        $(".click_7").attr("src", "../images/right.png");
    }, function() {
        $(".click_7").attr("src", "../images/Left.png");
    })
    $(".click_8").toggle(function() {
        $(".click_8").attr("src", "../images/right.png");
    }, function() {
        $(".click_8").attr("src", "../images/Left.png");
    })
    $(".click_9").toggle(function() {
        $(".click_9").attr("src", "../images/right.png");
    }, function() {
        $(".click_9").attr("src", "../images/Left.png");
    })
    $(".click_10").toggle(function() {
        $(".click_10").attr("src", "../images/right.png");
    }, function() {
        $(".click_10").attr("src", "../images/Left.png");
    })
    $(".click_11").toggle(function() {
        $(".click_11").attr("src", "../images/right.png");
    }, function() {
        $(".click_11").attr("src", "../images/Left.png");
    })
    $(".click_12").toggle(function() {
        $(".click_12").attr("src", "../images/right.png");
    }, function() {
        $(".click_12").attr("src", "../images/Left.png");
    })
    $(".click_13").toggle(function() {
        $(".click_13").attr("src", "../images/right.png");
    }, function() {
        $(".click_13").attr("src", "../images/Left.png");
    })
    $(".click_14").toggle(function() {
        $(".click_14").attr("src", "../images/right.png");
    }, function() {
        $(".click_14").attr("src", "../images/Left.png");
    })
    $(".click_15").toggle(function() {
        $(".click_15").attr("src", "../images/right.png");
    }, function() {
        $(".click_15").attr("src", "../images/Left.png");
    })
    $(".click_16").toggle(function() {
        $(".click_16").attr("src", "../images/right.png");
    }, function() {
        $(".click_16").attr("src", "../images/Left.png");
    })
    $(".click_17").toggle(function() {
        $(".click_17").attr("src", "../images/right.png");
    }, function() {
        $(".click_17").attr("src", "../images/Left.png");
    })
    $("#rld").click(function() {
        $(".Popup_1").css("display", "block");
    })

    var X = event.clientX - canvas.getBoundingClientRect().left;
    var Y = event.clientY - canvas.getBoundingClientRect().top;
    var myCanvas = document.querySelector("#myCanvas");
    var ctx = myCanvas.getContext("2d");
    for (var a = 0; a < 4; a++) {
        ctx.beginPath();
        ctx.lineTo(X, Y);
        ctx.closePath();
        ctx.stroke();
    }
})