$(document).ready(function(){
	$("#txt_user_name").val("").focus();
	$("#txt_user_password").val("");
	$("#txt_user_name,#txt_user_password").on("keypress",function(e){
		if(e.keyCode == 13){
			$("#btn_login").click();
		}
	});
	$("#btn_login").click(function(){
		$("#thongbao").removeClass().addClass("text-primary").html("Đang kiểm tra thông tin tài khoản");
		var txt_user_name = $("#txt_user_name").val();
		var txt_user_password = $("#txt_user_password").val();
		if(txt_user_name == ""){
			$("#thongbao").removeClass().addClass("text-danger").html("Chưa nhập tên đăng nhập");
			return;
		}
		if(txt_user_password == ""){
			$("#thongbao").removeClass().addClass("text-danger").html("Chưa nhập mật khẩu đăng nhập");
			return;
		}
		$.ajax({
			url:domain+"Login",
			type:"POST",
			data:{
				op:"login",
				_token:_token,
				email:txt_user_name,
				password:txt_user_password,
			},
			dataType:"json",
		}).done(function(data){
			if(data.status){
				$("#thongbao").removeClass().addClass("text-success").html("Đặng nhập thành công","success");
				localStorage.setItem("token", data.token);
				setTimeout(function(){
					location.href = domain;
				},1000);
			}
			else{
				$("#thongbao").removeClass().addClass("text-danger").html(data.message);
			}
		});
	});
});