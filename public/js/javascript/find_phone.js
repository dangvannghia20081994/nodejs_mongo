var index = 0;
var length_index = 0;
var captcha = "";
var total = 0;
var total_success = 0;
var arr_datas_chunk = new Array();
$(document).ready(function(){
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
				op:"convert_uid_phone",
				arr_data:string_data,
				captcha :captcha,
			},
			// dataType:"json",
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
		var txt_uid = $("#txt_uid").val();
		if(txt_uid == ""){
			thongbao("Chưa nhập UID cần tìm kiếm");
			return false;
		}
		arr_datas = new Array();
		arr_datas = txt_uid.split("\n");
		if(arr_datas.length == 0){
			thongbao("Chưa nhập UID cần tìm kiếm");
			return false;	
		}
		open_loadding("Đang tìm kiếm số điện thoại");
		total_success = 0;
		index = 0;
		total = arr_datas.length;
		arr_datas_chunk = chunk(2000,arr_datas);
		length_index = arr_datas_chunk.length;
		convert(arr_datas_chunk[index]);
	});
});