var event_updating = (function () {
    var container = $('.realtime_alarm_list');
    var person_container=$('.person_box');
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
            // '<div>',
            //     '<img src="../images/class.png" />',
            //     '<span class="face_info_personclass"></span>',
            // '</div>',
            '<div class="">',
                '<img src="../images/time.png" />',
                '<span class="face_recog_time "></span>',
            '</div>',
            '<div class="">',
                '<img src="../images/address.png" />',
                '<span class="face_recog_location "></span>',
            '</div>',
            '<a href="html/detail.person.html">',
           // '<button type="button" class="text-center detail">详情</button></a>',
            '</li >',
        ].join(""),
    };


function updateContent(data) {
    var event_location = data.location;
    // console.log(data)
    data.ai_result.forEach(e => {
        // console.log(e)
        // console.log(e.ai_ability)
        // console.log(e.ability_result.result)
        if (e.ability_result.result ==-1 ) {
            return;
        }
        var event_class = '.' + e.ai_ability
        var ability_result=e.ability_result;
        // if(ability_result.result==0){
        //     return;
        // }

        $(event_class).text(parseInt($(event_class).text()) + 1)
       
        //updating peoplelist
        if(e.ai_ability=='face_recognition' || e.ai_ability=='car_recognition'){
            var _result=e.ability_result;
            console.log('*********ability_result****************')
            console.log( _result)
            console.log('*************************')
            var _list=_result.result

            if(_list==0){
                console.log('not recognise');
                return;
            }
            // if(_result.code!=0){
            //     console.log(_list)
            //     return;
            // }
            var li_num=person_container.children().length;
            if(li_num>3){
                person_container.children(':last-child').remove();
            }
            var result_time=e.time
            var result_time_array = result_time.split(" ")
            var result_time_str = result_time_array[1] + "<br>" + result_time_array[0]
            _list.forEach( e =>{
                var li_=$(template.li_str)
                li_.find('.face_info_person_name').text(e.name);
                li_.find(".face_info_person_img").attr('src', 'data:image/jpg;base64,' +  e.one_face);
                li_.find(".face_recog_location").text(event_location)
                li_.find(".face_recog_time").html(result_time_str)
                person_container.prepend(li_)
            })
        }
        
        else{
            //updating chart
            chart.series[0].addPoint([event_class, parseInt($(event_class).text())])
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