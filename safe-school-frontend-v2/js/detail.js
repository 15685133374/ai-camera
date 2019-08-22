// 车牌识别详情页面
// var table ;
layui.use(['table', 'laydate'], function() {
    var table=layui.table;
    var t=Array();
	let tableIns;
    let layer_index = layer.load(1, {
        shade: [0.1,'#fff'] //0.1透明度的白色背景
        });
    function getData() {
        // var uid = getCookie("uid");
        var host = window.location.host;
        host = 'http://' + host
        api = '/api/v1/ai/list';
        axios
            .get(host + api)
            .then(function (response) {
                layer.close(layer_index);
                console.log(response.data)
                
                var d=response.data.result
                d.forEach(e => {
                    var p=e.img_path
                    var index=p.indexOf('/saveface')
                    var _p=p.slice(index)
                    var one={img_path:_p,time:e.time,location:e.location,name:e.info.name}
                    t.push(one)
                });
                sessionStorage.setItem('d',d);
                console.log(t)
                tableIns=table.render({
                elem: '#demo',
                skin: 'nob', //行边框风格
                height: 700,
                // url: host + api, //数据接口
                data:t,
                page: { theme: '#447DDB', layout: ['prev', 'page', 'next'], }, //开启分页
                cols: [
                    [ //表头
                        // { field: 'id', title: '序号' },
                        { field: 'name', title: '姓名' },
                        // { field: 'sex', title: '性别', },
                        // { field: 'carnumber', title: '车牌号' },
                        { field: 'time', title: '时间' },
                        { field: 'location', title: '地点' },
                        { field: 'img', title: '抓拍图片', templet: '#titleTpl' }
                    ]
                ],
                
                // 数据渲染回调。
                done: function(res, curr, count) {
                    $('.layui-table').css({ "background-color": 'transparent', 'color': 'white' });
                    // $('tr').css({ "background-color": 'transparent' });
                }
            })
            })
            .catch(function (error) {
                console.log(error);
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
        format:'yyyy-MM-dd',
        done: function(value, date, endDate) {
            console.log('日期范围选择完毕')
            console.log(value); //得到日期生成的值，如：2017-08-18
			
            console.log(date); //得到日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
            console.log(endDate); //得结束的日期时间对象，开启范围选择（range: true）才会返回。对象成员同上。
            let layer_index1 = layer.load(1, {
                shade: [0.1,'#fff'] //0.1透明度的白色背景
                });
			let host = window.location.host;
			host = 'http://' + host;
			option_api = '/api/v1/ai/list/date_cal';
			$.ajax({
				url:host + option_api,
				type:'get',
				data:{'value':value},
				dataType:'json',
				success: (function (res) {
					layer.close(layer_index1);
					console.log(res.data)
					 if (res.data === "something wrong!") {
					    res.data = [{"location": "暂无数据……！"}];
					}
					tableIns.reload({
					 data:res.data,
					  page: {
						curr: 1 ,//重新从第 1 页开始
						theme: '#447DDB', layout: ['prev', 'page', 'next']
					  }
					});
					
					
				})
				
			})
        }
		 
    });
});



