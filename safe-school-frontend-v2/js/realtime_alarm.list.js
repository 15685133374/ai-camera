var realtime_alarm_list = (function() {
    var container = $('.realtime_alarm_list');
    var template = {
        li_str:['<div class="event_info">',
        '<div>',
        '<img src="../images/make.png" />',
        '<i class="event_type">闯入事件</i>',
        '</div>',
        '<div>',
        '<img src="../images/time.png" />',
        '<span class="time event_time">2019-06-04 12:10:12</span>',
        '</div>',
        '<div>',
        '<img src="../images/address.png" />',
        '<span class="event_location">贵阳小学正大门</span>',
        '</div>',
        '</div>'].join(""),
        event_div:[
        '<div>',
            '<div class="event_name" style="color:black"></div>',
            '<div class="event_location" style="color:black"></div>',
            '<div class="event_time" style="color:black"></div>',
            '<div><img class="event_img" /></div>',
        '</div>',
        ].join(""),
    };

   
    function updateContent(data) {
        var event_location=data.location;
        data.ai_result.forEach(e => {
            var ability_result=e.ability_result;
            if(ability_result.result==0){
                return;
            }
            if(e.ai_abilibty=='face_recognition' || e.ai_abilibty=='car_recognition'){
                return;
            }
            var event=$(template.li_str);
            event.find('.event_type').text(e.ai_abilibty);
            event.find('.event_time').text(e.time);
            event.find('.event_location').text(event_location);
            container.prepend(event);
            //modal show
            $('#exampleModa2').modal('show')
            var modal_body=$('#exampleModa2').find('.modal-body')
            var event_div=$(template.event_div)
            event_div.find('.event_name').text(e.ai_abilibty)
            event_div.find('.event_location').text(event_location)
            event_div.find('.event_time').text(e.time)

            var img=event_div.find("img")
            var frame=ability_result.result.frame
            img.attr('src', 'data:image/jpg;base64,' +frame);
            modal_body.append(event_div)
        });
    }

    function main(data) {
        updateContent(data)
    }
    return {
        main: main
    }
})($);