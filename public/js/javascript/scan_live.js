var arr_uid = new Array();
var uid_length = 0;
var is_live = 0;
var start  = 0;
var stop = 0;
var access_token = "";
var table = "";
var number=0;
var token_die = 0;
var arr_lasttime = new Array();
var arr_uid_phone = new Array();
var arr_uid_phone_new = new Array();

function add_data(){
	// console.log(arr_uid_phone);
	// return false;
	if(arr_uid_phone.length == 0){
		return false;
	}
	var data = arr_uid_phone.join(",");
	var settings = {
		"async": true,
		"crossDomain": true,
		"url": domain+"api/add_uid_phone",
		"method": "POST",
		"dataType":"json",
		"headers": {
			"content-type": "application/json"
		},
		"processData": false,
		"data": '{"data":"'+data+'"}'
	}
	$.ajax(settings).done(function (response) {
		console.log(response);
	});
}
function extrac_number(string){
	var phone = 0;
	string = string.replace(/[^0-9.]/g, " ");
	string = string.replace(/  /g," ");
	arr_string = string.split(" ");
	if(arr_string.length > 0){
		arr_string.forEach(function(element){
			dauso = element.substring(0, 2);
			if(element.length == 10){
				table = element.substring(0, 3);
				if(dauso !== "00" && parseInt(table) > 0){
					phone = "84"+(parseInt(element)).toString();	
				}
			}else if(element.length == 11){
				if(dauso == "84"){
					table = "0"+element.substring(2, 2);
					phone = element; 
				}
			}
		});
	}
	return phone;
}
function get_number(id,arr_comment){
	var timelast = arr_lasttime[id];
	if(timelast === undefined){
		timelast = 0;
	}
	arr_comment.forEach(function(element){
		created = (new Date(element.created_time)).getTime();
		if(timelast < created){
			timelast = created;
			arr_lasttime[id] = created;
			var extract = extrac_number(element.message);
			if(parseInt(extract) > 0 && table !== ""){
				arr_uid_phone.push(element.from.id+"|||"+extract+"|||"+table);
			}
		}
	});
	// console.log(arr_lasttime);
}
function get_post(uid){
	if(token_die == 1){
		return false;
	}
	var settings = {
		"async": true,
		"crossDomain": true,
		"url": "https://graph.facebook.com/"+uid+"/live_videos?limit=3&fields=status,comments.limit(500){message,from,created_time},id&access_token="+access_token,
		"method": "GET",
		"headers": {
			"content-type": "application/x-www-form-urlencoded",
		},
		"data": {}
	}
	$.ajax(settings).done(function (response) {
		var error = response.error;
		if(error !== undefined){
			thongbao(error.message);
			return false;
		}
		var data = response.data;
		var check = 0;
		data.forEach(function(element){
			if(element.status === "LIVE") {
				is_live++;
				check++;
				if(element.comments.data !== undefined){
					get_number(element.object_id,element.comments.data);
				}
			}
		});
		if(check > 0){
			arr_uid_phone_new.push(uid);
		}
		start ++;
		if(start < uid_length){
			get_post(arr_uid[start]);
		}else{
			if(is_live == 0){
				thongbao("Không có người nào đang livestream");
				$("#btn_stop").click();
			}else{
				$("#number_post_live").html(is_live);
				string_new = arr_uid_phone_new.join("\n");
				$("#txt_uid").val(string_new);
				localStorage.setItem('txt_uid', string_new);
				add_data();
				scan_phone();
			}
		}
	});
}
function scan_phone(){
	token_die = 0;
	is_live = 0;
	start = 0;
	arr_uid_phone = new Array();
	arr_uid_phone_new = new Array();
	if(stop == 0){
		get_post(arr_uid[start]);	
	}
}
$(document).ready(function(){
	var txt_uid_ = localStorage.getItem('txt_uid');
	if(txt_uid_ == null){
		txt_uid_ = "";
	}
	$("#txt_uid").val(txt_uid_);
	var txt_token_ = localStorage.getItem('txt_token');
	if(txt_token_ == null){
		txt_token_ = "";
	}
	$("#txt_token").val(txt_token_);
	$("#btn_start").click(function(){
		stop = 0;
		var txt_uid = $("#txt_uid").val();
		if(txt_uid == ""){
			return false;
		}
		
		arr_uid = txt_uid.split('\n');
		uid_length = arr_uid.length;
		if(uid_length == 0){
			thongbao("Chưa nhập UID cần quét Live");
			return false;	
		}
		access_token = $("#txt_token").val();
		if(access_token == ""){
			thongbao("Chưa nhập access token");
			return false;
		}
		localStorage.setItem('txt_uid', txt_uid);
		localStorage.setItem('txt_token', access_token);
		$(this).addClass("hidden");
		$("#btn_stop").removeClass("hidden");
		scan_phone();
	});
	$("#btn_stop").click(function(e){
		stop =1;
		$(this).addClass("hidden");
		$("#btn_start").removeClass("hidden");
	});
	$.ajaxSetup({
	    statusCode: {
			400: function() {
				token_die = 1;
				// thongbao("Token die. Cần thay token khác");
				// localStorage.setItem('txt_token', "");
				// $("#txt_token").val("");
				$("#btn_stop").click();
			},
	    }
	  });
});