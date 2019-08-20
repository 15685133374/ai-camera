function reply(){
			window.history.go(-1);
		}
		$('.temp').click(function(){
	var key=$(this).html();

	var len=$(this).length;
		if(key=='开'){
			$(this).css('float','right');
			$(this).html('关');
			console.log('开关',key)
			$(this).parents('.event_list').children('.range').children('.void').show();
			console.log($(this).index());
		}else if(key=='关'){
			$(this).css('float','left');
			$(this).html('开');
			$(this).parents('.event_list').children('.range').children('.void').hide();
		}
})

$('.temp').eq(2).on('click',function(){
	if($(this).text()=='开'){
		$('.persons').removeAttr('readonly');
		}else if($(this).text()=='关'){

				$('.persons').attr('readonly','readonly');
			}

})

		

	// function makeSure(data){
	// 					//发送坐标值
    //     $.ajax({
    //         url:'http://127.0.0.1:5000/api/v1/device_test/test',
    //         type:'post',
    //         dataType:'json',
    //         data:{"data":JSON.stringify(data)},
    //         success:function (e) {
    //             console.log(e);
    //             // console.log(node);
	// 			console.log("--------------")
    //         }
    //     })
	// }
