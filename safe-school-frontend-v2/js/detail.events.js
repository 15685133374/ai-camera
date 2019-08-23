//事件详情页面
// 车牌识别详情页面

//定义中文词典
let ai_cn_ability_dict = {
	"人脸检测": "face_detaction",
	"人脸标记": "face_landmark",
	"人脸表情": "face_expression",
	"姿态检测": "body_detaction",
	"姿态识别": "hand_recognition",
	"求救事件": "behavior_seekhelp",
	"倒地事件": "behavior_fall",
	"攀爬事件": "behavior_climb",
	"攀高事件": "behavior_climbhigh",
	"火焰事件": "fire_detaction",
	"烟雾事件": "smoke_detaction",
	"闯入事件": "area_Intrusion",
	"离岗事件": "area_leave_post",
	"离床事件": "area_leave_bed",
	"聚众事件": "crowd_detaction",
	"车牌识别": "car_recognition",
	"睡岗事件": "post_sleep",
	"打架事件": "fight_detaction",
	"人脸识别": "face_recognition"
};

//定义英文词典
let ai_en_ability_dict = {
	"face_detaction": "人脸检测",
	"face_landmark": "人脸标记",
	"face_expression": "人脸表情",
	"face_gender": "性别识别",
	"body_detaction": "姿态检测",
	"hand_recognition": "姿态识别",
	"behavior_seekhelp": "求救事件",
	"behavior_fall": "倒地事件",
	"behavior_climb": "攀爬事件",
	"behavior_climbhigh": "攀高事件",
	"fire_detaction": "火焰事件",
	"smoke_detaction": "烟雾事件",
	"area_Intrusion": "闯入事件",
	"area_leave_post": "离岗事件",
	"area_leave_bed": "离床事件",
	"crowd_detaction": "聚众事件",
	"car_recognition": "车牌识别",
	"post_sleep": "睡岗事件",
	"fight_detaction": "打架事件",
	"face_recognition": "人脸识别"
};

let host = window.location.host;
host = 'http://' + host;

layui.use(['table', 'laydate'], function() {
	var table = layui.table;
	// 日期时间选择
	var laydate = layui.laydate;
	let event_res = ''; //全局定义所有事件的返回数据；
	let data_content = ''; //全局定义所有事件的存储容器
	let event_name = ''; //全局定义事件名称
	let tableIns;

	//定义显示表格事件函数
	function display_event_list() {
		for (let i in data_content) {
			if (ai_en_ability_dict[data_content[i].ai_ability]) {
				// console.log('事件类型',ai_en_ability_dict[data_content[i].ai_ability])
				data_content[i].ai_ability = ai_en_ability_dict[data_content[i].ai_ability];
			}
		}
		console.log('点击修改后的数据', data_content);
		tableIns = table.render({
			elem: '#demo',
			skin: 'nob', //行边框风格
			height: 600,
			limit: 30,
			// url: host + list_name_api,//'http://127.0.0.1:5000/api/v1/waring/list',//数据接口
			data: data_content,
			loading: true,
			// where: {"ai_ability": event_name},
			page: {
				theme: '#447DDB',
				layout: ['prev', 'page', 'next'],
			}, //开启分页
			cols: [
				[ //表头
					// {field: 'wid', title: '序号'},
					{
						field: 'time',
						title: '时间'
					},
					{
						field: 'location',
						title: '地点'
					},
					{
						field: 'ai_ability',
						title: '事件类型'
					},
				]
			],
			// 数据渲染回调。
			done: function(res, curr, count) {
				// console.log("res", res);
				$('.layui-table').css({
					"background-color": 'transparent',
					'color': 'white'
				});
				event_res = res.data;

			}
		});
		$('.layui-table').eq(1).children('tbody').on({
			click: function() {
				$(this).addClass('active_video').siblings('tr').removeClass('active_video');
				let index = $(this).attr('data-index');
				let video_path = event_res[index].video_path;
				// console.log(video_path)
				var videoObject = {
					container: '#video', //容器的ID或className
					variable: 'player', //播放函数名称
					// poster: '../material/poster.jpg',//封面图片
					video: [ //视频地址列表形式
						[video_path, 'video/mp4', '中文标清', 0],
					]
				};
				var player = new ckplayer(videoObject);
				// console.log('当前信息',$(this).text());
				$('.close2').show();
				$('.current_video_title').html($(this).html());
			},
			mouseenter: function() {
				let empty_char = $(this).children('td').eq(1).find('div').text();
				if (empty_char) {
					$(this).attr('title', '点击播放视频')
				}
			}
		}, 'tr')
	}

	function get_data() {
		let list_name_api = '/api/v1/waring/list/name';
		let layer_index = layer.load(1, {
			shade: [0.1, '#fff'] //0.1透明度的白色背景
		});
		$.ajax({
			url: host + list_name_api,
			type: 'get',
			dataType: 'json',
			data: {
				"ai_ability": event_name
			},
			success: function(res) {
				data_content = res.data;
				if (data_content === 'Success！') {
					data_content = [{
						"ai_ability": "暂无数据……！"
					}];
				}
			},
			complete: function() {
				layer.close(layer_index);
				console.log('请求完成');
				display_event_list();
			}
		})
	}

	//执行一个laydate实例
	laydate.render({
		elem: '#detail-date', //指定元素
		range: true,
		theme: '#1E9FFF',
		done: function(value, date, endDate) {
			console.log('日期范围选择完毕');
			console.log(value); //得到日期生成的值，如：2017-08-18
			console.log(date); //得到日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
			console.log(endDate); //得结束的日期时间对象，开启范围选择（range: true）才会返回。对象成员同上。
			$('.event-class li').children('a').removeClass('.active_btn');
			let layer_index1 = layer.load(1, {
				shade: [0.1, '#fff'] //0.1透明度的白色背景
			});
			let option_api = '/api/v1/waring/list/date_cal';
			$.ajax({
				url: host + option_api,
				type: 'get',
				data: {
					'value': value
				},
				dataType: 'json',
				success: function(res) {
					console.log('筛选返回结果', res)
					layer.close(layer_index1);
					if (res.data === "something wrong!") {
						res.data = [{
							"location": "暂无数据……！"
						}];
					} else {
						for (let i in res.data) {
							if (ai_en_ability_dict[res.data[i].ai_ability]) {
								// console.log('事件类型',ai_en_ability_dict[data_content[i].ai_ability])
								res.data[i].ai_ability = ai_en_ability_dict[res.data[i].ai_ability];
							}
						}
					}
					tableIns.reload({
						data: res.data,
						page: {
							curr: 1, //重新从第 1 页开始
							theme: '#447DDB',
							layout: ['prev', 'page', 'next']
						},
					});
					console.log('解析后的数据', res.data)
				}

			});

		}
	});

	let get_click_key = sessionStorage.getItem('click_key'); //获取大屏页面跳转过来时的事件类型；
	let btn_select = $('.event-class').children('li').children('a'); //获取当前页面所有事件类型并存储为数组

	//筛选并渲染符合当前事件类型的所有事件信息
	for (let i in btn_select) {
		if (btn_select.eq(i).text() == get_click_key) {
			event_name = btn_select.eq(i).text();
			//将当前事件的事件类型通过词典转换成英文
			if (ai_cn_ability_dict[event_name]) {
				event_name = ai_cn_ability_dict[event_name];
				// console.log("event_name", event_name)
			}
			btn_select.eq(i).addClass('active_btn');

			get_data(); //调用获取数据函数

		}
	}

	//点击过滤事件
	$('.event-class ').children('li').on('click', 'a', function() {
		$(this).addClass('active_btn').parent('li').siblings('li').children('a').removeClass('active_btn');
		let event = $(this).text();
		// console.log(event);
		// event_name = btn_select.eq(i).text();
		if (ai_cn_ability_dict[event]) {
			event_name = ai_cn_ability_dict[event];
			// console.log("event_name", event_name)
		}

		get_data(); //调用获取数据函数

	});

	function select_event(event) {
		event.preventDefault();
		let address_api = '/api/v1/waring/list/fuzzy_query';
		let address_value = $('.search_text').val();
		// console.log('地址关键字',address_value);
		if (address_value) {
			let layer_index2 = layer.load(1, {
				shade: [0.1, '#fff'] //0.1透明度的白色背景
			});
			$.ajax({
				url: host + address_api,
				type: 'get',
				data: {
					'value': address_value
				},
				dataType: 'json',
				success: function(res) {
					// console.log('筛选返回结果',res)
					// layer.close(layer_index1);
					if (res.data === "something wrong!") {
						res.data = [{
							"location": "暂无数据……！"
						}];
					} else {
						for (let i in res.data) {
							if (ai_en_ability_dict[res.data[i].ai_ability]) {
								// console.log('事件类型',ai_en_ability_dict[data_content[i].ai_ability])
								res.data[i].ai_ability = ai_en_ability_dict[res.data[i].ai_ability];
							}
						}
					}
					layer.close(layer_index2);
					tableIns.reload({
						data: res.data,
						page: {
							curr: 1, //重新从第 1 页开始
							theme: '#447DDB',
							layout: ['prev', 'page', 'next']
						},
					});
					// console.log('按地址获取解析后的数据',res.data)
				}

			});
		}
	}

	$('#search').on({
		click: function() {
			select_event(event);

		}
	}, '.search_events');

	$('#search').on({
		keydown: function(event) {
			if (event.keyCode == 13) {
				select_event(event);
			}
		}
	}, '.search_text')

});

$('.close2').click(function() {
	$('#video').children('div').hide();
	$(this).hide();
	$('.current_video_title').empty();
})
