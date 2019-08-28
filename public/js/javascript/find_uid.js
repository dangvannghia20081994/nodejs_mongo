var index = 0;
var length_index = 0;
var captcha = "";
var total = 0;
var total_success = 0;
var arr_datas_chunk = new Array();
$(document).ready(function(){
	var phone_new = ["843","845","8470","8479","8477","8476","8478","8483","8484","8485","8481","8482","8459"];
	var phone_old = ["D016","D018","D0120","D0121","D0122","D0126","D0128","D0123","D0124","D0125","D0127","D0129","D019"];
	var phone_rest= "";
	function convert_phone(string){
		phone_rest = phone_rest.replace(string+"\n","");
		phone_rest = phone_rest.replace(string,"");
		string = string.replace(/[+]/g,"");
		string = string.replace(/[.]/g,"");
		string = "D"+string;
		string_new = "";
		dauso = string.substring(0, 4);
		if(dauso == "D016" || dauso == "D018" || dauso == "D019"){

		}
		else{
			dauso = string.substring(0, 5);
		}
		var index_search = phone_old.indexOf(dauso);
		if(index_search >=0){
			string_new = string.replace(phone_old[index_search],phone_new[index_search]);
		}
		else{
			string = string.replace("D0","84");
			string_new = string.replace("D","");
		}

		return string_new;
	}
	function convert(arr_data){
		if(arr_data == undefined){
			$("#progress_success").css("width",Math.round((total_success / total) * 100)+"%");
			$("#show_pecent").html(Math.round((total_success / total) * 100));
			$("#total_success").html(total_success);
			$("#total").html(total);
			close_loadding();
			return false;
		}
		string_data = arr_data.join(",");
		$.ajax({
			url:domain+"Action",
			type:"POST",
			data:{
				_token:_token,
				op:"convert_phone_uid",
				arr_data:string_data,
				captcha :captcha,
			},
		}).done(function(res){
			if(res === "error"){
				thongbao("Số điểm hiện tại của bạn đã hết. Vui lòng liên hệ với bên support để được hỗ trợ");
				close_loadding();
				return false;
			}
			if(res !== ""){
				res = $.parseJSON(res);	
				if(res.length !== ""){
					string_result = "";
					res.forEach(function(element){
						string_result+= element._source.phone+"|"+element._source.uid+"\n";
					});
					if(string_result !=""){
						$("#txt_result").val($("#txt_result").val()+string_result);
					}
				}	
			}
			
			
			tuso = res.length;
			total_success += tuso;
			$("#point_account").html(parseInt($("#point_account").html()) - tuso);
			
			if(index < length_index){
				index++;
				convert(arr_datas_chunk[index]);
			}else{
				$("#progress_success").css("width",Math.round((total_success / total) * 100)+"%");
				$("#show_pecent").html(Math.round((total_success / total) * 100));
				$("#total_success").html(total_success);
				$("#total").html(total);
				close_loadding();
			}
		});
	}
	$("#btn_search").click(function(){
		open_loadding("Đang kiểm tra thông tin");
		var txt_phone = phone_rest = $("#txt_phone").val();
		if(txt_phone == ""){
			thongbao("Chưa nhập số điện thoại cần tìm kiếm");
			return false;
		}
		arr_datas = new Array();
		arr_datas = txt_phone.split("\n");
		arr_datas.forEach(function(element,idx){
			arr_datas[idx] = convert_phone(element);
		});
		
		if(arr_datas.length == 0){
			thongbao("Chưa nhập số điện thoại cần tìm kiếm");
			return false;	
		}
		open_loadding("Đang tìm kiếm UID");
		total_success = 0;
		index = 0;
		total = arr_datas.length;
		arr_datas_chunk = chunk(2000,arr_datas);
		length_index = arr_datas_chunk.length;
		convert(arr_datas_chunk[index]);
	});
});