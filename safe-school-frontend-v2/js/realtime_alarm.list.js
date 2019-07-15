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
    };

   
    function updateContent(data) {
        var event_location=data.did;
        data.ai_result.forEach(e => {
            if(!e.ability_result){
               return;
            }
            var event=$(template.li_str);
            event.find('.event_type').text(e.ai_abilibty);
            event.find('.event_time').text(e.time);
            event.find('.event_location').text(event_location);
            container.prepend(event);
        });
    }

    function main(data) {
        updateContent(data)
    }
    return {
        main: main
    }
})($);