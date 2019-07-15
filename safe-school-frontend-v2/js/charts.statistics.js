var date = new Date();
var daytime = new Date()
function adddate(data, n) {
    return data;
}
var options = {
    chart: {
        type: 'spline',
        backgroundColor: 'transparent'
    },
    title: {
        text: '事件时间分布图',
        align: 'left',
        style: {
            color: 'white'
        }
    },

    credits: {
        enabled: false
    },
    xAxis: {
        categories: [daytime, adddate(date, 1), adddate(date, 2), adddate(date, 3), adddate(date, 4), adddate(date, 5), adddate(date, 6)],
        gridLineColor: '#197F07', //纵向网格线颜色
        gridLineWidth: 1, //纵向网格线宽度
        //		gridLineDashStyle:'longdash'
    },
    yAxis: {
        title: {
            text: ''
        },
        labels: {
            formatter: function () {
                return this.value;
            }
        },
        gridLineColor: '#197F07', //横向网格线颜色
        //		gridLineDashStyle: 'longdash',//横向网格线样式
        gridLineWidth: 1 //横向网格线宽度
    },
    tooltip: {
        crosshairs: true,
        shared: true
    },
    plotOptions: {
        spline: {
            marker: {
                radius: 4,
                lineColor: '#666666',
                lineWidth: 1
            }
        }
    },
    series: [{
        name: '倒地',
        color: '#34C21B',
        marker: {
            symbol: 'circle'
        },
        data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2]
    }, {
        name: '求救',
        color: '#6C19FC',
        marker: {
            symbol: 'circle'
        },
        data: [4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6]
    }, {
        name: '打架',
        color: 'green',
        marker: {
            symbol: 'circle'
        },
        data: [3.0, 4.9, 10.5, 12.5, 9.2, 18.5, 15.2]
    }, {
        name: '聚众',
        color: '#31C7F4',
        marker: {
            symbol: 'circle'
        },
        data: [2.0, 10.9, 11.5, 15.5, 30.2, 22.5, 20.2]
    }, {
        name: '闯入',
        color: '#D72C53',
        marker: {
            symbol: 'circle'
        },
        data: [10.0, 8.9, 12.5, 16.5, 20.2, 18.5, 55.2]
    }, {
        name: '攀爬',
        color: '#D7682C',
        marker: {
            symbol: 'circle'
        },
        data: [15.0, 18.9, 20.5, 25.5, 30.2, 38.5, 42.2]
    }]
};
var bar_options = {
    chart: { type: 'column', backgroundColor: 'transparent' },
    credits:{enabled:false},
    title: null,
    xAxis: {
        type: 'category',
        labels: { rotation: -45 },
    },
    yAxis: {
        title: null, gridLineWidth: 0
    },
    legend:{enabled:false},
    plotOptions:{
        column:{
            colorByPoint:true
        }
    },
    series: [{
        name: 'event_count',
        data: [
            // ['behavior_fall', 1],
            // ['behavior_climbhigh', 1],
            // ['post_sleep', 1],
            // ['area_leave_bed', 1],
        ]
    }]
};
var chart = Highcharts.chart('highcharts', bar_options);
var data=[['behavior_fall', 1],
['behavior_seekhelp', 2],
['crowd_detaction', 3],
['fight_detaction', 4],
['behavior_climb', 5],
['behavior_climbhigh',6],
['post_sleep', 7],
['area_leave_post', 8],
['area_leave_bed', 9],
['fire_detaction', 10],
['smoke_detaction', 11],]
// chart.series[0].upate({data:data})
// chart.series[0].addPoint(['behavior_fall', 6])
