/*
 * @Description: 载入最初事件
 * @Author: your name
 * @Date: 2019-09-02 14:42:10
 * @LastEditTime: 2019-09-03 14:48:10
 * @LastEditors: Please set LastEditors
 */

		//token请求完成之后执行相应的数据请求
		let new_six_api = '/api/v1/waring/list/new'; //实时告警栏提前加载最新6条数据api
		refresh_token();//刷新token
		$.ajax({
			url: host + new_six_api,
			headers:request_header,
			type: 'get',
			dataType: 'json',
			success: function(res) {
				// console.log('最新6条数据信息',res);
				for (let i in res.data) {
					let src = res.data[i].do_flag == false ? '../images/unmake.png' : '../images/maked.png'
					$('.realtime_alarm_list').append(
						'<div class="event_info">'
						+	'<div>'
							+	'<img src="'+src+' "/>'
							// +	'<img src="../images/unmake.png "/>'
							+	'<i class="event_type">'+ai_en_ability_dict[res.data[i].ai_ability]+'</i>'
						+   '</div>'
						+	'<div>'
							+	'<img src="../images/time.png" />'
							+	'<span class="time event_time">'+res.data[i].time+'</span>'
						+	'</div>'
						+	'<div>'
							+	'<img src="../images/address.png" />'
							+	'<span class="event_location">'+res.data[i].location+'</span>'
						+	'</div>'
						+	'<span class="event_id">event_id</span>'
					+	'</div>'
					)
				}
			},
			error: function() {
				console.log('数据获取失败')
			}
		})
		
		let new_four_event_api = '/api/v1/ai/list/new' //最新4条人脸、车牌识别信息api
		refresh_token();//刷新token
		$.ajax({
			url: host + new_four_event_api,
			headers:request_header,
			type: 'get',
			dataType: 'json',
			success: function(res) {
				if(res.code == 0){
					for (let i in res.data) {
						$('.recognition').append(
							'<li>'
							+	'<div class="personal">'
								+	'<div class="headphoto">'
									+	'<img class="face_info_person_img" src="http://192.168.1.120/saveface/'+res.data[i].img_path.split("/")[5]+'" alt="加载失败"/>'	
								+	'</div>'
							+	'</div>'
							+	'<div>'
								+	'<img src="../images/head.png" />'
								+	'<span class="name face_info_person_name ">'+res.data[i].info.name+'</span>'
							+	'</div>'
							+	'<div>'
								+	'<img src="../images/class.png" />'
								+	'<span class="face_info_personclass">暂无信息</span>'
							+	'</div>'
							+	'<div class="">'
								+	'<img src="../images/time.png" />'
								+	'<span class="face_recog_time ">'+res.data[i].time+'</span>'
							+	'</div>'
							+	'<div class="">'
								+	'<img src="../images/address.png" />'
								+	'<span class="face_recog_location ">'+res.data[i].location+'</span>'
							+	'</div>'
						+	'</li >'
							
						)
					}
				}else{
					for (let i =0;i<4;i++) {
						$('.recognition').append(
							'<li>'
							+	'<div class="personal">'
								+	'<div class="headphoto">'
									+	'<img class="face_info_person_img" src="../images/bdlog.png" alt="加载失败"/>'	
								+	'</div>'
							+	'</div>'
							+	'<div>'
								+	'<img src="../images/head.png" />'
								+	'<span class="name face_info_person_name ">暂无信息</span>'
							+	'</div>'
							+	'<div>'
								+	'<span class="face_info_personclass">暂无信息</span>'
							+	'</div>'
							+	'<div class="">'
								+	'<img src="../images/time.png" />'
								+	'<span class="face_recog_time ">暂无信息</span>'
							+	'</div>'
							+	'<div class="">'
								+	'<img src="../images/address.png" />'
								+	'<span class="face_recog_location ">暂无信息 </span>'
							+	'</div>'
						+	'</li >'
						)
					}
				}
			},
			error: function() {
				console.log('数据获取失败')
			}
		})
		











