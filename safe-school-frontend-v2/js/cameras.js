<<<<<<< HEAD
var cameras = (function () {
    var container = $('.temp');
    var template = {
        canvas: ['<canvas width="320" >', '</canvas>'].join(""),
        li_1: '<li><span class="camera_title">beidou</span></li>',
        img: ['<img width="320px" src="../images/bdlog.png" > '].join(""),
        result: ['<div><li></li></div>'].join(""),
        li_str: ['<li user_data="0">',
            '    <span></span>',
            '    <img width="50" height="50">',
            '    <div class="re_name">',
            '    </div>',
            '    <div class="time">',
            '        <span class="time_t"></span>',
            '        <span class="location"></span>',
            '    </div>',
            '</li>'
        ].join(""),
    };
	
    function updateContent(data) {
        for (var key in data) {
            var item = data[key].did;
            // var id = "camera" + item;
            var img = $(template.img);
            img.attr("id", item);
			let cur_id = img.attr('id');
            img.click(function () {
                //点击图片,播放实时视频流
                var did = $(this).attr('id')
				let click_event = 1;
                show_live(did,click_event);//点击事件多传一个参数，便于区分
                console.log('did' + did);
            });
            container.append($(template.li_1).append(img));
        }
    }
	
	let ids=new Array();	//存放当前窗口所有摄像头ID
	let timer;
	//定义加载摄像头图片函数
	function loadCamerasImg(){
		for(let n in ids){
			$('#'+ids[n]).attr('src','http://192.168.1.120/device_picture/'+ids[n] +'.jpg?' + Math.random());
		}
	}
	
    function getData() {
		refresh_token();
        var uid = getCookie("uid");
        let current_page = 1;
        var host = window.location.host;
        host = 'http://' + host;
        api = '/api/v1/device/list/sixteen_device';	//获取16个摄像头信息
        axios
            .get(host + api, {
				headers:request_header,
                params: {
                    "page_num": current_page
                }
            })
            .then(function (response) {
                updateContent(response.data.result);
                // console.log('摄像头信息', response.data)

                for (let x = 0; x < response.data.result.length; x++) {
                    $('.camera_title').eq(x).html(response.data.result[x].location);
					ids.push(response.data.result[x].did);
                }
                let cameras_num=response.data.result.length;	//当前实际获取的摄像头数量
                let total_page_num = response.data.result[0].total_page_num;	//摄像头分页情况
                if (total_page_num == 1) {
					loadCamerasImg();
					//3秒跟换一次新的摄像头图片
					 timer=setInterval(loadCamerasImg,3000);
					
					//摄像头图片加载失败的默认加载logo图片
					$('.temp').find('img').on('error',function(){
						$(this).attr('src','../images/bdlog.png?' + Math.random());
					})
                    $('.change ').hide();
                    let num = 16 - cameras_num;
					//摄像头不足16个的时候用logo图片填充
                    for (let i = 0; i < num; i++) {		
                        $('.temp').append('<li><img src="../images/bdlog.png"></li>')
                    }

                } else {
                    $('.change').show();	//显示换一批按钮

                }
                $('.change').on('click',function () {
					clearInterval(timer);
					ids.length = 0;
                    current_page++;
                    if(current_page > total_page_num){
                        current_page=1;
                    }

                    axios
                        .get(host + api, {
							headers:request_header,
                            params: {
                                "page_num": current_page
                            }
                        })
                        .then(function (response) {
                            $('.temp').empty();
                            updateContent(response.data.result);
							
                             for (let x = 0; x < response.data.result.length; x++) {
                                 $('.camera_title').eq(x).html(response.data.result[x].location);
								 ids.push(response.data.result[x].did);

                             }
							 loadCamerasImg();
							 timer = setInterval(loadCamerasImg,3000);
							 $('.temp').find('img').on('error',function(){
							 	$(this).attr('src','../images/bdlog.png');
							 })
                        })
                })

                sessionStorage.setItem('response_res', JSON.stringify(response.data.result))

            })
            .catch(function (error) {
                console.log(error);
				console.log('获取摄像头失败')
            });
    }


    function main() {
        getData();
        socket.on('frame', function (msg) {
            value = msg.did;
            $('#' + value).attr('src', 'data:image/jpg;base64,' + msg.data);
        });
    }

    return {
        main: main
    }
=======
var cameras = (function () {
    var container = $('.temp');
    var template = {
        canvas: ['<canvas width="320" >', '</canvas>'].join(""),
        li_1: '<li><span class="camera_title">beidou</span></li>',
        img: ['<img width="320px" src="../images/bdlog.png" > '].join(""),
        result: ['<div><li></li></div>'].join(""),
        li_str: ['<li user_data="0">',
            '    <span></span>',
            '    <img width="50" height="50">',
            '    <div class="re_name">',
            '    </div>',
            '    <div class="time">',
            '        <span class="time_t"></span>',
            '        <span class="location"></span>',
            '    </div>',
            '</li>'
        ].join(""),
    };
	
    function updateContent(data) {
        for (var key in data) {
            var item = data[key].did;
            // var id = "camera" + item;
            var img = $(template.img);
            img.attr("id", item);
			let cur_id = img.attr('id');
            img.click(function () {
                //点击图片,播放实时视频流
                var did = $(this).attr('id')
				let click_event = 1;
                show_live(did,click_event);//点击事件多传一个参数，便于区分
                console.log('did' + did);
            });
            container.append($(template.li_1).append(img));
        }
    }
	
	let ids=new Array();	//存放当前窗口所有摄像头ID
	let timer;
	//定义加载摄像头图片函数
	function loadCamerasImg(){
		for(let n in ids){
			$('#'+ids[n]).attr('src','http://192.168.1.120/device_picture/'+ids[n] +'.jpg?' + Math.random());
		}
	}
	
    function getData() {
		refresh_token();
        var uid = getCookie("uid");
        let current_page = 1;
        var host = window.location.host;
        host = 'http://' + host;
        api = '/api/v1/device/list/sixteen_device';	//获取16个摄像头信息
        axios
            .get(host + api, {
				headers:request_header,
                params: {
                    "page_num": current_page
                }
            })
            .then(function (response) {
                updateContent(response.data.result);
                // console.log('摄像头信息', response.data)

                for (let x = 0; x < response.data.result.length; x++) {
                    $('.camera_title').eq(x).html(response.data.result[x].location);
					ids.push(response.data.result[x].did);
                }
                let cameras_num=response.data.result.length;	//当前实际获取的摄像头数量
                let total_page_num = response.data.result[0].total_page_num;	//摄像头分页情况
                if (total_page_num == 1) {
					loadCamerasImg();
					//3秒跟换一次新的摄像头图片
					 timer=setInterval(loadCamerasImg,3000);
					
					//摄像头图片加载失败的默认加载logo图片
					$('.temp').find('img').on('error',function(){
						$(this).attr('src','../images/bdlog.png?' + Math.random());
					})
                    $('.change ').hide();
                    let num = 16 - cameras_num;
					//摄像头不足16个的时候用logo图片填充
                    for (let i = 0; i < num; i++) {		
                        $('.temp').append('<li><img src="../images/bdlog.png"></li>')
                    }

                } else {
                    $('.change').show();	//显示换一批按钮

                }
                $('.change').on('click',function () {
					clearInterval(timer);
					ids.length = 0;
                    current_page++;
                    if(current_page > total_page_num){
                        current_page=1;
                    }

                    axios
                        .get(host + api, {
							headers:request_header,
                            params: {
                                "page_num": current_page
                            }
                        })
                        .then(function (response) {
                            $('.temp').empty();
                            updateContent(response.data.result);
							
                             for (let x = 0; x < response.data.result.length; x++) {
                                 $('.camera_title').eq(x).html(response.data.result[x].location);
								 ids.push(response.data.result[x].did);

                             }
							 loadCamerasImg();
							 timer = setInterval(loadCamerasImg,3000);
							 $('.temp').find('img').on('error',function(){
							 	$(this).attr('src','../images/bdlog.png');
							 })
                        })
                })

                sessionStorage.setItem('response_res', JSON.stringify(response.data.result))

            })
            .catch(function (error) {
                console.log(error);
				console.log('获取摄像头失败')
            });
    }


    function main() {
        getData();
        socket.on('frame', function (msg) {
            value = msg.did;
            $('#' + value).attr('src', 'data:image/jpg;base64,' + msg.data);
        });
    }

    return {
        main: main
    }
>>>>>>> anhuiyou
})($);