//事件详情页面
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
    "打架事件": "fight_detaction"
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
    "fight_detaction": "打架事件"
};


layui.use(['table', 'laydate'], function () {
    var table = layui.table;
    // 日期时间选择
    var laydate = layui.laydate;
    let event_res = '';      //全局定义所有事件的返回数据；
    let data_content = '';   //全局定义所有事件的存储容器
    let event_name = '';     //全局定义事件名称

    //定义显示表格事件函数
    function display_event_list() {
        for (let i in data_content) {
            if (ai_en_ability_dict[data_content[i].ai_ability]) {
                // console.log('事件类型',ai_en_ability_dict[data_content[i].ai_ability])
                data_content[i].ai_ability = ai_en_ability_dict[data_content[i].ai_ability];
            }
        }
        console.log('点击修改后的数据', data_content);
        table.render({
            elem: '#demo',
            skin: 'nob', //行边框风格
            height: 600,
            limit: 10,
            // url: host + list_name_api,//'http://127.0.0.1:5000/api/v1/waring/list',//数据接口
            data: data_content,
            loading: true,
            // where: {"ai_ability": event_name},
            page: {theme: '#447DDB', layout: ['prev', 'page', 'next'],}, //开启分页
            cols: [
                [ //表头
                    // {field: 'wid', title: '序号'},
                    {field: 'time', title: '时间'},
                    {field: 'location', title: '地点'},
                    {field: 'ai_ability', title: '事件类型'},
                ]
            ],
            // 数据渲染回调。
            done: function (res, curr, count) {
                // console.log("res", res);
                $('.layui-table').css({"background-color": 'transparent', 'color': 'white'});
                event_res = res.data;
            }
        });
        $('.layui-table').eq(1).children('tbody').on({
            click: function () {
                $(this).addClass('active_video').siblings('tr').removeClass('active_video');
                let index = $(this).attr('data-index');
                let video_path = event_res[index].video_path;
                // console.log(video_path)
                var videoObject = {
                    container: '#video', //容器的ID或className
                    variable: 'player',//播放函数名称
                    // poster: '../material/poster.jpg',//封面图片
                    video: [//视频地址列表形式
                        [video_path, 'video/mp4', '中文标清', 0],
                    ]
                };
                var player = new ckplayer(videoObject);
                // console.log('当前信息',$(this).text());
                $('.close2').show();
                $('.current_video_title').html($(this).html());
            },
            mouseenter: function () {
                let empty_char = $(this).children('td').eq(1).find('div').text();
                if (empty_char) {
                    $(this).attr('title', '点击播放')
                }
            }
        }, 'tr')
    }

    function get_data() {
        var host = window.location.host;
        host = 'http://' + host;
        let list_name_api = '/api/v1/waring/list/name';
        $.ajax({
            url: host + list_name_api,
            type: 'get',
            dataType: 'json',
            data: {"ai_ability": event_name},
            success: function (res) {
                data_content = res.data;
                // console.log('data_content',data_content);
                if (data_content === 'Success！') {
                    data_content = [{"ai_ability": "暂无数据……！"}];
                }
            }
        })
    }

    //执行一个laydate实例
    laydate.render({
        elem: '#detail-date', //指定元素
        range: true,
        theme: '#1E9FFF',
        done: function (value, date, endDate) {
            console.log('日期范围选择完毕');
            console.log(value); //得到日期生成的值，如：2017-08-18
            console.log(date); //得到日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
            console.log(endDate); //得结束的日期时间对象，开启范围选择（range: true）才会返回。对象成员同上。
        }
    });

    let get_click_key = sessionStorage.getItem('click_key');   //获取大屏页面跳转过来时的事件类型；
    let btn_select = $('.event-class').children('li').children('a');    //获取当前页面所有事件类型并存储为数组

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

            get_data();  //调用获取数据函数
            setTimeout(function () {
                display_event_list(); //调用显示数据函数
            },2000)
        }
    }

    //点击过滤事件
    $('.event-class ').children('li').on('click', 'a', function () {
        $(this).addClass('active_btn').parent('li').siblings('li').children('a').removeClass('active_btn');
        let event = $(this).text();
        // console.log(event);
        // event_name = btn_select.eq(i).text();
        if (ai_cn_ability_dict[event]) {
            event_name = ai_cn_ability_dict[event];
            console.log("event_name", event_name)
        }

        get_data();     //调用获取数据函数
        setTimeout(function () {
            display_event_list();      //调用显示数据函数
        }, 2000)
    });

});

$('.close2').click(function () {
    $('#video').children('div').hide();
    $(this).hide();
    $('.current_video_title').empty();
})




