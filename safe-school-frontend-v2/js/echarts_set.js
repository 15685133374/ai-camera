//图表初始化

let cur_date = new Date();

//全局定义option ，便于别的文件重载时调用
var option;

//时间格式化函数
function timeStamp2String(time) {
	var datetime = new Date();
	datetime.setTime(time);
	var year = datetime.getFullYear();
	var month = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
	var date = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
	return year + "." + month + "." + date;
};

//定义echarts元素对象
var myChart = echarts.init(document.getElementsByClassName('echarts_box')[0]);

var host = window.location.host;
host = 'http://' + host;
let waring_event_one_week = '/api/v1/waring/list/one_week'; //一周事件数据



//定义数组，初始化图表，其中7个对象对应一周数据，每一天又包含8个事件
let all_events = new Array({
	'behavior_seekhelp': 0,
	'behavior_climb': 0,
	'behavior_climbhigh': 0,
	'area_Intrusion': 0,
	'fire_detaction': 0,
	'crowd_detaction': 0,
	'behavior_fall': 0,
	'area_leave_post': 0
}, {
	'behavior_seekhelp': 0,
	'behavior_climb': 0,
	'behavior_climbhigh': 0,
	'area_Intrusion': 0,
	'fire_detaction': 0,
	'crowd_detaction': 0,
	'behavior_fall': 0,
	'area_leave_post': 0
}, {
	'behavior_seekhelp': 0,
	'behavior_climb': 0,
	'behavior_climbhigh': 0,
	'area_Intrusion': 0,
	'fire_detaction': 0,
	'crowd_detaction': 0,
	'behavior_fall': 0,
	'area_leave_post': 0
}, {
	'behavior_seekhelp': 0,
	'behavior_climb': 0,
	'behavior_climbhigh': 0,
	'area_Intrusion': 0,
	'fire_detaction': 0,
	'crowd_detaction': 0,
	'behavior_fall': 0,
	'area_leave_post': 0
}, {
	'behavior_seekhelp': 0,
	'behavior_climb': 0,
	'behavior_climbhigh': 0,
	'area_Intrusion': 0,
	'fire_detaction': 0,
	'crowd_detaction': 0,
	'behavior_fall': 0,
	'area_leave_post': 0
}, {
	'behavior_seekhelp': 0,
	'behavior_climb': 0,
	'behavior_climbhigh': 0,
	'area_Intrusion': 0,
	'fire_detaction': 0,
	'crowd_detaction': 0,
	'behavior_fall': 0,
	'area_leave_post': 0
}, {
	'behavior_seekhelp': $('.behavior_seekhelp').text(),
	'behavior_climb': $('.behavior_climb').text(),
	'behavior_climbhigh': $('.behavior_climbhigh').text(),
	'area_Intrusion': $('.area_Intrusion').text(),
	'fire_detaction': $('.fire_detaction').text(),
	'crowd_detaction': $('.crowd_detaction').text(),
	'behavior_fall': $('.behavior_fall').text(),
	'area_leave_post': $('.area_leave_post').text()
});

let cur_event_count_api = '/api/v1/waring/list/cur_day';	//当天所有事件数据接口
$.ajax({
	url: host + cur_event_count_api,
	type: 'get',
	dataType: 'json',
	success: function(res) {
		//先渲染当天所有事件数据
		let event_data = res.data;
		all_events[6].behavior_seekhelp = event_data.behavior_seekhelp ? event_data.behavior_seekhelp : 0;
		all_events[6].behavior_climb =event_data.behavior_climb ? event_data.behavior_climb : 0;
		all_events[6].behavior_climbhigh =event_data.behavior_climbhigh ? event_data.behavior_climbhigh : 0;
		all_events[6].area_Intrusion =event_data.area_Intrusion ? event_data.area_Intrusion : 0;
		all_events[6].fire_detaction =event_data.fire_detaction ? event_data.fire_detaction : 0;
		all_events[6].crowd_detaction =event_data.crowd_detaction ? event_data.crowd_detaction : 0;
		all_events[6].behavior_fall =event_data.behavior_fall ? event_data.behavior_fall : 0;
		all_events[6].area_leave_post =event_data.area_leave_post ? event_data.area_leave_post : 0;
		
$.ajax({
	url: host + waring_event_one_week,
	// headers:request_header,
	type: 'get',
	async:'true',
	dataType: 'json',
	success: function(res) {
		// console.log('一周事件统计',res.data);
		for (var n in res.data) {
			if (res.data[n].count != 0) {
				if (res.data[n].count.behavior_seekhelp) {
					all_events[5 - n].behavior_seekhelp = res.data[n].count.behavior_seekhelp;
				};
				if (res.data[n].count.behavior_climb) {
					all_events[5 - n].behavior_climb = res.data[n].count.behavior_climb;
				}
				if (res.data[n].count.behavior_climbhigh) {
					all_events[5 - n].behavior_climbhigh = res.data[n].count.behavior_climbhigh;
				}
				if (res.data[n].count.area_Intrusion) {
					all_events[5 - n].area_Intrusion = res.data[n].count.area_Intrusion;
				}
				if (res.data[n].count.fire_detaction) {
					all_events[5 - n].fire_detaction = res.data[n].count.fire_detaction;
				}
				if (res.data[n].count.crowd_detaction) {
					all_events[5 - n].crowd_detaction = res.data[n].count.crowd_detaction;
				}
				if (res.data[n].count.behavior_fall) {
					all_events[5 - n].behavior_fall = res.data[n].count.behavior_fall;
				}
				if (res.data[n].count.area_leave_post) {
					all_events[5 - n].area_leave_post = res.data[n].count.area_leave_post;
				}

			}
		};

		option = {
			title: {
				text: '一周事件分布图',
				// subtext: '纯属虚构'
				textStyle: {
					fontWeight: 'normal', //标题样式设置  
					color: 'white',
					fontSize: '16'
				},
			},
			tooltip: {
				trigger: 'item' //鼠标放上去时的提示信息  axis:显示该列下所有坐标轴所对应的数据   item:只显示改点的数据
			},
			legend: { //图例信息显示
				data: ['求救', '攀爬', '攀高', '闯入', '火焰', '聚众', '倒地', '离岗'],
				textStyle: {
					color: 'rgba(255,255,255,.8)'
				},
				padding: [30, 0, 0, 0],
			},

			toolbox: { //右上角额外工具
				show: true,
				feature: {
					// mark : {show: true},
					// dataView : {show: true, readOnly: false},
					magicType: {
						show: true,
						type: ['line', 'bar']
					},
					// restore : {show: true},
					// saveAsImage : {show: true}
				},
				textStyle: {
					color: 'rgba(255,255,255,.8)'
				},
			},
			calculable: true,
			xAxis: [{ //横坐标上显示7天时间信息
				type: 'category',
				boundaryGap: false,
				data: [timeStamp2String(cur_date - 24 * 60 * 60 * 1000 * 6), timeStamp2String(cur_date - 24 * 60 * 60 * 1000 *5),
					timeStamp2String(cur_date - 24 * 60 * 60 * 1000 * 4), timeStamp2String(cur_date - 24 * 60 * 60 * 1000 * 3),
					timeStamp2String(cur_date - 24 * 60 * 60 * 1000 * 2), timeStamp2String(cur_date - 24 * 60 * 60 * 1000),
					timeStamp2String(cur_date)
				],
				axisLine: {
					lineStyle: {
						color: 'white'
					}
				},
				splitLine: {
					show: true,
					lineStyle: {
						color: ['#315070'],
						width: 1,
						type: 'solid'
					}
				}
			}],
			yAxis: [{
				type: 'value',
				axisLabel: {
					formatter: '{value}'
				},
				axisLine: {
					lineStyle: {
						color: 'white'
					}
				},
				splitLine: {
					show: true,
					lineStyle: {
						color: ['#315070'],
						width: 1,
						type: 'solid'
					}
				}
			}],
			grid: {	//图表样式
				left: '10',
				right: '35',
				// top:'3',
				bottom: '0',
				containLabel: true
			},
			series: [{
					name: '求救',
					smooth: true,
					type: 'line',
					color: '#34C21B',
					data: [all_events[0].behavior_seekhelp, all_events[1].behavior_seekhelp, all_events[2].behavior_seekhelp,
						all_events[3].behavior_seekhelp, all_events[4].behavior_seekhelp, all_events[5].behavior_seekhelp,
						all_events[6].behavior_seekhelp
					],
				},
				{
					name: '攀爬',
					smooth: true,
					type: 'line',
					color: '#6C19FC',
					data: [all_events[0].behavior_climb, all_events[1].behavior_climb, all_events[2].behavior_climb, all_events[
						3].behavior_climb, all_events[4].behavior_climb, all_events[5].behavior_climb, all_events[6].behavior_climb],
				},
				{
					name: '攀高',
					smooth: true,
					type: 'line',
					color: '#1574FD',
					data: [all_events[0].behavior_climbhigh, all_events[1].behavior_climbhigh, all_events[2].behavior_climbhigh,
						all_events[3].behavior_climbhigh, all_events[4].behavior_climbhigh, all_events[5].behavior_climbhigh,
						all_events[6].behavior_climbhigh
					],
				},
				{
					name: '闯入',
					smooth: true,
					type: 'line',
					line: '#31C7F4',
					data: [all_events[0].area_Intrusion, all_events[1].area_Intrusion, all_events[2].area_Intrusion, all_events[
						3].area_Intrusion, all_events[4].area_Intrusion, all_events[5].area_Intrusion, all_events[6].area_Intrusion],

				},
				{
					name: '火焰',
					smooth: true,
					type: 'line',
					color: '#FF9098',
					data: [all_events[0].fire_detaction, all_events[1].fire_detaction, all_events[2].fire_detaction, all_events[
						3].fire_detaction, all_events[4].fire_detaction, all_events[5].fire_detaction, all_events[6].fire_detaction],

				},
				{
					name: '聚众',
					smooth: true,
					type: 'line',
					color: '#FE00FE',
					data: [all_events[0].crowd_detaction, all_events[1].crowd_detaction, all_events[2].crowd_detaction,
						all_events[3].crowd_detaction, all_events[4].crowd_detaction, all_events[5].crowd_detaction, all_events[6]
						.crowd_detaction
					],

				},
				{
					name: '倒地',
					smooth: true,
					type: 'line',
					color: '#244D10',
					data: [all_events[0].behavior_fall, all_events[1].behavior_fall, all_events[2].behavior_fall, all_events[3].behavior_fall,
						all_events[4].behavior_fall, all_events[5].behavior_fall, all_events[6].behavior_fall
					],

				},
				{
					name: '离岗',
					smooth: true,
					type: 'line',
					color: '#C9E056',
					data: [all_events[0].area_leave_post, all_events[1].area_leave_post, all_events[2].area_leave_post,
						all_events[3].area_leave_post, all_events[4].area_leave_post, all_events[5].area_leave_post, all_events[6]
						.area_leave_post
					],

				}
			]
		};
		myChart.setOption(option);

	},
	error: function(res) {
		console.log('一周事件统计失败');
	},
	complete: function() {
		// console.log('一周事件统计完成');
	}
});
},
})