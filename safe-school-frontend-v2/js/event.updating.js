var event_updating = (function () {
    var container = $('.realtime_alarm_list');
    var person_container=$('.person_box');
    var template = {
        li_str: [
            "<li>",
            '<div class="personal">',
                // '<div class="imgborder">',
                    // '<div class="headphoto">',
                        '<img class="face_info_person_img" src="../images/headphoto.jpg" />',
                    // '</div>',
                // '</div>',
            '</div>',
            '<div>',
                '<img src="../images/head.png" />',
                '<span class="name face_info_person_name">狗蛋</span>',
            '</div>',
            '<div>',
                '<img src="../images/class.png" />',
                '<span class="face_info_personclass">六年级一班</span>',
            '</div>',
            '<div>',
                '<img src="../images/time.png" />',
                '<span class="face_recog_time">2019.01.10 10:10:10</span>',
            '</div>',
            '<div>',
                '<img src="../images/address.png" />',
                '<span class="face_recog_location">贵阳小学正大门</span>',
            '</div>',
            '</li >',
        ].join(""),
    };


function updateContent(data) {
    var event_location = data.did;
    data.ai_result.forEach(e => {
        if (!e.ability_result) {
            return;
        }
        var event_class = '.' + e.ai_abilibty
        $(event_class).text(parseInt($(event_class).text()) + 1)
        //updating chart
        chart.series[0].addPoint([event_class, parseInt($(event_class).text())])
        //updating peoplelist
        if(e.ai_abilibty=='face_recognition'){
            console.log(e.ability_result)
            var face_result=e.ability_result
            if(face_result.code!=0){
                console.log(face_result.result)
                return;
            }
            var t=e.time
            var face_list=face_result.result
            face_list.forEach( e =>{
                var li_=$(template.li_str)
                li_.find('.face_info_person_name').text(e.predict);
                li_.find(".face_info_person_img").attr('src', 'data:image/jpg;base64,' +  e.face);
                li_.find(".face_recog_location").text(event_location)
                person_container.prepend(li_)
            })
            
        }
    });
}

function main(data) {
    updateContent(data)
}
return {
    main: main
}
}) ($);