<<<<<<< HEAD
/*
 * @Description: 实时报警模块,弹出事件直播窗口
 * @Author: your name
 * @Date: 2019-08-30 15:55:57
 * @LastEditTime: 2019-09-09 17:35:50
 * @LastEditors: Please set LastEditors
 */

var realtime_alarm_list = (function() {
    var container = $('.realtime_alarm_list');
    var template = {
        li_str: ['<div class="event_info">',
            '<div>',
            '<img src="../images/unmake.png" />',
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
			'<span class = "event_id">event_id</span>',
            '</div>'
        ].join(""),
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
		// console.log('需要插入的数据___________',data);
        var event_location = data.location;
        var did = data.did;
        var event_container = 1;
		let data_res = data.ai_result;
		
		//过滤的数据之后添加到实时告警栏
		for(let i in data_res){	
			if(data_res[i].ability_result.result == -1 || data_res[i].ai_ability == 'face_recognition' || data_res[i].ai_ability == 'car_recognition'){
				continue;
			}
			
			var event = $(template.li_str);
			if (ai_en_ability_dict[data_res[i].ai_ability]) {
			    event.find('.event_type').text(ai_en_ability_dict[data_res[i].ai_ability]);
			} else {
			    event.find('.event_type').text(data_res[i].ai_ability);
			}
			event.find('.event_time').text(data_res[i].time);
			event.find('.event_location').text(event_location);
			event.find('.video_title').html(event_location);
			event.find('.event_id').html(data_res[i].event_id);
			container.prepend(event);
		}
       
    }

    function main(data) {
        updateContent(data)
    }

    return {
        main: main
    }
=======
/*
 * @Description: 实时报警模块,弹出事件直播窗口
 * @Author: your name
 * @Date: 2019-08-30 15:55:57
 * @LastEditTime: 2019-09-09 17:35:50
 * @LastEditors: Please set LastEditors
 */

var realtime_alarm_list = (function() {
    var container = $('.realtime_alarm_list');
    var template = {
        li_str: ['<div class="event_info">',
            '<div>',
            '<img src="../images/unmake.png" />',
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
			'<span class = "event_id">event_id</span>',
            '</div>'
        ].join(""),
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
		// console.log('需要插入的数据___________',data);
        var event_location = data.location;
        var did = data.did;
        var event_container = 1;
		let data_res = data.ai_result;
		
		//过滤的数据之后添加到实时告警栏
		for(let i in data_res){	
			if(data_res[i].ability_result.result == -1 || data_res[i].ai_ability == 'face_recognition' || data_res[i].ai_ability == 'car_recognition'){
				continue;
			}
			
			var event = $(template.li_str);
			if (ai_en_ability_dict[data_res[i].ai_ability]) {
			    event.find('.event_type').text(ai_en_ability_dict[data_res[i].ai_ability]);
			} else {
			    event.find('.event_type').text(data_res[i].ai_ability);
			}
			event.find('.event_time').text(data_res[i].time);
			event.find('.event_location').text(event_location);
			event.find('.video_title').html(event_location);
			event.find('.event_id').html(data_res[i].event_id);
			container.prepend(event);
		}
       
    }

    function main(data) {
        updateContent(data)
    }

    return {
        main: main
    }
>>>>>>> anhuiyou
})($);