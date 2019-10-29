/*
 * @Description: 主要功能
 * @Author: your name
 * @Date: 2019-01-28 05:36:16
 * @LastEditTime: 2019-09-04 18:49:34
 * @LastEditors: Please set LastEditors
 */

// 使用uid获取用户的设备数据
// 建立socket链接

//  取得cookie中的uid

//定义两个数组分别存放当前弹窗事件的id和类型
let event_id = new Array();

function getCookie(cname) {
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i].trim();
		if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
	}
	return "";
}


realTime.main();

var event_list_to_process = [];
var event_name = [];
var video_living = false; //是否在直播中

/**
 * @description: 停止直播
 * @param {type} 
 * @return: 
 */
function live_stop() {
	video_living = false;
	var player = $('#exampleModa2').find('video')
	var user_watch_token = player.attr('user_watch_token')
	var did = player.attr('did')
	player.attr('user_watch_token', '')
	player.attr('did', '')

	var domain = document.domain;
	var host = window.location.host;
	host = 'http://' + host;
	var api = '/api/v1/onelive/watchtoken';
	// 删除watch_token
	refresh_token();//刷新token
	axios.delete(host + api, {
			headers:request_header,
			params: {
				user_watch_token: user_watch_token
			}
		})
		.then(function(response) {
			console.log(response.data)
		})
		.catch(function(error) {
			console.log(error);
		});
	// 清除定时器.
	clearInterval(timer)
}
// 直播弹窗关闭
$('#exampleModa2').on('hide.bs.modal', function(e) {
	live_stop();
	event_id.length = 0;
	event_name.length = 0;
})


// 获取用户设备表中的数据
var socket = io.connect();
cameras.main();

socket.on('connect', function() {
	console.log('完成链接建立')
	socket.emit('connect_event', {
		data: 'connected!'
	});
});
socket.on('server_response', function(msg) {
	console.log('服务器发来 #' + ': ' + msg.data)
	socket.emit('startvideo', {
		data: 'startvideo'
	});
	socket.emit('ai_result', {
		data: '0'
	});
});



// 人脸识别 车牌识别的结果.
// 先直接将事件放入到前端数据库中
socket.on('result', function(msg) {
	// console.log('发生的事件信息',msg)

	realtime_alarm_list.main(msg);
	// 先跳过事件的更新
	event_updating.main(msg);
	// 构建事件直播的界面.
	var data = msg;
	var event_location = data.location;
	var did = data.did;
	
	for(let x in data.ai_result){
		if(data.ai_result[x].ability_result.result == -1 || data.ai_result[x].ai_ability == 'face_recognition' || data.ai_result[x].ai_ability == 'car_recognition'){
			continue;
		}
		event_name.push(data.ai_result[x].ai_ability);
		// 弹出层正在显示其他的内容.
		event_id.unshift(data.ai_result[x].event_id);
		playVoice("fire_event.mp3"); //播放声音
	}
	//有事件发生了
	if (event_name.length) {
		$('#exampleModa2').modal('show');//显示弹出层
		show_live(did);
		// 弹出层正在显示其他的内容.
		if (video_living || event_list_to_process.length) {
			event_list_to_process.push(did); // 将其他的事件压入到event_list_to_process中
		} 
	}
	$('.unmake_num').html(event_name.length);//未处理事件长度
	$('.current_event_type').html(ai_en_ability_dict[event_name[event_name.length-1]]);//显示事件类型
});


// 处理按钮绑定
$(".btn_event_process").click(function() {
  var host = window.location.host;
  host = 'http://' + host;
  do_flag_api='/api/v1/waring/done';//事件处理状态接口
  refresh_token();//刷新token
  $.ajax({
    url:host + do_flag_api,
	headers:request_header,
    type:'get',
    dataType:'json',
    data:{'event_id':event_id[0]},
    success: function(res){
		//修改当前事件处理状态
		if(res.code == 0 ){
			for(let i in $('.event_info')){
				if($('.event_info').eq(i).find('.event_id').html() == event_id[0]){
					$('.event_info').eq(i).children('div:first-child').children('img').attr('src','../images/maked.png');
				}
			}
			event_id.shift();
		}
    },
    error:function(){
      console.log('error')
    }
  
  })
	// console.log("点击请处理,处理下一个事件")
	live_stop();
	console.log("待处理的事件还有:" + event_list_to_process.length)
	if (event_name.length < 1) {
		$('#exampleModa2').modal('hide');
		event_id.length = 0;
		return;
	}
	$('.unmake_num').html(event_name.length);
	$('.current_event_type').html(ai_en_ability_dict[event_name[event_name.length-1]]);//显示事件类型
	event_name.pop();
	var did = event_list_to_process.pop();
	show_live(did)
	
});

// 设置直播弹出层的状态

$('#exampleModa2').on('show.bs.modal', function(e) {
	// 弹出层显示中
	// console.log("弹出层显示中");
	video_living = true;
});



//点击事件跳转到事件详情页面
$('.list').on('click', 'p', function() {
	let click_key = $(this).text();
	console.log(click_key);
	sessionStorage.setItem('click_key', click_key);
	window.location.href = '/event';
	// alert('000');
})

var host = window.location.host;
host = 'http://' + host;
let event_count_api = '/api/v1/waring/list/cur_day';	//当天所有事件数据接口
refresh_token();//刷新token
$.ajax({
	url: host + event_count_api,
	headers:request_header,
	type: 'get',
	dataType: 'json',
	success: function(res) {
		// console.log('当天事件统计', res.data);
		$('.behavior_seekhelp').text(res.data.behavior_seekhelp);
		$('.behavior_climb').text(res.data.behavior_climb);
		$('.behavior_climbhigh').text(res.data.behavior_climbhigh);
		$('.area_Intrusion').text(res.data.area_Intrusion);
		$('.fire_detaction').text(res.data.fire_detaction);
		$('.crowd_detaction').text(res.data.crowd_detaction);
		$('.behavior_fall').text(res.data.behavior_fall);
		$('.area_leave_post').text(res.data.area_leave_post);
	},
})

// 播放声音
function playVoice(event_audio) {
	var borswer = window.navigator.userAgent.toLowerCase();
	if (borswer.indexOf("ie") >= 0) {
		//IE内核浏览器
		var strEmbed = '<embed name="embedPlay" src="../audio/' + event_audio +
			'" autostart="true" hidden="true" loop="false"></embed>';
		if ($("body").find("embed").length <= 0) {
			$("body").append(strEmbed);
		} else {
			$("body").find("embed").attr("src", '../audio/' + event_audio)
		}
		var embed = document.embedPlay;

		//浏览器不支持 audio，则使用 embed 播放
		embed.volume = 100;
	} else {
		//非IE内核浏览器
		var strAudio = "<audio id='audioPlay' src='../audio/'" + event_audio + " hidden='true'>";
		if ($("body").find("audio").length <= 0) {
			$("body").append(strAudio);
		} else {
			$("body").find("audio").attr("src", '../audio/' + event_audio)
		}
		var audio = document.getElementById("audioPlay");

		//浏览器支持 audio
		audio.play();
	}
}
