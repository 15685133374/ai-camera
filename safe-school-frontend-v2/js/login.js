<<<<<<< HEAD
//点击密码框显示/隐藏 图标，实现相应的效果
   $('.hidepwd').on('click',function(){
   	if($('#password').attr('type') == 'password'){
   		$('#password').attr('type','text');
   		$('.hidepwd').hide();
   		$('.showpwd').show();	
   	}
   });
   
   $('.showpwd').on('click',function(){
   	if($('#password').attr('type') === 'text'){
   		$('#password').attr('type','password');
   		$('.hidepwd').show();
   		$('.showpwd').hide();
   	}
   })
   
   
   $('form').submit(function(){
	   let username=$('#username').val();
	   let password=$('#password').val();
	   var host = window.location.host;
	   	host = 'http://' + host;
	   let token_api = '/api/v1/token';	//获取token接口
	   refresh_token();//刷新token
	   $.ajax({
	       xhrFields: {
	           withCredentials: true
	       },
	       beforeSend: function (xhr) {
	           xhr.setRequestHeader('Authorization', 'Basic ' + btoa(username +':'+ password));
	       },
	       url: host + token_api,
	   	success:function(res){
			sessionStorage.setItem('useData',encryption(res.token));	//缓存加密后的token
			sessionStorage.setItem('useInfo',encryption(username +','+password));	//缓存加密后的用户名+密码，便于更新token
	   	}
		})
		
		
   })
=======
//点击密码框显示/隐藏 图标，实现相应的效果
   $('.hidepwd').on('click',function(){
   	if($('#password').attr('type') == 'password'){
   		$('#password').attr('type','text');
   		$('.hidepwd').hide();
   		$('.showpwd').show();	
   	}
   });
   
   $('.showpwd').on('click',function(){
   	if($('#password').attr('type') === 'text'){
   		$('#password').attr('type','password');
   		$('.hidepwd').show();
   		$('.showpwd').hide();
   	}
   })
   
   
   $('form').submit(function(){
	   let username=$('#username').val();
	   let password=$('#password').val();
	   var host = window.location.host;
	   	host = 'http://' + host;
	   let token_api = '/api/v1/token';	//获取token接口
	   refresh_token();//刷新token
	   $.ajax({
	       xhrFields: {
	           withCredentials: true
	       },
	       beforeSend: function (xhr) {
	           xhr.setRequestHeader('Authorization', 'Basic ' + btoa(username +':'+ password));
	       },
	       url: host + token_api,
	   	success:function(res){
			sessionStorage.setItem('useData',encryption(res.token));	//缓存加密后的token
			sessionStorage.setItem('useInfo',encryption(username +','+password));	//缓存加密后的用户名+密码，便于更新token
	   	}
		})
		
		
   })
>>>>>>> anhuiyou
