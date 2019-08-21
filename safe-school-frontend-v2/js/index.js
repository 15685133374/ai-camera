/**
 * 主要功能
 * DC
 * 2019-01-28 05:36:16
 */


// 使用uid获取用户的设备数据
// 建立socket链接

//  取得cookie中的uid
function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i].trim();
    if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
  }
  return "";
}

function overtime() {
  // console.log(eventid)
  // return;
  // var overtime = $('#' + eventid).find('.overtime')
  var overtime = $('.overtime');

  let num = overtime.length;
  for (var i = 0; i < num; i++) {
    var endtime = overtime.eq(i).html();
    if (endtime > 0) {
      endtime--;
      overtime.eq(i).html(endtime);
    } else {
      var span_time = overtime.eq(i);
      var content = span_time.parents(".modal-content");

      var dialog = $('#exampleModal1').find('.modal-dialog')
      // console.log(dialog)
      var event_num = dialog.children().length
      // // console.log(event_num)
      if (event_num < 2) {
        // console.log('close modal')
        $('#exampleModal1').modal('hide')
      }
      var img=dialog.find('img')
      img.attr('src', '')
      var s_id = img.attr('class')
      var did = s_id.slice("modal-img-live-".length)
      socket.off(did) //停止对当前cam的直播
      socket.emit('dolive', { did: did, opt: 0 });
      console.log("关闭直播")
      content.remove()
			
    }
  }
}
setInterval(function () {
  // overtime(event_id,timer)
  overtime()
}, 1000);


// var uid=getCookie("uid");
// console.log('TCL: uid', uid)

//time
realTime.main();

// 获取用户设备表中的数据
var socket = io.connect();
cameras.main();

socket.on('connect', function () {
  console.log('完成链接建立')
  socket.emit('connect_event', { data: 'connected!' });
})
socket.on('server_response', function (msg) {
  console.log('服务器发来 #' + ': ' + msg.data)
  socket.emit('startvideo', { data: 'startvideo' });
  socket.emit('ai_result', { data: '0' });
});

socket.on('result', function (msg) {
  // console.log(msg)
  realtime_alarm_list.main(msg);
  event_updating.main(msg);

});


// Result.main();

$('.list').on('click','p',function () {
  let click_key=$(this).text();
  console.log(click_key);
  sessionStorage.setItem('click_key',click_key);
  window.location.href='/event';
  // alert('000');
})

var host = window.location.host;
	host = 'http://' + host;
	let event_count_api='/api/v1/waring/list/cur_day';
$.ajax({
	url:host + event_count_api,
	type:'get',
	dataType:'json',
	success:function (res) {
		console.log('当天事件统计',res.data);
		$('.behavior_seekhelp').text(res.data.behavior_seekhelp);
		$('behavior_climb').text(res.data.behavior_climb);
		$('.behavior_climbhigh').text(res.data.behavior_climbhigh);
		$('.area_Intrusion').text(res.data.area_Intrusion);
		$('.fire_detaction').text(res.data.fire_detaction);
		$('.crowd_detaction').text(res.data.crowd_detaction);
		$('.behavior_fall').text(res.data.behavior_fall);
		$('.area_leave_post').text(res.data.area_leave_post);
	},
})




