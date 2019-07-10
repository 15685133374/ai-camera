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

// 获取用户设备表中的数据
var socket = io.connect();
cameras.main();
// Result.main();

