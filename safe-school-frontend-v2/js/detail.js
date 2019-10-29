<<<<<<< HEAD
// 车牌识别详情页面
// var table ;
var ai_ability_dict = {
	"face_detaction": "人脸检测",
	"face_landmark": "人脸标记",
	"face_expression": "人脸表情",
	"face_gender": "性别识别",
	"body_detaction": "姿态检测",
	"hand_recognition": "姿态识别",
	"behavior_seekhelp": "求救事件",
	"behavior_fall": "到地事件",
	"behavior_climb": "攀爬事件",
	"behavior_climbhigh": "攀高事件",
	"fire_detaction": "火焰检测",
	"smoke_detaction": "烟雾检测",
	"area_Intrusion": "闯入事件",
	"area_leave_post": "离岗事件",
	"area_leave_bed": "离床事件",
	"crowd_detaction": "聚众事件",
	"car_recognition": "车牌识别",
	"post_sleep": "睡岗事件",
	"fight_detaction": "打架检测",
	"face_recognition": "人脸识别"
};


let host = window.location.host;
host = 'http://' + host;

layui.use(['table', 'laydate'], function() {
	var table = layui.table;
	var t = Array();
	let tableIns;
	let layer_index = layer.load(1, {
		shade: [0.1, '#fff'] //0.1透明度的白色背景
	});

	function getData() {
		// var uid = getCookie("uid");
		api = '/api/v1/ai/list';
		axios
			.get(host + api)
			.then(function(response) {
				layer.close(layer_index);
				// console.log(response.data)

				var d = response.data.result
				d.forEach(e => {
					var p = e.img_path
					var index = p.indexOf('/saveface')
					var _p = p.slice(index)
					var one = {
						img_path: _p,
						time: e.time,
						location: e.location,
						name: e.info.name
					}
					t.push(one)
				});
				sessionStorage.setItem('d', d);
				// console.log(t)
				tableIns = table.render({
					elem: '#demo',
					skin: 'nob', //行边框风格
					height: 700,
					// url: host + api, //数据接口
					data: t,
					page: {
						theme: '#447DDB',
						layout: ['prev', 'page', 'next'],
					}, //开启分页
					cols: [
						[ //表头
							// { field: 'id', title: '序号' },
							{
								field: 'name',
								title: '姓名'
							},
							// { field: 'sex', title: '性别', },
							// { field: 'carnumber', title: '车牌号' },
							{
								field: 'time',
								title: '时间'
							},
							{
								field: 'location',
								title: '地点'
							},
							{
								field: 'img',
								title: '抓拍图片',
								templet: '#titleTpl'
							}
						]
					],

					// 数据渲染回调。
					done: function(res, curr, count) {
						$('.layui-table').css({
							"background-color": 'transparent',
							'color': 'white'
						});
						// $('tr').css({ "background-color": 'transparent' });
					}
				})
			})
			.catch(function(error) {
				// console.log(error);
			});
	}
	table.render({

	});
	getData()


	// 日期时间选择
	var laydate = layui.laydate;

	//执行一个laydate实例
	laydate.render({
		elem: '#detail-date', //指定元素
		range: true,
		theme: '#1E9FFF',
		format: 'yyyy-MM-dd',
		done: function(value, date, endDate) {
			// console.log('日期范围选择完毕')
			// console.log(value); //得到日期生成的值，如：2017-08-18

			// console.log(date); //得到日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
			// console.log(endDate); //得结束的日期时间对象，开启范围选择（range: true）才会返回。对象成员同上。

			let layer_index1 = layer.load(1, {
				shade: [0.1, '#fff'] //0.1透明度的白色背景
			});
			let option_api = '/api/v1/ai/list/date_cal';
			$.ajax({
				url: host + option_api,
				type: 'get',
				data: {
					'value': value
				},
				dataType: 'json',
				success: function(res) {
					// console.log('筛选返回结果',res)
					layer.close(layer_index1);
					if (res.data === "something wrong!") {
						res.data = [{
							"location": "暂无数据……！"
						}];
					} else {
						for (let x in res.data) {
							res.data[x].name = res.data[x].info.name;
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
					// console.log('解析后的数据',res.data)
				}

			});

		}

	});

	function select_events(event) {
		event.preventDefault();
		let address_api = '/api/v1/ai/list/fuzzy_query';
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
						for (let x in res.data) {
							res.data[x].name = res.data[x].info.name;
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
			select_events(event);
		}
	}, '.search_events');

	$('#search').on({
		keydown: function(event) {
			if (event.keyCode == 13) {
				select_events(event);
			}
		}
	}, '.search_text')
=======
// 车牌识别详情页面

//全局定义 域名前缀，方便之后调用
let host = window.location.host;
host = 'http://' + host;
let current_page;
let domain_name = 'http://192.168.1.120';	//服务器域名
layui.use(['table', 'laydate', 'laypage'], function() { //调用layui框架里的table laydate laypage 组件
	var table = layui.table;
	var laydate = layui.laydate;
	var laypage = layui.laypage;
	let total_page_size;	//数据总数，用于分页
	var t = Array();
	let tableIns;
	let api_list;

	//弹出正在加载框
	let layer_index = layer.load(1, {
		shade: [0.1, '#fff'] //0.1透明度的白色背景
	});
	
	//获取所有数据
	function getData() {
		refresh_token();//刷新token
		api_list = '/api/v1/ai/list';//所有人脸、车牌识别事件api
		$.ajax({
			url:host + api_list,
			type:'get',
			dataType:'json',
			data:{"page_num":1},
			success:function(response){
				console.log('response',response)
				layer.close(layer_index); //数据请求完成之后关闭加载弹窗
				total_page_size = response.data[0].total_page_size;	//获取数据总数
				var d = response.data
				let t = new Array();
				for (let x in d) {
					var p = d[x].img_path;
					var index = p.indexOf('/saveface');
					var _p = p.slice(index);
					var one = {
						img_path: domain_name + _p,
						time: d[x].time,
						location:d[x].location,
						name:d[x].info.name
					}
					t.push(one);
				}
				sessionStorage.setItem('d', d);
				tableIns = table.render({ //加载表格数据，顺便赋值，方便后面重载表格
					elem: '#demo',
					skin: 'nob', //行边框风格
					height: 'full-250',
					limit: 16,
					data: t,
					cols: [
						[ //表头
							{
								field: 'name',
								title: '姓名'
							},
							{
								field: 'time',
								title: '时间'
							},
							{
								field: 'location',
								title: '地点'
							},
							{
								field: 'img',
								title: '抓拍图片',
								templet: '#titleTpl'
							}
						]
					],
				
					// 数据渲染回调。
					done: function(res, curr, count) {
						$('.layui-table').css({
							"background-color": 'transparent',
							'color': 'white'
						});
				
					}
				})
				
				table_paging(api_list,total_page_size,{"page_num": current_page});	//执行分页
			},
			error:function(error){
				console.log('get data error',error);
			}

		})
		
	}
	table.render({

	});
	getData();



	// 日期时间选择
	//执行一个laydate实例
	laydate.render({
		elem: '#detail-date', //指定元素
		range: true,
		theme: '#1E9FFF',
		format: 'yyyy-MM-dd',
		done: function(value, date, endDate) {

			let layer_index1 = layer.load(1, {
				shade: [0.1, '#fff'] //0.1透明度的白色背景
			});
			let option_api = '/api/v1/ai/list/date_cal';//按时间查询api
			refresh_token();//刷新token
			$.ajax({
				url: host + option_api,
				headers:request_header,
				type: 'get',
				data: {
					'value': value,
					"page_num": 1
				},
				dataType: 'json',
				success: function(res) {

					console.log('筛选返回结果', res)
					layer.close(layer_index1);
					if (res.code == 1) {
						res.data = [{
							"location": "暂无数据……！"
						}];
					} else {
						for (let x in res.data) {
							res.data[x].name = res.data[x].info.name;
							res.data[x].img_path = domain_name + '/saveface/' + res.data[x].img_path.split('/')[5];	//头像
						}
					}
					total_page_size = res.data[0].total_page_size;
					tableIns.reload({
						data: res.data,
					});
					
					table_paging(api_list,total_page_size,{"page_num": current_page});	//执行分页

				}

			});

		}

	});
	
	//定义分页方法
	function table_paging(api,all_page,send_data){
		laypage.render({
			elem: 'pages',
			count: all_page,
			theme: '#447DDB',
			limit: 16,
			// limit:10,
			layout: ['prev', 'page', 'next'],
			jump: function(obj, first) {
				if (!first) {
					current_page = obj.curr;
					send_data.page_num = current_page;
					refresh_token();//刷新token
					$.ajax({
						url: host + api,
						headers:request_header,
						type: 'get',
						dataType: 'json',
						data:send_data,
						success: function(res) {
							for (var i in res.data) {
								res.data[i].name = res.data[i].info.name;	//姓名
								res.data[i].img_path = domain_name + '/saveface/' + res.data[i].img_path.split('/')[5];	//头像
							}
		
							tableIns.reload({ //表格重载
								data: res.data,
		
							});
		
						},
						error:function(){
							console.log(error)
						}
					})
				}
			}
		});
	}
	//关键字查询方法
	function select_events(event) {
		event.preventDefault();
		let address_api = '/api/v1/ai/list/fuzzy_query';//模糊查询api
		let address_value = $('.search_text').val();
		// console.log('地址关键字',address_value);
		if (address_value) {
			let layer_index2 = layer.load(1, {
				shade: [0.1, '#fff'] //0.1透明度的白色背景
			});
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
					layer.close(layer_index2);
					if (res.code == 1) {
						res.data = [{
							"location": "暂无数据……！"
						}];
					} else {
						for (let x in res.data) {
							res.data[x].name = res.data[x].info.name;
							res.data[x].img_path = domain_name + '/saveface/' + res.data[x].img_path.split('/')[5];	//头像
						}
					}
					tableIns.reload({
						data: res.data,
					});
					var total_page_size = res.data[0].total_page_size;
					table_paging(address_api,total_page_size,{'value': address_value});	//执行分页

				}

			});
		}
	}
	//关键字点击按钮搜索
	$('#search').on({
		click: function() {
			select_events(event);
		}
	}, '.search_events');
	
	//关键字回车搜索
	$('#search').on({
		keydown: function(event) {
			if (event.keyCode == 13) {
				select_events(event);
			}
		}
	}, '.search_text')
>>>>>>> anhuiyou
});
