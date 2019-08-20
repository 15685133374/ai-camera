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
    "fight_detaction": "打架检测"
};


var realtime_alarm_list = (function () {
    var container = $('.realtime_alarm_list');
    var template = {
        li_str: ['<div class="event_info">',
            '<div>',
            '<img src="../images/make.png" />',
            '<i class="event_type"></i>',
            '</div>',
            '<div>',
            '<img src="../images/time.png" />',
            '<span class="time event_time"></span>',
            '</div>',
            '<div>',
            '<img src="../images/address.png" />',
            '<span class="event_location"></span>',
            '</div>',
            '</div>'].join(""),
        event_div: [
            ' <div class="modal-content">',
            '<div class="modal-header">',
            '<h5 class="modal-title text-danger event_type" id="exampleModalLabel">倒地事件！</h5>',
            '<button type="button" class="close" data-dismiss="modal" aria-label="Close">',
            '<span aria-hidden="true" style="color:black">&times;</span>',
            '</button>',
            '</div>',
            '<div class="modal-body">',
            '<p class="qidong">摄像头直播启动中...</p>',
            '<img width="100%" />',
            '<span class="video_title"></span>',
            '</div>',
            '<div class="modal-footer">',
            '<button type="button" class="btn btn-primary">请处理……</button>',
            '<span class="overtime">20</span><i>s</i>',
            '</div>',
            '</div>',
        ].join(""),
    };


    function updateContent(data) {
        var event_location = data.location;
        var did = data.did;
        var event_container = 1;
        data.ai_result.forEach(e => {
            var ability_result = e.ability_result;
            if (ability_result.result == -1) {
                return;
            }
            if (e.ai_ability == 'face_recognition' || e.ai_ability == 'car_recognition') {
                return;
            }
            var event = $(template.li_str);
            console.log('event',event);
            if(ai_ability_dict[e.ai_ability])
            {
                 event.find('.event_type').text(ai_ability_dict[e.ai_ability]);
            }
            else {
                 event.find('.event_type').text(e.ai_ability);
            }
            event.find('.event_time').text(e.time);
            event.find('.event_location').text(event_location);
            event.find('.video_title').html(event_location)
            container.prepend(event);
            //modal show
            event_container = event_container + 1
            $('#exampleModal1').modal('show')
            var modal_dialog = $('#exampleModal1').find('.modal-dialog')
            var event_id = 'modal-content-' + did

            var len = modal_dialog.find('#' + event_id).length;
            console.log('len', len)
            if (len > 0) {
                return;
            }
            var event_div = $(template.event_div)
            event_div.attr('id', event_id)
            event_div.find('.event_type').text(e.ai_ability)
            event_div.find('.event_location').text(event_location)
            event_div.find('.event_time').text(e.time)
            modal_dialog.append(event_div)
            event_div.find('img').attr('class', 'modal-img-live-' + did)
            var qidong_str = event_div.find('.qidong')
            socket.emit('dolive', {did: did, opt: 1});
            qidong_str.show();
            socket.on(did, function (msg) {
                qidong_str.hide();
                var value = msg.did;
                $('.modal-img-live-' + value).attr('src', 'data:image/jpg;base64,' + msg.data);
            });
            let response_res=sessionStorage.getItem('response_res');
            let d=JSON.parse(response_res);
            console.log(d);
            console.log(did);
            d.forEach(e=>{
                if(did==e.did){
                    console.log(e);
                     $('.video_title').html(e.ip+'<br>'+e.location);
                }
            })
            //弹出层倒计时

        });
    }

    function main(data) {
        updateContent(data)
    }

    return {
        main: main
    }
})($);