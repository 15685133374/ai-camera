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
});
