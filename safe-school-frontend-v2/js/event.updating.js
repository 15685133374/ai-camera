var event_updating = (function() {
    var container = $('.realtime_alarm_list');
    var template = {};

   
    function updateContent(data) {
        var event_location=data.did;
        data.ai_result.forEach(e => {
            if(!e.ability_result){
               return;
            }
            var event_class='.'+e.ai_abilibty
            $(event_class).text(parseInt($(event_class).text())+1)
            //updating chart
            chart.series[0].addPoint([event_class,parseInt($(event_class).text())])
        });
    }

    function main(data) {
        updateContent(data)
    }
    return {
        main: main
    }
})($);