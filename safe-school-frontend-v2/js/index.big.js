window.onload = function() {
        var date = new Date();
        var oTime = document.getElementsByClassName('time')[0];

        function formatTime(date) {  
            if (date) {    
                var date = new Date(date);  
            } else {    
                var date = new Date();  
            }    
            Y = date.getFullYear(),     m = date.getMonth() + 1,     d = date.getDate(),     H = date.getHours(),     i = date.getMinutes(),     s = date.getSeconds();  
            if (m < 10) {    
                m = '0' + m;  
            }  
            if (d < 10) {    
                d = '0' + d;  
            }  
            if (H < 10) {    
                H = '0' + H;  
            }  
            if (i < 10) {    
                i = '0' + i;  
            }  
            if (s < 10) {    
                s = '0' + s;  
            }  
            var t = Y + '-' + m + '-' + d + ' ' + H + ':' + i + ':' + s;  
            return t;
        }

        function formatdate(date) {  
            if (date) {    
                var date = new Date(date);  
            } else {    
                var date = new Date();  
            }    
            Y = date.getFullYear(),     m = date.getMonth() + 1,     d = date.getDate(),     H = date.getHours(),     i = date.getMinutes(),     s = date.getSeconds();  
            if (m < 10) {    
                m = '0' + m;  
            }  
            if (d < 10) {    
                d = '0' + d;  
            }
            //			   if(H<10){
            //			       H = '0'+H;
            //			   }
            //			   if(i<10){
            //			       i = '0'+i;
            //			   }
            //			   if(s<10){
            //			       s = '0'+s;
            //			   }
              
            var t = Y + '.' + m + '.' + d;  
            return t;
        }


        var datatime = formatTime(date);
        var daytime = formatdate(date);

        //			var daytime=date.toLocaleDateString();
        oTime.innerHTML = datatime;


        function adddate(date, num) {  
            if (date) {    
                var date = new Date(date);  
            } else {    
                var date = new Date();  
            }    
            Y = date.getFullYear(),     m = date.getMonth() + 1,     d = date.getDate() + num,     H = date.getHours(),     i = date.getMinutes(),     s = date.getSeconds();  
            if (m < 10) {    
                m = '0' + m;  
            }  
            if (d < 10) {    
                d = '0' + d;  
            }
            //			   if(H<10){
            //			       H = '0'+H;
            //			   }
            //			   if(i<10){
            //			       i = '0'+i;
            //			   }
            //			   if(s<10){
            //			       s = '0'+s;
            //			   }
              
            var t = Y + '.' + m + '.' + d;  
            return t;
        }

        //			 var nextdate=adddate(date,1);
        //charts
        var chart = Highcharts.chart('container', {
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
            //	subtitle: {
            //		text: '数据来源: WorldClimate.com'
            //	},
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
                    formatter: function() {
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
        });
    }