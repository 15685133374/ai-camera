var host = window.location.host;
host = 'http://' + host;
waring_event_one_week = '/api/v1/waring/list/one_week',
	$.ajax({
		url: host + waring_event_one_week,
		type: 'get',
		dataType: 'json',
		success: function(res) {
			console.log('一周事件统计',res.data);
		}

	});
	
	let cur_date=new Date();
	function timeStamp2String(time){
    var datetime = new Date();
    datetime.setTime(time);
    var year = datetime.getFullYear();
    var month = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
    var date = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
    return year + "." + month + "." + date;
}

	console.log('当天时间',timeStamp2String(cur_date));

var myChart = echarts.init(document.getElementsByClassName('echarts_box')[0]);

option = {
	title: {
		text: '一周事件分布图',
		// subtext: '纯属虚构'
		textStyle: {
			fontWeight: 'normal', //标题颜色  
			color: 'white'
		},
	},
	tooltip: {
		trigger: 'axis'
	},
	legend: {
		data: ['求救事件', '攀爬事件', '攀高事件', '闯入事件', '火焰事件', '聚众事件', '倒地事件', '离岗事件'],
		textStyle: {
			color: 'rgba(255,255,255,.8)'
		},
		padding: 30,

	},

	toolbox: { //右上角导出按钮
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
	xAxis: [{
		type: 'category',
		boundaryGap: false,
		data: [timeStamp2String(cur_date-24*60*60*1000*6), timeStamp2String(cur_date-24*60*60*1000*5), timeStamp2String(cur_date-24*60*60*1000*4), timeStamp2String(cur_date-24*60*60*1000*3), timeStamp2String(cur_date-24*60*60*1000*2), timeStamp2String(cur_date-24*60*60*1000), timeStamp2String(cur_date)],
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
	grid: {
		left: '0',
		right: '30',
		// top:'3',
		bottom: '0',
		containLabel: true
	},
	series: [{
			name: '求救事件',
			smooth: true, //这个是把线变成曲线
			type: 'line',
			color: '#34C21B',
			data: [11, 11, 15, 13, 12, 13, 100],


		},
		{
			name: '攀爬事件',
			smooth: true, //这个是把线变成曲线
			type: 'line',
			color: '#6C19FC',
			data: [1, 5, 2, 5, 3, 2, 0],

		},
		{
			name: '攀高事件',
			smooth: true, //这个是把线变成曲线
			type: 'line',
			color: '#1574FD',
			data: [1, 10, 2, 5, 3, 2, 0],

		},
		{
			name: '闯入事件',
			smooth: true, //这个是把线变成曲线
			type: 'line',
			line: '#31C7F4',
			data: [1, 20, 2, 5, 3, 2, 0],

		},
		{
			name: '攀爬事件',
			smooth: true, //这个是把线变成曲线
			type: 'line',
			color: '#650000',
			data: [1, 11, 2, 5, 3, 2, 0],

		},
		{
			name: '火焰事件',
			smooth: true, //这个是把线变成曲线
			type: 'line',
			color: '#FF9098',
			data: [1, 15, 2, 5, 3, 2, 0],

		},
		{
			name: '聚众事件',
			smooth: true, //这个是把线变成曲线
			type: 'line',
			color: '#FE00FE',
			data: [1, 10, 2, 5, 3, 2, 0],

		},
		{
			name: '倒地事件',
			smooth: true, //这个是把线变成曲线
			type: 'line',
			color: '#244D10',
			data: [1, 12, 2, 5, 3, 2, 0],

		},
		{
			name: '离岗事件',
			smooth: true, //这个是把线变成曲线
			type: 'line',
			color: '#C9E056',
			data: [1, 13, 2, 5, 3, 2, 0],

		}
	]
};

myChart.setOption(option);
