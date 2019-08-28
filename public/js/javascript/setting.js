var table_element = 'table_list_user';
$(document).ready(function(){
	check_all(table_element+"_checkbox");
	var table = $("#"+table_element).DataTable({
		select:false,
		processing: true,
		serverSide: true,
		ajax: {
			url: domain+"Setting",
			type: "POST",
			data:{
				op:"get_list_account",
				_token:_token,
			},
		},
		columns: [
		{ data: 'checkbox',className: 'text-center'},
		{ data: 'email'},
		{ data: 'status',className:"text-center"},
		{ data: 'createtion_time' ,className: 'text-center'},
		{ data: 'action',className: 'text-center' },
		],
	});

	$('#'+table_element).on( 'draw.dt', function () {
		open_loadding("Đang tải dữ liệu...");
	});
	$('#'+table_element).on('processing.dt', function (e, settings, processing) {
		if (processing) {
			open_loadding("Đang tải dữ liệu...");
		} else {
			close_loadding();
			$("#"+table_element+"_checkbox").prop("checked",false);
		}
	});
	table.responsive.recalc();
	$("#"+table_element+"_filter").addClass("hidden");
	table.columns().every(function () {
		var table = this;
		var timeout = null;
		$('.column_search', this.header()).on('keyup change', function () {
			clearTimeout(timeout);
			timeout = setTimeout(function() {
				if (table.search() !== $('.column_search', table.header()).val()) {
					table.search($('.column_search', table.header()).val()).draw();
				}	
			}, 1500);
		});
	});
	$("body").on("click","#"+table_element+" .btn_lock_unlock .fa-lock",function(){
		var data = table.row($(this).parents('tr')).data();
		$.ajax({
			url:domain+"Setting",
			type:'POST',
			data:{
				op:"lock_unlock",
				_token:_token,
				source:data,
				lock:1,
			},
			success:function(){
				table.ajax.reload( null, false );
			}
		});
	});
	$("body").on("click","#"+table_element+" .btn_lock_unlock .fa-unlock",function(){
		var data = table.row($(this).parents('tr')).data();
		$.ajax({
			url:domain+"Setting",
			type:'POST',
			data:{
				op:"lock_unlock",
				_token:_token,
				source:data,
				lock:0,
			},
			success:function(){
				table.ajax.reload( null, false );
			}
		});
	});
	$("body").on("click","#"+table_element+" .btn_reset",function(){
		var data = table.row($(this).parents('tr')).data();
		var arr_user = [data.id];
		$.ajax({
			url:domain+"Setting",
			type:'POST',
			data:{
				op:"reset_account",
				_token:_token,
				arr_user:arr_user,
			},
			success:function(){
				thongbao("Đã reset mật khẩu thành \"123456\"","success");
				table.ajax.reload( null, false );
			}
		});
	});
	
	$("body").on("click","#"+table_element+" .btn_delete",function(){
		var data = table.row($(this).parents('tr')).data();
		if(check_yes_no == 0){
			yes_or_no("Bạn có muốn xóa tài khoản <b>\""+data.email+"\"</b> không?<br>Tất cả dữ liệu liên quan sẽ bị xóa.",this);
			return false;
		}
		$.ajax({
			url:domain+"Setting",
			type:'POST',
			data:{
				op:"delete_account",
				_token:_token,
				source:data,
			},
			success:function(){
				table.ajax.reload( null, false );
			}
		});
	});
	$("#delete_all").click(function(event){
		var arr_user = new Array();
		$("input.table_list_user_checkbox:checkbox:checked").each(function(){
			arr_user.push($(this).val());
		});
		if(arr_user.length == 0){
			thongbao("Chưa chọn tài khoản cần xóa");
			return;
		}
		if(check_yes_no == 0){
			yes_or_no("Bạn có muốn xóa <b>\""+arr_user.length+"\"</b> tài khoản đã chọn không?",this);
			return false;
		}
		$.ajax({
			url:domain+"Setting",
			type:"POST",
			data:{
				op:"delete_all",
				_token:_token,
				arr_user:arr_user
			},
		}).done(function(){
			table.ajax.reload( null, false );
		});
	});
	$("#lock_all").click(function(event){
		var arr_user = new Array();
		$("input.table_list_user_checkbox:checkbox:checked").each(function(){
			arr_user.push($(this).val());
		});
		if(arr_user.length == 0){
			thongbao("Chưa chọn tài khoản cần khóa");
			return;
		}
		if(check_yes_no == 0){
			yes_or_no("Bạn có muốn khóa <b>\""+arr_user.length+"\"</b> tài khoản đã chọn không?",this);
			return false;
		}
		$.ajax({
			url:domain+"Setting",
			type:"POST",
			data:{
				op:"lock_unlock_all",
				_token:_token,
				arr_user:arr_user,
				type:1,
			},
		}).done(function(){
			table.ajax.reload( null, false );
		});
	});
	$("#unlock_all").click(function(event){
		var arr_user = new Array();
		$("input.table_list_user_checkbox:checkbox:checked").each(function(){
			arr_user.push($(this).val());
		});
		if(arr_user.length == 0){
			thongbao("Chưa chọn tài khoản cần mở khóa");
			return;
		}
		if(check_yes_no == 0){
			yes_or_no("Bạn có muốn mở khóa <b>\""+arr_user.length+"\"</b> tài khoản đã chọn không?",this);
			return false;
		}
		$.ajax({
			url:domain+"Setting",
			type:"POST",
			data:{
				op:"lock_unlock_all",
				_token:_token,
				arr_user:arr_user,
				type:0,
			},
		}).done(function(){
			table.ajax.reload( null, false );
		});
	});
	$("#reset_all").click(function(event){
		var arr_user = new Array();
		$("input.table_list_user_checkbox:checkbox:checked").each(function(){
			arr_user.push($(this).val());
		});
		if(arr_user.length == 0){
			thongbao("Chưa chọn tài khoản cần reset mật khẩu");
			return;
		}
		if(check_yes_no == 0){
			yes_or_no("Bạn có muốn reset mật khẩu <b>\""+arr_user.length+"\"</b> tài khoản đã chọn không?",this);
			return false;
		}
		$.ajax({
			url:domain+"Setting",
			type:"POST",
			data:{
				op:"reset_account",
				_token:_token,
				arr_user:arr_user,
			},
			success:function(){
				thongbao("Đã reset mật khẩu thành \"123456\"","success");
				table.ajax.reload( null, false );
			}
		});
	});
	$("#btn_update_setting").click(function(){
		open_loadding("Đang cập nhật cài đặt hệ thống");
		var register = $("input.register:checked").val();
		var download = $("input.download:checked").val();
		var download_image = $("input.download_image:checked").val();
		var download_video = $("input.download_video:checked").val();

		$.ajax({
			url:domain+"Setting",
			type:"POST",
			data:{
				op:"update_setting",
				_token:_token,
				register:register,
				download:download,
				download_image:download_image,
				download_video:download_video,
			},
		}).done(function(data){
			if(data == "ok"){
				thongbao("Cập nhật cài đặt thảnh công","success");
			}
			else{
				thongbao(data);
			}
		});
	});
	$("#btn_register_account").click(function(){
		open_loadding("Đang thêm mới tài khoản");
		var txt_email_register = $("#txt_email_register").val();
		var password = "123456";
		if(txt_email_register == ""){
			thongbao("Chưa nhập email cần tạo tài khoản");
			return false;
		}
		$.ajax({
			url:domain+"Login",
			type:"POST",
			data:{
				op:"register",
				_token:_token,
				email:txt_email_register,
				password:password,
				repassword:password,
				type:1,
			},
		}).done(function(data){
			if(data === "ok"){
				thongbao("Tạo tài khoản thành công.","success");
				table.ajax.reload( null, false );
			}
			else{
				thongbao(data);
			}
		});
	});
});