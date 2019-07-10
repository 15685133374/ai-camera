//事件详情页面
// 车牌识别详情页面
layui.use(['table', 'laydate'], function() {
    var table = layui.table;
    var data = [
            { "id": 1, "time": "2019-7-6", "location": "大门", "video": "video001.1" },
        ]
        //第一个实例
    table.render({
        elem: '#demo',
        skin: 'nob', //行边框风格
        height: 600,
        //   ,url: 'https://www.layui.com/demo/table/user/?page=1&limit=30' //数据接口
        data: data,
        page: { theme: '#447DDB', layout: ['prev', 'page', 'next'], }, //开启分页
        cols: [
            [ //表头
                { field: 'id', title: '序号' },
                { field: 'time', title: '时间' },
                { field: 'location', title: '地点' },
                { field: 'video', title: '视频回放', }
            ]
        ],
        // 数据渲染回调。
        done: function(res, curr, count) {
            $('.layui-table').css({ "background-color": 'transparent', 'color': 'white' });
            // $('tr').css({ "background-color": 'transparent' });
        }
    });

    // 日期时间选择
    var laydate = layui.laydate;

    //执行一个laydate实例
    laydate.render({
        elem: '#detail-date', //指定元素
        range: true,
        theme: '#1E9FFF',
        done: function(value, date, endDate) {
            console.log('日期范围选择完毕')
            console.log(value); //得到日期生成的值，如：2017-08-18
            console.log(date); //得到日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
            console.log(endDate); //得结束的日期时间对象，开启范围选择（range: true）才会返回。对象成员同上。
        }
    });
});