<<<<<<< HEAD


document.ondragstart = document.onselectstart = function(){return false;};	//阻止页面内容被选中或拖动

//定义5个数组，分别存放5个划线区域的坐标点
var node0 = new Array();
var node1 = new Array();
var node2 = new Array();
var node3 = new Array();
var node4 = new Array();

var person_data = '';//存放聚众人数
let position_area;	//存放区域划线数据
let cur_img;

//全局定义canvas 元素
var c = document.getElementById("canvas");
var cxt = c.getContext("2d");
cxt.strokeStyle = 'rgb(255,0,0)';
cxt.lineWidth = '2';

//全局定义变量，用于区分已设置和未设置的状态
let even;

//开关按钮点击事件
$('.temp').click(function() {
	var key = $(this).html();
	let ind = $(this).index('.temp');
	// console.log('当前开关序号', ind);
	var len = $(this).length;
	switch (ind) {	//清空相应的数据
		case 2:
			$('.persons').attr('readonly', 'readonly');
			break;
		case 5:
			node0.length = 0;
			break;
		case 8:
			node1.length = 0;
			break;
		case 10:
			node2.length = 0;
			break;
		case 13:
			node3.length = 0;
			break;
		case 14:
			node4.length = 0;
			break;
	};
	if (key == '开') {
		$(this).css('float', 'right');
		$(this).html('关');
		// console.log('开关', key)
		$(this).parents('.event_list').children('.range').children('.void').show();
		if (ind == 2) {
			$('.persons').attr('readonly', 'readonly');
			$('.persons').val('');
		}

	} else if (key == '关') {
		$(this).css('float', 'left');
		$(this).html('开');
		$(this).parents('.event_list').children('.range').children('.void').hide();
		if (ind == 2) {
			$('.persons').removeAttr('readonly');
		}
	}
})

var host = window.location.host;
host = 'http://' + host;
let device_list_api = '/api/v1/device/list'; //所有摄像头ip地址

//获取已设置和未设置的目录ip地址
refresh_token();//刷新token
$.ajax({
	url: host + device_list_api, //ip地址api
	headers:request_header,
	type: 'get',
	dataType: 'json',
	success: function(res) {
		let noset = res.result[1]; //未设置的IP
		let setted = res.result[0]; //已设置的IP
		if (res.code == 0) {
			for (let i = 0; i < noset.length; i++) {
				$('#firstMenuItem').append('<li><a href="javascript:;">'+ noset[i].ip +'</a></li>');//未设置目录栏
			}
			for (let i = 0; i < setted.length; i++) {
				$('#secondMenuItem').append('<li><a href="javascript:;">'+ setted[i].ip +'</a></li>');//已设置目录栏
			}
		}

	},
	complete: function() {

		//点击 显示/隐藏 未设置的目录
		$('#firstMenu').click(function() {
			if ($('#firstMenuItem').css('display') === 'none') {
				$('#firstMenuItem').css('display', 'block');
				$('#firstMenu').children('i').css('background-position', '0 -10px');
			} else {
				$('#firstMenuItem').hide();
				$('#firstMenu').children('i').css('background-position', '0 0');
			}
		});


		//点击 显示/隐藏 已设置的目录
		$('#secondMenu').click(function() {
			if ($('#secondMenuItem').css('display') === 'none') {
				$('#secondMenuItem').css('display', 'block');
				$('#secondMenu').children('i').css('background-position', '0 -10px');
			} else {
				$('#secondMenuItem').hide();
				$('#secondMenu').children('i').css('background-position', '0 0');
			}
		});

	}
});


//未设置目录的每一项绑定点击事件，并显示初始页面	
$('#firstMenuItem').on({
	click: function() {
		$('.containers').hide();
		$(this).addClass('active').siblings().removeClass('active');
		let ip = $(this).children('a').text();
		console.log("ip", ip);
		device_ip_api = '/api/v1/device/list/ip';
		refresh_token();//刷新token
		$.ajax({
			url: host + device_ip_api,
			headers:request_header,
			data: {
				"ip": ip
			},
			type: 'get',
			dataType: 'json',
			success: function(res) {
				position_data = res.result[0];
			}
		});
		
		//由于是未设置的摄像头，所有的开关显示关闭状态
		for (let a = 0; a < $('.temp').length; a++) {
			$('.temp').eq(a).html('关');
			$('.temp').eq(a).css('float', 'right');
		}
		//聚众人数显示为空
		$('.persons').val(' ');

		setTimeout(function() {
			$('.containers').show();
		}, 100);
		even = 0;
		c.height = c.height;//重置画布，清空画图轨迹
		node0.length = 0;
		node1.length = 0;
		node2.length = 0;
		node3.length = 0;
		node4.length = 0;
	}
}, 'li');

//已设置目录的每一项绑定点击事件，获取数据并渲染显示相应的页面
let position_data;
$('#secondMenuItem').on({
	click: function() {
		$('.containers').hide();
		$(this).addClass('active').siblings().removeClass('active');
		let ip = $(this).children('a').text();
		$('.persons').attr('readonly', 'readonly');
		// console.log("ip", ip);
		device_ip_api = '/api/v1/device/list/ip';//已设置的摄像头数据api
		refresh_token();//刷新token
		$.ajax({
			url: host + device_ip_api,
			headers:request_header,
			data: {
				"ip": ip
			},
			type: 'get',
			dataType: 'json',
			success: function(res) {
				let a_id_list = res['result'][0]['ai_ability'];
				let a_id_content = new Array();
				position_area = a_id_list;
				console.log('当前打开的开关数据', res);
				position_data = res.result[0];
				
				person_data = ' ';
				if (a_id_list.length == 0) {
					for (let a = 0; a < $('.temp').length; a++) {
						$('.temp').eq(a).html('关');
						$('.temp').eq(a).css('float', 'right');
						$('.persons').val(' ');
						$('.temp').eq(a).parents('.event_list').children('.range').children('.void').show();
					}
				} else {
					for (let j = 0; j < a_id_list.length; j++) {
						a_id_content.push(a_id_list[j].ai_id);
						switch (a_id_list[j].ai_id) {
							case 2:
								person_data = a_id_list[j].config;
								$('.persons').removeAttr('readonly');
								break;
							case 5:
								node0.length = 0;
								node0 = a_id_list[j].config;
								break;
							case 8:
								node1.length = 0;
								node1 = a_id_list[j].config;
								break;
							case 10:
								node2.length = 0;
								node2 = a_id_list[j].config;
								break;
							case 13:
								node3.length = 0;
								node3 = a_id_list[j].config;
								break;
							case 14:
								node4.length = 0;
								node4 = a_id_list[j].config;
								break;
						}
					}
					console.log('开关个数',a_id_content.length)
					for (var n = 0; n < a_id_content.length; n++) {
						$('.temp').eq(a_id_content[n]).html('开').css('float', 'left');
						$('.temp').eq(a_id_content[n]).parents('.event_list').children('.range').children('.void').hide();
					};
					$('.persons').val(person_data);
					// a_id_content.length = 0;
				}


				let arr1 = Array();
				for (let x = 0; x < $('.temp').length; x++) {
					arr1.push(x);
				}
				let arr2 = a_id_content;
				var diff = [];

				function arr_dive(aArr, bArr) { //第一个数组减去第二个数组
					if (bArr.length == 0) {
						return aArr
					}

					var str = bArr.join("&quot;&quot;");
					for (var e in aArr) {
						if (str.indexOf(aArr[e]) == -1) {
							diff.push(aArr[e]);
						}
					}
					return diff;
				}
				arr_dive(arr1, arr2);
				for (let y = 0; y < diff.length; y++) {
					$('.temp').eq(diff[y]).html('关').css('float', 'right');
				}
			}
		})
		setTimeout(function() {
			$('.containers').show();

		}, 100);
		even = 1;
		if ($('#3').find('.temp').html() == '关') {
			$('#3').find('.persons').attr('readonly', 'readonly');
		}
	},
}, 'li');




//点击显示划线区域
var index;	//定义下标区分不同事件的区域划线
$('.rld').click(function() {
	let cameras_info = JSON.parse(sessionStorage.getItem('response_res'));

	let cur_ip;
	if (even == 0) {
		cur_ip = $('#firstMenuItem li').filter('.active').find('a').text();
	} else {
		cur_ip = $('#secondMenuItem li').filter('.active').find('a').text();
	}
	
	cur_img = 'http://192.168.1.120/device_picture/' + position_data.did + '.jpg?' + Math.random();
	$('.canvas_img').attr('src', cur_img).on('error', function() {
		cur_img = '../images/test1.png' //当前摄像头图片加载失败的时候显示默认图片
	})
	// console.log('摄像头信息',JSON.parse(cameras_info)[0].ip)
	var sl = $(this).parent('div').prev().children('.swap').children('.temp').text();
	index = $(this).index('.rld'); //定义当前画图区域的下标
	let event_num = $(this).parent().parent().index('.event_list'); //定义当前事件的下标

	if (sl == '开') {
		$('.Popup_1').show();
		$('.Popup_1').dblclick(function(e){
			e.preventDefault();
		})

		$('.Popup_1').find('canvas').css("background-image", 'url('+ cur_img +')');

		let current_addr = ''; //存放当天画图区域之前所画的坐标点

		for (let i in position_area) {
			if (position_area[i].ai_id == event_num) {
				current_addr = position_area[i].config;
			}
		}
		
		//定义初始化画布方法
		function init_canvas(arr){
			c.height = c.height;
			cxt.strokeStyle = 'rgb(255,0,0)';
			cxt.lineWidth = '2';
			cxt.moveTo(arr[0].X, arr[0].Y);
			for (let x = 1; x < arr.length; x++) {
				cxt.lineTo(arr[x].X, arr[x].Y);
			}
			cxt.stroke();
		}
		//攀高、攀爬事件隐藏画区域功能
		if (index == 1 || index == 3) {
			$('.draw_area').hide();
		} else {
			$('.draw_area').show();
		}

		switch (index) { //渲染上一次设置所画的区域
			case 0:
				if (node0.length != 0) {
					init_canvas(node0);
				} else {
					c.height = c.height;
				};
				break;
			case 1:
				if (node1.length != 0) {
					init_canvas(node1);
				} else {
					c.height = c.height;
				};
				break;
			case 2:
				if (node2.length != 0) {
					init_canvas(node2);
				} else {
					c.height = c.height;
				};
				break;
			case 3:
				if (node3.length != 0) {
					init_canvas(node3);
				} else {
					c.height = c.height;
				};
				break;
			case 4:
				if (node4.length != 0) {
					init_canvas(node4);
				} else {
					c.height = c.height;
				};
				break;
		}

	}

})

//关闭画布
$('.closed').on({
	mouseenter:function(){
		$(this).children('img').attr('src','../images/close_red.png');
	},
	mouseleave:function(){
		$(this).children('img').attr('src','../images/close_.png');
	},
	click:function(){
		$('.Popup_1').hide();
		$('.canvas_img').removeAttr('src');
	}
})


//定义清空画图区域函数
function del() {
	// context.clearRect(0,0,800,600);
	var c = document.getElementById('canvas');
	var cxt = c.getContext("2d");
	c.height = c.height;
	draw(0, 0);
	switch (index) {
		case 0:
			node0.length = 0;
			break;
		case 1:
			node1.length = 0;
			break;
		case 2:
			node2.length = 0;
			break;
		case 3:
			node3.length = 0;
			break;
		case 4:
			node4.length = 0;
			break;
	}
}

//定义划线函数
function drawLine() {
	del();
	draw(0, 2);
}

//定义画区域函数
function drawArea() {
	del();
	draw(0, 10);
	// console.log(node);
}

//定义画图确定函数
function makeSure() {
	$('.Popup_1').css('display', 'none'); //关闭画布

}


//定义canvas 点击划线函数 (n-a)即代表所画点的个数；
function draw(a, n) {
	let s = 0;
	var canvas = document.getElementById('canvas');
	var context = canvas.getContext('2d')
	context.strokeStyle = 'rgb(255,0,0)';
	context.lineWidth = '2';
	canvas.onclick = function(e) {
		if (a < n) {
			var X = e.clientX - canvas.getBoundingClientRect().left;
			var Y = e.clientY - canvas.getBoundingClientRect().top;
			X = X < 0 ? 0 : X;
			Y = Y < 0 ? 0 : Y;
			if (s == 0) { //显示第一个点的位置
				context.beginPath();
				context.fillStyle = 'rgb(255,0,0)';
				context.arc(X, Y, 1.4, 0, 2 * Math.PI);//画一个圆点
				context.fill();
				s++;
			}
			context.lineTo(X, Y);
			var m = {
				'X':X,
				'Y':Y
			};
			switch (index) {
				case 0:
					node0.push(m);
					break;
				case 1:
					node1.push(m);
					break;
				case 2:
					node2.push(m);
					break;
				case 3:
					node3.push(m);
					break;
				case 4:
					node4.push(m);
					break;
			}
			// node.push(m);
			context.stroke();

		} else {
			return;
		}

		a++;
		// console.log('坐标', m)
	}
}

//定义数组，存放发送到服务器的数据
let event_data = Array();
//点击确定，完成所有设置，并存储数据到后台
$('.endSubmit').click(function() {
	let ip;
	$('.containers').hide();
	if (even == 0) {
		ip = $('#firstMenuItem li').filter('.active').find('a').text();
	} else {
		ip = $('#secondMenuItem li').filter('.active').find('a').text();
	}

	for (let i = 0; i < $('.event_list').length; i++) {
		var obj = {
			ai_id: i,
			config: $('.event_list').eq(i).find('span').eq(1).text() + ',' +
				$('.event_list').eq(i).find('.slide').text()
		};

		event_data.push(obj);
	}
	person_data = $('.persons').val();//聚众人数

	event_data.push({
		"ip": ip
	});
	event_data[2].area = person_data;

	event_data[5].config =
		$('.event_list').eq(5).find('span').eq(1).text();
	event_data[5].area = node0;
	event_data[8].config =
		$('.event_list').eq(8).find('span').eq(1).text();
	event_data[8].area = node1;
	event_data[10].config =
		$('.event_list').eq(10).find('span').eq(1).text();
	event_data[10].area = node2;
	event_data[13].config =
		$('.event_list').eq(13).find('span').eq(1).text();
	event_data[13].area = node3;
	event_data[14].config =
		$('.event_list').eq(14).find('span').eq(1).text();
	event_data[14].area = node4;

	var host = window.location.host;
	host = 'http://' + host;
	if (even == 0) {
		setting_api = '/api/v1/device/setting'; //设置摄像头
	} else {
		setting_api = '/api/v1/device/list/update_set'; //修改摄像头数据
	}
	refresh_token();//刷新token
	$.ajax({
		url: host + setting_api,
		headers:request_header,
		type: 'post',
		dataType: 'json',
		data: {
			"data": JSON.stringify(event_data)
		},
		success: function() {
			if (even == 0) {
				layer.msg('设置成功', {
					offset: ['100px', '50px'],
					time: 100,
					icon: 1,
				});
				$('.active').remove();
				$('#secondMenuItem').append('<li><a href="javascript:;">'+ ip +'</a></li>');
			} else {

				layer.msg('修改成功', {
					offset: ['100px', '50px'],
					time: 100,
					icon: 1,
				});
			}
		},
		error: function() {
			if (even == 0) {
				layer.msg('设置失败', {
					offset: ['100px', '50px'],
					time: 100,
					icon: 1,
				});
				$('.layui-layer-content').css('color', '#D8534C')
			} else {
				layer.msg('修改失败', {
					offset: ['100px', '50px'],
					time: 100,
					icon: 1,
				});
				$('.layui-layer-content').css('color', '#D8534C');
			}
		},
		complete: function() {
			// console.log('修改成功',JSON.stringify(event_data));
			event_data.length = 0;
			node0.length = 0;
			node1.length = 0;
			node2.length = 0;
			node3.length = 0;
			node4.length = 0;
		}
	});

});

//返回监控大屏
$('.reply').click(function(){
	window.history.back();
})
=======


document.ondragstart = document.onselectstart = function(){return false;};	//阻止页面内容被选中或拖动

//定义5个数组，分别存放5个划线区域的坐标点
var node0 = new Array();
var node1 = new Array();
var node2 = new Array();
var node3 = new Array();
var node4 = new Array();

var person_data = '';//存放聚众人数
let position_area;	//存放区域划线数据
let cur_img;

//全局定义canvas 元素
var c = document.getElementById("canvas");
var cxt = c.getContext("2d");
cxt.strokeStyle = 'rgb(255,0,0)';
cxt.lineWidth = '2';

//全局定义变量，用于区分已设置和未设置的状态
let even;

//开关按钮点击事件
$('.temp').click(function() {
	var key = $(this).html();
	let ind = $(this).index('.temp');
	// console.log('当前开关序号', ind);
	var len = $(this).length;
	switch (ind) {	//清空相应的数据
		case 2:
			$('.persons').attr('readonly', 'readonly');
			break;
		case 5:
			node0.length = 0;
			break;
		case 8:
			node1.length = 0;
			break;
		case 10:
			node2.length = 0;
			break;
		case 13:
			node3.length = 0;
			break;
		case 14:
			node4.length = 0;
			break;
	};
	if (key == '开') {
		$(this).css('float', 'right');
		$(this).html('关');
		// console.log('开关', key)
		$(this).parents('.event_list').children('.range').children('.void').show();
		if (ind == 2) {
			$('.persons').attr('readonly', 'readonly');
			$('.persons').val('');
		}

	} else if (key == '关') {
		$(this).css('float', 'left');
		$(this).html('开');
		$(this).parents('.event_list').children('.range').children('.void').hide();
		if (ind == 2) {
			$('.persons').removeAttr('readonly');
		}
	}
})

var host = window.location.host;
host = 'http://' + host;
let device_list_api = '/api/v1/device/list'; //所有摄像头ip地址

//获取已设置和未设置的目录ip地址
refresh_token();//刷新token
$.ajax({
	url: host + device_list_api, //ip地址api
	headers:request_header,
	type: 'get',
	dataType: 'json',
	success: function(res) {
		let noset = res.result[1]; //未设置的IP
		let setted = res.result[0]; //已设置的IP
		if (res.code == 0) {
			for (let i = 0; i < noset.length; i++) {
				$('#firstMenuItem').append('<li><a href="javascript:;">'+ noset[i].ip +'</a></li>');//未设置目录栏
			}
			for (let i = 0; i < setted.length; i++) {
				$('#secondMenuItem').append('<li><a href="javascript:;">'+ setted[i].ip +'</a></li>');//已设置目录栏
			}
		}

	},
	complete: function() {

		//点击 显示/隐藏 未设置的目录
		$('#firstMenu').click(function() {
			if ($('#firstMenuItem').css('display') === 'none') {
				$('#firstMenuItem').css('display', 'block');
				$('#firstMenu').children('i').css('background-position', '0 -10px');
			} else {
				$('#firstMenuItem').hide();
				$('#firstMenu').children('i').css('background-position', '0 0');
			}
		});


		//点击 显示/隐藏 已设置的目录
		$('#secondMenu').click(function() {
			if ($('#secondMenuItem').css('display') === 'none') {
				$('#secondMenuItem').css('display', 'block');
				$('#secondMenu').children('i').css('background-position', '0 -10px');
			} else {
				$('#secondMenuItem').hide();
				$('#secondMenu').children('i').css('background-position', '0 0');
			}
		});

	}
});


//未设置目录的每一项绑定点击事件，并显示初始页面	
$('#firstMenuItem').on({
	click: function() {
		$('.containers').hide();
		$(this).addClass('active').siblings().removeClass('active');
		let ip = $(this).children('a').text();
		console.log("ip", ip);
		device_ip_api = '/api/v1/device/list/ip';
		refresh_token();//刷新token
		$.ajax({
			url: host + device_ip_api,
			headers:request_header,
			data: {
				"ip": ip
			},
			type: 'get',
			dataType: 'json',
			success: function(res) {
				position_data = res.result[0];
			}
		});
		
		//由于是未设置的摄像头，所有的开关显示关闭状态
		for (let a = 0; a < $('.temp').length; a++) {
			$('.temp').eq(a).html('关');
			$('.temp').eq(a).css('float', 'right');
		}
		//聚众人数显示为空
		$('.persons').val(' ');

		setTimeout(function() {
			$('.containers').show();
		}, 100);
		even = 0;
		c.height = c.height;//重置画布，清空画图轨迹
		node0.length = 0;
		node1.length = 0;
		node2.length = 0;
		node3.length = 0;
		node4.length = 0;
	}
}, 'li');

//已设置目录的每一项绑定点击事件，获取数据并渲染显示相应的页面
let position_data;
$('#secondMenuItem').on({
	click: function() {
		$('.containers').hide();
		$(this).addClass('active').siblings().removeClass('active');
		let ip = $(this).children('a').text();
		$('.persons').attr('readonly', 'readonly');
		// console.log("ip", ip);
		device_ip_api = '/api/v1/device/list/ip';//已设置的摄像头数据api
		refresh_token();//刷新token
		$.ajax({
			url: host + device_ip_api,
			headers:request_header,
			data: {
				"ip": ip
			},
			type: 'get',
			dataType: 'json',
			success: function(res) {
				let a_id_list = res['result'][0]['ai_ability'];
				let a_id_content = new Array();
				position_area = a_id_list;
				console.log('当前打开的开关数据', res);
				position_data = res.result[0];
				
				person_data = ' ';
				if (a_id_list.length == 0) {
					for (let a = 0; a < $('.temp').length; a++) {
						$('.temp').eq(a).html('关');
						$('.temp').eq(a).css('float', 'right');
						$('.persons').val(' ');
						$('.temp').eq(a).parents('.event_list').children('.range').children('.void').show();
					}
				} else {
					for (let j = 0; j < a_id_list.length; j++) {
						a_id_content.push(a_id_list[j].ai_id);
						switch (a_id_list[j].ai_id) {
							case 2:
								person_data = a_id_list[j].config;
								$('.persons').removeAttr('readonly');
								break;
							case 5:
								node0.length = 0;
								node0 = a_id_list[j].config;
								break;
							case 8:
								node1.length = 0;
								node1 = a_id_list[j].config;
								break;
							case 10:
								node2.length = 0;
								node2 = a_id_list[j].config;
								break;
							case 13:
								node3.length = 0;
								node3 = a_id_list[j].config;
								break;
							case 14:
								node4.length = 0;
								node4 = a_id_list[j].config;
								break;
						}
					}
					console.log('开关个数',a_id_content.length)
					for (var n = 0; n < a_id_content.length; n++) {
						$('.temp').eq(a_id_content[n]).html('开').css('float', 'left');
						$('.temp').eq(a_id_content[n]).parents('.event_list').children('.range').children('.void').hide();
					};
					$('.persons').val(person_data);
					// a_id_content.length = 0;
				}


				let arr1 = Array();
				for (let x = 0; x < $('.temp').length; x++) {
					arr1.push(x);
				}
				let arr2 = a_id_content;
				var diff = [];

				function arr_dive(aArr, bArr) { //第一个数组减去第二个数组
					if (bArr.length == 0) {
						return aArr
					}

					var str = bArr.join("&quot;&quot;");
					for (var e in aArr) {
						if (str.indexOf(aArr[e]) == -1) {
							diff.push(aArr[e]);
						}
					}
					return diff;
				}
				arr_dive(arr1, arr2);
				for (let y = 0; y < diff.length; y++) {
					$('.temp').eq(diff[y]).html('关').css('float', 'right');
				}
			}
		})
		setTimeout(function() {
			$('.containers').show();

		}, 100);
		even = 1;
		if ($('#3').find('.temp').html() == '关') {
			$('#3').find('.persons').attr('readonly', 'readonly');
		}
	},
}, 'li');




//点击显示划线区域
var index;	//定义下标区分不同事件的区域划线
$('.rld').click(function() {
	let cameras_info = JSON.parse(sessionStorage.getItem('response_res'));

	let cur_ip;
	if (even == 0) {
		cur_ip = $('#firstMenuItem li').filter('.active').find('a').text();
	} else {
		cur_ip = $('#secondMenuItem li').filter('.active').find('a').text();
	}
	
	cur_img = 'http://192.168.1.120/device_picture/' + position_data.did + '.jpg?' + Math.random();
	$('.canvas_img').attr('src', cur_img).on('error', function() {
		cur_img = '../images/test1.png' //当前摄像头图片加载失败的时候显示默认图片
	})
	// console.log('摄像头信息',JSON.parse(cameras_info)[0].ip)
	var sl = $(this).parent('div').prev().children('.swap').children('.temp').text();
	index = $(this).index('.rld'); //定义当前画图区域的下标
	let event_num = $(this).parent().parent().index('.event_list'); //定义当前事件的下标

	if (sl == '开') {
		$('.Popup_1').show();
		$('.Popup_1').dblclick(function(e){
			e.preventDefault();
		})

		$('.Popup_1').find('canvas').css("background-image", 'url('+ cur_img +')');

		let current_addr = ''; //存放当天画图区域之前所画的坐标点

		for (let i in position_area) {
			if (position_area[i].ai_id == event_num) {
				current_addr = position_area[i].config;
			}
		}
		
		//定义初始化画布方法
		function init_canvas(arr){
			c.height = c.height;
			cxt.strokeStyle = 'rgb(255,0,0)';
			cxt.lineWidth = '2';
			cxt.moveTo(arr[0].X, arr[0].Y);
			for (let x = 1; x < arr.length; x++) {
				cxt.lineTo(arr[x].X, arr[x].Y);
			}
			cxt.stroke();
		}
		//攀高、攀爬事件隐藏画区域功能
		if (index == 1 || index == 3) {
			$('.draw_area').hide();
		} else {
			$('.draw_area').show();
		}

		switch (index) { //渲染上一次设置所画的区域
			case 0:
				if (node0.length != 0) {
					init_canvas(node0);
				} else {
					c.height = c.height;
				};
				break;
			case 1:
				if (node1.length != 0) {
					init_canvas(node1);
				} else {
					c.height = c.height;
				};
				break;
			case 2:
				if (node2.length != 0) {
					init_canvas(node2);
				} else {
					c.height = c.height;
				};
				break;
			case 3:
				if (node3.length != 0) {
					init_canvas(node3);
				} else {
					c.height = c.height;
				};
				break;
			case 4:
				if (node4.length != 0) {
					init_canvas(node4);
				} else {
					c.height = c.height;
				};
				break;
		}

	}

})

//关闭画布
$('.closed').on({
	mouseenter:function(){
		$(this).children('img').attr('src','../images/close_red.png');
	},
	mouseleave:function(){
		$(this).children('img').attr('src','../images/close_.png');
	},
	click:function(){
		$('.Popup_1').hide();
		$('.canvas_img').removeAttr('src');
	}
})


//定义清空画图区域函数
function del() {
	// context.clearRect(0,0,800,600);
	var c = document.getElementById('canvas');
	var cxt = c.getContext("2d");
	c.height = c.height;
	draw(0, 0);
	switch (index) {
		case 0:
			node0.length = 0;
			break;
		case 1:
			node1.length = 0;
			break;
		case 2:
			node2.length = 0;
			break;
		case 3:
			node3.length = 0;
			break;
		case 4:
			node4.length = 0;
			break;
	}
}

//定义划线函数
function drawLine() {
	del();
	draw(0, 2);
}

//定义画区域函数
function drawArea() {
	del();
	draw(0, 10);
	// console.log(node);
}

//定义画图确定函数
function makeSure() {
	$('.Popup_1').css('display', 'none'); //关闭画布

}


//定义canvas 点击划线函数 (n-a)即代表所画点的个数；
function draw(a, n) {
	let s = 0;
	var canvas = document.getElementById('canvas');
	var context = canvas.getContext('2d')
	context.strokeStyle = 'rgb(255,0,0)';
	context.lineWidth = '2';
	canvas.onclick = function(e) {
		if (a < n) {
			var X = e.clientX - canvas.getBoundingClientRect().left;
			var Y = e.clientY - canvas.getBoundingClientRect().top;
			X = X < 0 ? 0 : X;
			Y = Y < 0 ? 0 : Y;
			if (s == 0) { //显示第一个点的位置
				context.beginPath();
				context.fillStyle = 'rgb(255,0,0)';
				context.arc(X, Y, 1.4, 0, 2 * Math.PI);//画一个圆点
				context.fill();
				s++;
			}
			context.lineTo(X, Y);
			var m = {
				'X':X,
				'Y':Y
			};
			switch (index) {
				case 0:
					node0.push(m);
					break;
				case 1:
					node1.push(m);
					break;
				case 2:
					node2.push(m);
					break;
				case 3:
					node3.push(m);
					break;
				case 4:
					node4.push(m);
					break;
			}
			// node.push(m);
			context.stroke();

		} else {
			return;
		}

		a++;
		// console.log('坐标', m)
	}
}

//定义数组，存放发送到服务器的数据
let event_data = Array();
//点击确定，完成所有设置，并存储数据到后台
$('.endSubmit').click(function() {
	let ip;
	$('.containers').hide();
	if (even == 0) {
		ip = $('#firstMenuItem li').filter('.active').find('a').text();
	} else {
		ip = $('#secondMenuItem li').filter('.active').find('a').text();
	}

	for (let i = 0; i < $('.event_list').length; i++) {
		var obj = {
			ai_id: i,
			config: $('.event_list').eq(i).find('span').eq(1).text() + ',' +
				$('.event_list').eq(i).find('.slide').text()
		};

		event_data.push(obj);
	}
	person_data = $('.persons').val();//聚众人数

	event_data.push({
		"ip": ip
	});
	event_data[2].area = person_data;

	event_data[5].config =
		$('.event_list').eq(5).find('span').eq(1).text();
	event_data[5].area = node0;
	event_data[8].config =
		$('.event_list').eq(8).find('span').eq(1).text();
	event_data[8].area = node1;
	event_data[10].config =
		$('.event_list').eq(10).find('span').eq(1).text();
	event_data[10].area = node2;
	event_data[13].config =
		$('.event_list').eq(13).find('span').eq(1).text();
	event_data[13].area = node3;
	event_data[14].config =
		$('.event_list').eq(14).find('span').eq(1).text();
	event_data[14].area = node4;

	var host = window.location.host;
	host = 'http://' + host;
	if (even == 0) {
		setting_api = '/api/v1/device/setting'; //设置摄像头
	} else {
		setting_api = '/api/v1/device/list/update_set'; //修改摄像头数据
	}
	refresh_token();//刷新token
	$.ajax({
		url: host + setting_api,
		headers:request_header,
		type: 'post',
		dataType: 'json',
		data: {
			"data": JSON.stringify(event_data)
		},
		success: function() {
			if (even == 0) {
				layer.msg('设置成功', {
					offset: ['100px', '50px'],
					time: 100,
					icon: 1,
				});
				$('.active').remove();
				$('#secondMenuItem').append('<li><a href="javascript:;">'+ ip +'</a></li>');
			} else {

				layer.msg('修改成功', {
					offset: ['100px', '50px'],
					time: 100,
					icon: 1,
				});
			}
		},
		error: function() {
			if (even == 0) {
				layer.msg('设置失败', {
					offset: ['100px', '50px'],
					time: 100,
					icon: 1,
				});
				$('.layui-layer-content').css('color', '#D8534C')
			} else {
				layer.msg('修改失败', {
					offset: ['100px', '50px'],
					time: 100,
					icon: 1,
				});
				$('.layui-layer-content').css('color', '#D8534C');
			}
		},
		complete: function() {
			// console.log('修改成功',JSON.stringify(event_data));
			event_data.length = 0;
			node0.length = 0;
			node1.length = 0;
			node2.length = 0;
			node3.length = 0;
			node4.length = 0;
		}
	});

});

//返回监控大屏
$('.reply').click(function(){
	window.history.back();
})
>>>>>>> anhuiyou

