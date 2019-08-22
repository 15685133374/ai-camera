let cur_date=new Date();
	function timeStamp2String(time){
    var datetime = new Date();
    datetime.setTime(time);
    var year = datetime.getFullYear();
    var month = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
    var date = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
    return year + "." + month + "." + date;
}

var myChart = echarts.init(document.getElementsByClassName('echarts_box')[0]);


var host = window.location.host;
host = 'http://' + host;
let waring_event_one_week = '/api/v1/waring/list/one_week';
let all_events = new Array(
	{'behavior_seekhelp':0,'behavior_climb':0,'behavior_climbhigh':0,'area_Intrusion':0,'fire_detaction':0,'crowd_detaction':0,'behavior_fall':0,'area_leave_post':0},
	{'behavior_seekhelp':0,'behavior_climb':0,'behavior_climbhigh':0,'area_Intrusion':0,'fire_detaction':0,'crowd_detaction':0,'behavior_fall':0,'area_leave_post':0},
	{'behavior_seekhelp':0,'behavior_climb':0,'behavior_climbhigh':0,'area_Intrusion':0,'fire_detaction':0,'crowd_detaction':0,'behavior_fall':0,'area_leave_post':0},
	{'behavior_seekhelp':0,'behavior_climb':0,'behavior_climbhigh':0,'area_Intrusion':0,'fire_detaction':0,'crowd_detaction':0,'behavior_fall':0,'area_leave_post':0},
	{'behavior_seekhelp':0,'behavior_climb':0,'behavior_climbhigh':0,'area_Intrusion':0,'fire_detaction':0,'crowd_detaction':0,'behavior_fall':0,'area_leave_post':0},
	{'behavior_seekhelp':0,'behavior_climb':0,'behavior_climbhigh':0,'area_Intrusion':0,'fire_detaction':0,'crowd_detaction':0,'behavior_fall':0,'area_leave_post':0},
	{'behavior_seekhelp':0,'behavior_climb':0,'behavior_climbhigh':0,'area_Intrusion':0,'fire_detaction':0,'crowd_detaction':0,'behavior_fall':0,'area_leave_post':0},
);
let events=new Array();
	$.ajax({
		url: host + waring_event_one_week,
		type: 'get',
		dataType: 'json',
		success: function(res) {
			console.log('一周事件统计',res.data);
			for(var n in res.data){
				if(res.data[n].count != 0){
					if(res.data[n].count.behavior_seekhelp){
						all_events[6-n].behavior_seekhelp = res.data[n].count.behavior_seekhelp;
					};
					if(res.data[n].count.behavior_climb){
						all_events[6-n].behavior_climb = res.data[n].count.behavior_climb;
					}
					if(res.data[n].count.behavior_climbhigh){
						all_events[6-n].behavior_climbhigh = res.data[n].count.behavior_climbhigh;
					}
					if(res.data[n].count.area_Intrusion){
						all_events[6-n].area_Intrusion = res.data[n].count.area_Intrusion;
					}
					if(res.data[n].count.fire_detaction){
						all_events[6-n].fire_detaction = res.data[n].count.fire_detaction;
					}
					if(res.data[n].count.crowd_detaction){
						all_events[6-n].crowd_detaction = res.data[n].count.crowd_detaction;
					}
					if(res.data[n].count.behavior_fall){
						all_events[6-n].behavior_fall = res.data[n].count.behavior_fall;
					}
					if(res.data[n].count.area_leave_post){
						all_events[6-n].area_leave_post = res.data[n].count.area_leave_post;
					}
					
				}
			}
			
			option = {
				title: {
					text: '一周事件分布图',
					// subtext: '纯属虚构'
					textStyle: {
						fontWeight: 'normal', //标题颜色  
						color: 'white',
						fontSize:'16'
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
						smooth: true, 
						type: 'line',
						color: '#34C21B',
						data: [all_events[0].behavior_seekhelp,all_events[1].behavior_seekhelp,all_events[2].behavior_seekhelp,all_events[3].behavior_seekhelp,all_events[4].behavior_seekhelp,all_events[5].behavior_seekhelp,all_events[6].behavior_seekhelp],
					},
					{
						name: '攀爬事件',
						smooth: true, 
						type: 'line',
						color: '#6C19FC',
						data: [all_events[0].behavior_climb,all_events[1].behavior_climb,all_events[2].behavior_climb,all_events[3].behavior_climb,all_events[4].behavior_climb,all_events[5].behavior_climb,all_events[6].behavior_climb],
					},
					{
						name: '攀高事件',
						smooth: true, 
						type: 'line',
						color: '#1574FD',
						data: [all_events[0].behavior_climbhigh,all_events[1].behavior_climbhigh,all_events[2].behavior_climbhigh,all_events[3].behavior_climbhigh,all_events[4].behavior_climbhigh,all_events[5].behavior_climbhigh,all_events[6].behavior_climbhigh],
					},
					{
						name: '闯入事件',
						smooth: true, 
						type: 'line',
						line: '#31C7F4',
						data: [all_events[0].area_Intrusion,all_events[1].area_Intrusion,all_events[2].area_Intrusion,all_events[3].area_Intrusion,all_events[4].area_Intrusion,all_events[5].area_Intrusion,all_events[6].area_Intrusion],
			
					},
					{
						name: '火焰事件',
						smooth: true, 
						type: 'line',
						color: '#FF9098',
						data: [all_events[0].fire_detaction,all_events[1].fire_detaction,all_events[2].fire_detaction,all_events[3].fire_detaction,all_events[4].fire_detaction,all_events[5].fire_detaction,all_events[6].fire_detaction],
			
					},
					{
						name: '聚众事件',
						smooth: true,
						type: 'line',
						color: '#FE00FE',
						data: [all_events[0].crowd_detaction,all_events[1].crowd_detaction,all_events[2].crowd_detaction,all_events[3].crowd_detaction,all_events[4].crowd_detaction,all_events[5].crowd_detaction,all_events[6].crowd_detaction],
			
					},
					{
						name: '倒地事件',
						smooth: true, 
						type: 'line',
						color: '#244D10',
						data: [all_events[0].behavior_fall,all_events[1].behavior_fall,all_events[2].behavior_fall,all_events[3].behavior_fall,all_events[4].behavior_fall,all_events[5].behavior_fall,all_events[6].behavior_fall],
			
					},
					{
						name: '离岗事件',
						smooth: true,
						type: 'line',
						color: '#C9E056',
						data: [all_events[0].area_leave_post,all_events[1].area_leave_post,all_events[2].area_leave_post,all_events[3].area_leave_post,all_events[4].area_leave_post,all_events[5].area_leave_post,all_events[6].area_leave_post],
			
					}
				]
			};
			myChart.setOption(option);
			
		},
		complete:function(){
			
			
		}
	});
	
	
	


