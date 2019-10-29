//定义一个刷新token的方法
function refresh_token(){

	// var host = window.location.host;
	// 	host = 'http://' + host;
	// let token_api = '/api/v1/token';//获取token接口
	// let userData = decryption(sessionStorage.getItem('useInfo')); 
	// // console.log('用户信息',userData)
	// let username = userData.split(',')[0];
	// let password = userData.split(',')[1];
	// $.ajax({
	//    xhrFields: {
	// 	   withCredentials: true
	//    },
	//    beforeSend: function (xhr) {
	// 	   xhr.setRequestHeader('Authorization', 'Basic ' + btoa(username +':'+ password));
	//    },
	//    url: host + token_api,
	// success:function(res){
	// 	//判断token是否过期
	// 	if(sessionStorage.getItem('useData') != res.token){
	// 		sessionStorage.setItem('useData',encryption(res.token));
	// 	}
		
	// }
	// })
	
}

//加密方法
function encryption(word){
	 return escape(btoa(word));
}

//解密方法
function decryption(word){
	return atob(unescape(word));
}

//定义请求头
// var request_header = {'Accept': 'application/json','Authorization':'Bearer '+ decryption(sessionStorage.getItem('useData'))}
var request_header = {};