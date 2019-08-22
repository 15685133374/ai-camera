
			$('#firstMenu').click(function(){
				if($('#firstMenuItem').css('display')==='none'){
					$('#firstMenuItem').css('display','block');
					$('#firstMenu').children('i').css('background-position','0 -10px');
				}else{
					$('#firstMenuItem').hide();
					$('#firstMenu').children('i').css('background-position','0 0');
				}
			});

			var resource_data;
			// 获取未设置的设备
			var host = window.location.host;
			host = 'http://' + host;
			device_list_api =  '/api/v1/device/list',
			$.ajax({
            url:host+device_list_api,
            type:'get',
            dataType:'json',
            // data:{"data":JSON.stringify(event_data)},
            success:function (res) {
            	resource_data=res;
            	console.log(res['result']);
                for (let i = 0; i < res['result'].length; i++){
						$('#firstMenuItem').append(`<li><a href="javascript:;">${res['result'][i]['ip']}</a></li>`);
			}
            }
        });


			$('#firstMenuItem').on({
				click:function(){
					$('.containers').hide();
					$(this).addClass('active');
					$(this).siblings().removeClass('active');
					let ip=$(this).children('a').text();
					console.log("ip",ip);
					device_ip_api =  '/api/v1/device/list/ip';
						$.ajax({
							url:host+device_ip_api,
							data:{"ip":ip},
							type:'get',
							dataType:'json',
							success:function (res) {
								let a_id_list=res['result'][0]['ai_ability'];
								let a_id_content=Array();
								console.log("---------");
								console.log(res);
								console.log(a_id_list);
								if(a_id_list.length==0){
									for(let a=0;a<$('.temp').length;a++){
										$('.temp').eq(a).html('关');
										$('.temp').eq(a).css('float','right');
									}
								}else {
									for(let j=0;j<a_id_list.length;j++){
									console.log(a_id_list[j].ai_id);
									a_id_content.push(a_id_list[j].ai_id);
									for ( var n=0;n<a_id_content.length;n++){
									console.log(a_id_content[n]);
									$('.temp').eq(a_id_content[n]).html('开');
									$('.temp').eq(a_id_content[n]).css('float','left');
								};
								}
								}


								let arr1=Array();
								for(let x=0;x<$('.temp').length;x++){
									arr1.push(x);
								}
								let arr2=a_id_content;
								var diff=[];
								function arr_dive(aArr,bArr){   //第一个数组减去第二个数组
									if(bArr.length==0){return aArr}

									var str=bArr.join("&quot;&quot;");
									for(var e in aArr){
										if(str.indexOf(aArr[e])==-1){
											diff.push(aArr[e]);
										}
									}
									return diff;
								}
								arr_dive(arr1,arr2);
								// console.log('diff='+diff);
								// console.log('arr1='+arr1,'arr2='+arr2);
								for(let y=0;y<diff.length;y++){
									$('.temp').eq(diff[y]).html('关');
									$('.temp').eq(diff[y]).css('float','right');
								}
							}
						})
					setTimeout(function(){
						$('.containers').show();
					},500);
				},
			},'li');

			$(".treebox .level1>a").click(function(e){
				$(this).addClass('current')   //给当前元素添加"current"样式
				.find('i').addClass('down')   //小箭头向下样式
				.parent().next().slideDown('slow','easeOutQuad')  //下一个元素显示
				.parent().siblings().children('a').removeClass('current')//父元素的兄弟元素的子元素去除"current"样式
				.find('i').removeClass('down').parent().next().slideUp('slow','easeOutQuad');//隐藏
				 return false; //阻止默认时间
			});






		//目录栏点击修改地址
		function clickSecond(){
			var f = 0;
			for (let i = 0; i < $('.edit').length; i++) {
			$('.edit').eq(i).click(function(){
				f++;
					if(f % 2 == 1){
						$('.ipaddress').eq(i).removeAttr('readonly');
						$('.ipaddress').eq(i).attr('autofocus','autofocus');
					}else{
						$('.ipaddress').eq(i).attr('readonly','readonly');
						$('.ipaddress').eq(i).removeAttr('autofocus');
					}

				})
			}
		}
		clickSecond();



		//点击显示划线区域
		var index;
		$('.rld').click(function(){
				var sl=$(this).parent('div').prev().children('.swap').children('.temp').text();
				// console.log(sl);
			if(sl=='开')
			$('.Popup_1').css('display','block');
			 index=$(this).index('.rld');

			 // console.log(index);

		})

		$('.closed').click(function(){
			if($('.Popup_1').css('display')==='block'){
				$('.Popup_1').css('display','none');
			}
		});

		var node0=new Array();
		var node1=new Array();
		var node2=new Array();
		var node3=new Array();
		var node4=new Array();
		 function draw(a,n){
		 	// node0.length=0;
		 	// node1.length=0;
		 	// node3.length=0;
		 	// node2.length=0;
		 	// node4.length=0;
			 var canvas = document.getElementById('canvas')
			 var context = canvas.getContext('2d')
			 context.strokeStyle='rgb(255,0,0)';
			 context.lineWidth='2';
			  canvas.onclick=function(e) {
				  if(a<n){
						 var X = e.clientX - canvas.getBoundingClientRect().left;
						 var Y = e.clientY - canvas.getBoundingClientRect().top;
						 context.lineTo(X, Y);
						 // console.log(X,Y);
						 var m={X,Y};
						 console.log(index);
						 switch (index){
						 	case 0: node0.push(m);
						 		break;
							case 1: node1.push(m);
								break;
							case 2:node2.push(m);
								break;
							case 3:node3.push(m);
								break;
						 	case 4:node4.push(m);
						 		break;
						 }
						 // node.push(m);
						 context.stroke();
				  }else{
					  return;
				  }

				  a++;
			 }
		 }

		//区域划线
		let event_data = Array();




				// console.log(node);
			function del(){
				// context.clearRect(0,0,800,600);
				var c=document.getElementById('canvas');
				var cxt=c.getContext("2d");
				c.height=c.height;

			}
			function drawLine(){

				del();
				draw(0,2);
			}

			function drawArea(){

				del();
				draw(0,10);
				// console.log(node);
			}

			function makeSure(){
				// del();
			}

		$('.endSubmit').click(function(){
			$('.containers').hide();
			let ip = $('#firstMenuItem li').filter('.active').find('a').text();

			for (let i = 0; i < $('.event_list').length; i++) {
			var obj = {
				ai_id : i,
				config :
			$('.event_list').eq(i).find('span').eq(1).text() +','+
			$('.event_list').eq(i).find('.slide').text()

			};

			event_data.push(obj);
		}


			// event_data.push({"ip":ip});

			event_data.push({"ip":ip});
			event_data[2].config=
			$('.event_list').eq(2).find('span').eq(1).text() +','+$('.persons').val();
			event_data[5].config=
			$('.event_list').eq(5).find('span').eq(1).text();event_data[5].area=node0;
			event_data[8].config=
			$('.event_list').eq(8).find('span').eq(1).text() ;event_data[8].area=node1;
			event_data[10].config=
			$('.event_list').eq(10).find('span').eq(1).text();event_data[10].area=node2;
			event_data[13].config=
			$('.event_list').eq(13).find('span').eq(1).text();event_data[13].area=node3;
			event_data[14].config=
			$('.event_list').eq(14).find('span').eq(1).text();event_data[14].area=node4;
			console.log("event_data:",event_data);
			var host = window.location.host;
			host = 'http://' + host;
			setting_api = '/api/v1/device/setting';
			$.ajax({
            // url:'http://127.0.0.1:5000/api/v1/device/setting',
            url:host+setting_api,
            type:'post',
            dataType:'json',
            data:{"data":JSON.stringify(event_data)},
            success:function (e) {
                console.log(e);
            }
        });
			layer.msg('设置成功',{
			offset: ['100px', '50px'],
			time:500,
			icon:1,
			});
			event_data.length=0;
			node0.length=0;
			node1.length=0;
			node2.length=0;
			node3.length=0;
			node4.length=0;
		});




			

		
		
