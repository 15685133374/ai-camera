//事件详情页面
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
=======
>>>>>>> anhuiyou

//全局定义 域名前缀
let host = window.location.host;
host = 'http://' + host;

layui.use(['table', 'laydate', 'laypage'], function() {
	var table = layui.table;
	var laydate = layui.laydate; // 日期时间选择
	var laypage = layui.laypage;	//定义分页元素
	let event_res = ''; //全局定义所有事件的返回数据；
	let data_content = ''; //全局定义所有事件的存储容器
	let event_name = ''; //全局定义事件名称
	let tableIns; //全局定义表格加载变量
	let total_page_size = 0;
	let current_page = 1;
	
	
	//定义点击一行播放该视频
	function click_watch() {
		$('.layui-table').eq(1).children('tbody').on({
			click: function() {
				$(this).addClass('active_video').siblings('tr').removeClass('active_video');
				let index = $(this).attr('data-index');
				let video_path = event_res[index].video_path;
				var videoObject = {
					container: '#video', //容器的ID或className
					variable: 'player', //播放函数名称
					
					video: [ //视频地址列表形式
						[video_path, 'video/mp4', '中文标清', 0],
					]
				};
				var player = new ckplayer(videoObject);
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
	
	

	//定义渲染表格方法
	function table_load(){
		tableIns = table.render({
			elem: '#demo',
			skin: 'nob', //行边框风格
			height: 'full-350',
			limit: 16,
			// url: host + list_name_api,//'http://127.0.0.1:5000/api/v1/waring/list',//数据接口
			data: data_content,
			cols: [
				[ //表头
					{
						field: 'ai_ability',
						title: '事件类型'
					},
<<<<<<< HEAD
>>>>>>> anhuiyou
=======
>>>>>>> anhuiyou
					{
						field: 'time',
						title: '时间'
					},
					{
						field: 'location',
						title: '地点'
					},
					{
<<<<<<< HEAD
<<<<<<< HEAD
						field: 'ai_ability',
						title: '事件类型'
					},
=======
=======
>>>>>>> anhuiyou
						field:'person',
						title:'处理人'
					},
					{
						field:'do_flag',
						title:'处理状态'
					}
					
<<<<<<< HEAD
>>>>>>> anhuiyou
=======
>>>>>>> anhuiyou
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
<<<<<<< HEAD
<<<<<<< HEAD

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
=======
=======
>>>>>>> anhuiyou
		
			}
		});
	}


	//调用时间选择器，并筛选相应的数据进行加载
<<<<<<< HEAD
>>>>>>> anhuiyou
=======
>>>>>>> anhuiyou
	laydate.render({
		elem: '#detail-date', //指定元素
		range: true,
		theme: '#1E9FFF',
		done: function(value, date, endDate) {
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
=======
>>>>>>> anhuiyou
			
			//加载过程调用正在加载弹窗
			let layer_index1 = layer.load(1, {
				shade: [0.1, '#fff'] //0.1透明度的白色背景
			});
			let option_api = '/api/v1/waring/list/date_cal';	//按时间查找api
			$('.event-class').find('a').removeClass('active_btn');
			refresh_token();//刷新token
			$.ajax({
				url: host + option_api,
				headers:request_header,
				type: 'get',
				data: {
					'value': value,
					'page_num': 1
				},
				dataType: 'json',
				success: function(res) {
					console.log('时间筛选数据',res)
					add_detail(res);	//添加状态和处理人
					layer.close(layer_index1);
					if (res.code == 1) {
						res.data = [{
							"location": "暂无数据……！"
						}];
						total_page_size = 0;
					} else {
						translate(res);
						total_page_size = res.data[0].total_page_size;
					}
					tableIns.reload({	//重载表格
						data: res.data,
					});
					
					console.log('分页页数',total_page_size)
					click_watch(); //调用点击一行播放视频方法
					table_paging(option_api,{'value': value	});	//执行分页
<<<<<<< HEAD
>>>>>>> anhuiyou
=======
>>>>>>> anhuiyou
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

<<<<<<< HEAD
<<<<<<< HEAD
			get_data(); //调用获取数据函数
=======
=======
>>>>>>> anhuiyou
			let list_name_api = '/api/v1/waring/list/name';
			let layer_index = layer.load(1, {
				shade: [0.1, '#fff'] //0.1透明度的白色背景
			});
			refresh_token();//刷新token
			$.ajax({
				url: host + list_name_api,
				headers:request_header,
				type: 'get',
				dataType: 'json',
				data: {
					"ai_ability": event_name,
					"page_num": current_page
				},
				success: function(res) {
					data_content = res.data;
					add_detail(res);
					translate(res);
					if (res.code == 1) {	//没有数据显示
						data_content = [{
							"location": "暂无数据……！"
						}];
					}
				},
				complete: function() {
					total_page_size = data_content[0].total_page_size;//统计数据行数，用于分页
					layer.close(layer_index);
					table_load();	//渲染表格数据
					click_watch(); //调用点击一行播放视频方法
					table_paging(list_name_api,{"ai_ability": event_name });//执行分页
				}
			})

<<<<<<< HEAD
>>>>>>> anhuiyou
=======
>>>>>>> anhuiyou

		}
	}

	//点击过滤事件
	$('.event-class ').children('li').on('click', 'a', function() {
		$(this).addClass('active_btn').parent('li').siblings('li').children('a').removeClass('active_btn');
		let event = $(this).text();
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
=======
>>>>>>> anhuiyou
		if (ai_cn_ability_dict[event]) {
			event_name = ai_cn_ability_dict[event];
		}

		let list_name_api = '/api/v1/waring/list/name';//按事件类型查找所有事件api
		let layer_index = layer.load(1, {
			shade: [0.1, '#fff'] //0.1透明度的白色背景
		});
		refresh_token();//刷新token
		$.ajax({
			url: host + list_name_api,
			headers:request_header,
			type: 'get',
			dataType: 'json',
			data: {
				"ai_ability": event_name,
				"page_num": 1
			},
			success: function(res) {
				// console.log('res_click',res)
				add_detail(res);	//添加处理状态和处理人
				data_content = res.data;
				if (res.code == 1) {
					data_content = [{
						"location": "暂无数据……！"
					}];
					total_page_size = 0;
				}else{
					translate(res);
					total_page_size = data_content[0].total_page_size;
				}
			},
			complete: function() {
				layer.close(layer_index);
				
				table_load();//渲染表格				
				
				click_watch(); //调用点击一行播放视频方法
				
				table_paging(list_name_api,{"ai_ability": event_name });	//执行分页
				
			}
		})

	});


//定义添加处理状态和处理人的方法
	function add_detail(res){
		for(let i in res.data){
			res.data[i].do_flag == true ? res.data[i].do_flag='<span class="maked">已处理</span>' : res.data[i].do_flag='<span class="unmake">未处理</span>';
			res.data[i].person='管理员'
		}
	}
	
	//定义事件类型翻译方法
	function translate(res){
		for (let i in res.data) {
			if (ai_en_ability_dict[res.data[i].ai_ability]) {
				// console.log('事件类型',ai_en_ability_dict[data_content[i].ai_ability])
				res.data[i].ai_ability = ai_en_ability_dict[res.data[i].ai_ability];
			}
		}
	}

//表格分页方法
function table_paging(list_name_api,send_data){
	laypage.render({
		elem: 'page',
		count: total_page_size,
		theme: '#447DDB',
		limit: 16,
		layout: ['prev', 'page', 'next'],
		jump: function(obj, first) {
			if (!first) {
				current_page = obj.curr;
				send_data.page_num = current_page;
				refresh_token();//刷新token
				$.ajax({
					url: host + list_name_api,
					headers:request_header,
					type: 'get',
					dataType: 'json',
					data:send_data,
					success: function(res) {
						console.log('分页数据',res)
						console.log('总页数',total_page_size)
						add_detail(res);
						translate(res);
						tableIns.reload({ //表格重载
							data: res.data,
	
						});
						
						click_watch();
	
					}
				})
			}
		}
	});
}

//按条件搜索事件
function select_events(event){
	event.preventDefault();
	let address_api = '/api/v1/waring/list/fuzzy_query';
	let address_value = $('.search_text').val();
	if (address_value) {
		let layer_index2 = layer.load(1, { //请求数据过程现在正在加载弹窗
			shade: [0.1, '#fff'] //0.1透明度的白色背景
		});
		$('.event-class').find('a').removeClass('active_btn');
		refresh_token();//刷新token
		$.ajax({
			url: host + address_api,
			headers:request_header,
			type: 'get',
			data: {
				'value': address_value,
				'page_num': 1
			},
			dataType: 'json',
			success: function(res) {
				
				if (res.code == 1) {
					res.data = [{
						"location": "暂无数据……！"
					}];
					total_page_size = 0;
				} else {
					add_detail(res);
					translate(res);
					total_page_size = res.data[0].total_page_size;
				}
				 
				// console.log('回车筛选数据', res.data)
				layer.close(layer_index2); //数据请求结束关闭正在加载弹窗
				tableIns.reload({ //表格重载
					data: res.data,
				});
				// console.log('按地址获取解析后的数据',res.data)
				click_watch(); //调用点击一行播放视频方法
				table_paging(address_api,{'value': address_value});	//执行分页
			}
	
		});
	}
}

	//搜索按钮绑定点击搜索方法
	$('#search').on({
		click: function() {
			select_events(event);
<<<<<<< HEAD
>>>>>>> anhuiyou
=======
>>>>>>> anhuiyou

		}
	}, '.search_events');

<<<<<<< HEAD
<<<<<<< HEAD
	$('#search').on({
		keydown: function(event) {
			if (event.keyCode == 13) {
				select_event(event);
			}
		}
	}, '.search_text')

});

=======
=======
>>>>>>> anhuiyou

	//搜索输入框绑定回车执行搜索方法
	$('#search').on({
		keydown: function(event) {
			if (event.keyCode == 13) {
				select_events(event);
			}
		}
	}, '.search_text');


});


//当视频窗口打开时，点击右上角X按钮，关闭当前视频事件
<<<<<<< HEAD
>>>>>>> anhuiyou
=======
>>>>>>> anhuiyou
$('.close2').click(function() {
	$('#video').children('div').hide();
	$(this).hide();
	$('.current_video_title').empty();
})
