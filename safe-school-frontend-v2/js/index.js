/**
 * 主要功能
 * DC
 * 2019-01-28 05:36:16
 */


// 使用uid获取用户的设备数据
// 建立socket链接

//  取得cookie中的uid
function getCookie(cname)
{
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i=0; i<ca.length; i++) 
  {
    var c = ca[i].trim();
    if (c.indexOf(name)==0) return c.substring(name.length,c.length);
  }
  return "";
}

// var uid=getCookie("uid");
// console.log('TCL: uid', uid)

//time
realTime.main();

// 获取用户设备表中的数据
var socket = io.connect();
cameras.main();

socket.on('connect', function() {
  console.log('完成链接建立')
  socket.emit('connect_event', { data: 'connected!' });
})
socket.on('server_response', function(msg) {
  console.log('服务器发来 #' + ': ' + msg.data)
  socket.emit('startvideo', { data: 'startvideo' });
  socket.emit('ai_result', { data: '0' });
});

socket.on('result', function(msg) {
  console.log(msg)
  realtime_alarm_list.main(msg);
  event_updating.main(msg);
  
});


// Result.main();

