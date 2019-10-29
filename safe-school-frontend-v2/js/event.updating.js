/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-03 18:01:29
 * @LastEditTime: 2019-09-04 18:46:48
 * @LastEditors: Please set LastEditors
 */

var event_updating = (function() {
    var container = $('.realtime_alarm_list');
    var person_container = $('.recognition');
    var template = {
        li_str: [
            "<li>",
            '<div class="personal">',
            '<div class="headphoto">',
            '<img class="face_info_person_img" src="" />',
            '</div>',
            '</div>',
            '<div>',
            '<img src="../images/head.png" />',
            '<span class="name face_info_person_name "></span>',
            '</div>',
            '<div>',
                '<img src="../images/class.png" />',
                '<span class="face_info_personclass">暂无信息</span>',
            '</div>',
            '<div class="">',
            '<img class="do_flag_type" src="../images/time.png" />',
            '<span class="face_recog_time "></span>',
            '</div>',
            '<div class="">',
            '<img src="../images/address.png" />',
            '<span class="face_recog_location "></span>',
            '</div>',
            '<a href="html/detail.person.html">',
            '</li >',
        ].join(""),
    };


    function updateContent(data) {
        var event_location = data.location;
		let data_cur = data.ai_result;
		for(let x in data_cur){
			if (data_cur[x].ability_result.result == -1) {
			    return;
			}
			var event_class = '.' + data_cur[x].ai_ability
			var ability_result = data_cur[x].ability_result;
			$(event_class).text(parseInt($(event_class).text()) + 1);
			if (data_cur[x].ai_ability == 'face_recognition' || data_cur[x].ai_ability == 'car_recognition') {
			    var _result = data_cur[x].ability_result;
			    // console.log(_result)
			    var _list = _result.result
			
			    if (_list == 0) {
			        // console.log('not recognise');
			        return;
			    }
			
			    if (person_container.children('li').length > 3) {
			        person_container.children(':last-child').remove();
			    }
			    var result_time = data_cur[x].time
				for(let i in _list){
					var li_ = $(template.li_str)
					li_.find('.face_info_person_name').text(_list[i].name);
					li_.find(".face_info_person_img").attr('src', 'data:image/jpg;base64,' + _list[i].one_face);
					li_.find(".face_recog_location").text(event_location);
					li_.find(".face_recog_time").html(result_time);
					person_container.prepend(li_);
				}
			} else {
				//把事件数据添加到图表中，下面的option来源于echarts_set.js文件
			    switch (data_cur[x].ai_ability) {
			        case 'behavior_seekhelp':
			            ++option.series[0].data[6];
			            break;
			        case 'behavior_climb':
			            ++option.series[1].data[6];
			            break;
			        case 'behavior_climbhigh':
			            ++option.series[2].data[6];
			            break;
			        case 'area_Intrusion':
			            ++option.series[3].data[6];
			            break;
			        case 'fire_detaction':
			            ++option.series[4].data[6];
			            break;
			        case 'crowd_detaction':
			            ++option.series[5].data[6];
			            break;
			        case 'behavior_fall':
			            ++option.series[6].data[6];
			            break;
			        case 'area_leave_post':
			            ++option.series[7].data[6];
			            break;
			    }
			    myChart.setOption(option);
			
				if(container.children('.event_info').length>6){
					container.children('.event_info:last-child').remove();
			    }
			}
		}
    }

    function main(data) {
        updateContent(data)
    }
    return {
        main: main
    }
})($);