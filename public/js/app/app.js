function chunk(chunkSize, array) {
  return array.reduce(function(previous, current) {
    var chunk;
    if (previous.length === 0 || 
      previous[previous.length -1].length === chunkSize) {
            chunk = [];   // 1
            previous.push(chunk);   // 2
        }
        else {
            chunk = previous[previous.length -1];   // 3
        }
        chunk.push(current);   // 4
        return previous;   // 5
    }, []);   // 6
}
function creat_ck(id_noidung='ckeditor',height_='',width_='',expan_=true){
  if($('#'+id_noidung).length){
    if(height_ == ''){
      height_='300px';
    }
    if(width_==''){
      width_='100%';
    }
    CKEDITOR.replace(id_noidung,{toolbarStartupExpanded:expan_,height:height_,width:width_});
  }
}
function getdata_ck(id_noidung='ckeditor'){
  if($('#'+id_noidung).length){
    var noidung_ck = CKEDITOR.instances[id_noidung].getData();
    return noidung_ck;
  }
}
function setdata_ck(id_noidung='ckeditor',noidung=''){
  if($('#'+id_noidung).length){
    CKEDITOR.instances[id_noidung].setData(noidung);
  }
}
function active_word_search(string,keyword){
  if(string != "" && keyword != ""){
    string = replaceAll(string,keyword,"<font class='bg-warning'>"+keyword+"</font>");
  }
  return string;
  
}
$("body").on("click",".table img.view_image",function(){
  var src = $(this).attr("src");
  window.open(src,"_blank");
});
function urlify(text) {
  var urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.replace(urlRegex, function(url) {
    return '<a target="_blank" href="' + url + '">' + url + '</a>';
  });
}
function view_profile(uid){
  var url = 'https://www.facebook.com/profile.php?id='+uid;
  window.open(url,"_blank");
}
function view_post(post_id){
  var url = 'https://www.facebook.com/'+post_id;
  window.open(url,"_blank");
}
function escapeRegExp(str) {
  return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}
function replaceAll(str, find, replace) {
  return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}
function check_all(id_check,cl_check){
  cl_check = cl_check || id_check;
  if($("#"+id_check).length){
    $("#"+id_check).prop("checked",false);
    $("#"+id_check).change(function(){
      if(this.checked){
        $("."+cl_check).prop("checked",true);
      }
      else{
        $("."+cl_check).prop("checked",false);
      }
    });
  }
}
var check_yes_no = 0;
function check_yes_or_no(element){
  check_yes_no = 1;
  if(element !==""){
    $(element).click();
    check_yes_no = 0;
  }
}
function thongbao(msg,type){
  type = type || "warning";
  close_loadding();
  var class_color = "bg-"+type;
  $("#modal_thongbao").removeClass("d-none");
  $("#modal_body_thongbao").html(msg);
  $("#modal_body_thongbao").parent().parent().removeClass("bg-success bg-warning").addClass(class_color);
  var i = 1;
  var interval_time_focus = setInterval(function(){
    if(i == 3){
      clearInterval(interval_time_focus);
    }else if(i == 2){
      $("#modal_thongbao").addClass("d-none");

    }
    i++;   
  },1000);
}
function yes_or_no(msg,element){
  open_modal("confirm","",msg,"<i class='fa fa-check'></i>&nbsp;Đồng ý");
  var time_start = 20;
  var interval_time_start = setInterval(function(){
    time_start = time_start - 1;
    if(time_start === 0){
      clearInterval(interval_time_start);
      close_modal("confirm");
    }
    else{
      $("#time_auto_close").html("("+time_start+")");
    }
  },1000);
  $('#btn_modal_confirm').off('click').click(function(){
    close_modal("confirm");
    setTimeout(function(){
      check_yes_or_no(element);
    },200);
  });
  $('#btn_modal_close_confirm').off('click').click(function(){
    clearInterval(interval_time_start);
  });
}
function check_time(number){
  number = parseInt(number);
  if(number < 10){
    string = "0"+number;
  }else{
    string = number;
  }
  return string;
}
function timeConverter(UNIX_timestamp,type){
  type = type || 0;
  if(UNIX_timestamp == 0){
    time = 0;
  }
  else{
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['01','02','03','04','05','06','07','08','09','10','11','12'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = check_time(a.getDate());
    var hours = check_time(a.getHours());
    var minus = check_time(a.getMinutes());
    var seconds = check_time(a.getSeconds());
    if(type == 0){
      var time = date + '/' + month + '/' + year+' '+hours+':'+minus;
    }
    else{
      var time = date + '/' + month + '/' + year+' '+hours+':'+minus+':'+seconds;
    }
  }
  return time;
}
function open_modal(id,title,content,button,id_focus,modal_size){
  id = id || "event";
  title = title || "";
  content = content || "";
  button = button || "Chấp nhận";
  id_focus = id_focus || "";
  modal_size = modal_size || "";
  if(modal_size !==""){
    $("#modal_"+id+ " .modal-dialog").addClass(modal_size); 
  }
  if(title!==""){
    $("#title_modal_"+id).html(title);  
  }
  if(content !==""){
    $("#modal_body_"+id).html(content);
  }
  $("#btn_modal_"+id).show();
  $("#btn_modal_"+id).html(button);
  $("#modal_"+id).modal("show");

  if(id_focus !==""){
    $("#modal_"+id).on('show.bs.modal', function () {
      $(id_focus).focus();
    });
  }
}
function close_modal(id){
  $("#modal_"+id).modal("hide");  
}

function open_loadding(text_loadding){
  text_loadding = text_loadding || "Đang xử lý dữ liệu";
  $("#text_modal_loadding").html(text_loadding);
  $("#modal_loadding_data").removeClass("d-none").addClass("d-block");
}
function close_loadding(){
  $("#modal_loadding_data").removeClass("d-block").addClass("d-none");
}
$(document).ready(function(){
  var href = window.location.href;
  var arr_href = href.split("?");
  href = arr_href[0];
  href = href.replace(/#/g,"");
  href = href.replace(domain,"");
  $(".main-menu .nav-item a").each(function(){
    if($(this).attr("href") === href){
      $(this).parent().addClass("active");
      $(this).attr("href","javascript:");
    }
  });
  $(".main-menu li.active").parents("li.has-sub").addClass("open");
  $(".homepage").click(function(){
    location.href = domain;
    console.log(domain);
  });
  $.ajaxSetup({
    statusCode: {
      404: function() {
        alert( "page not found" );
      },
      500: function(){
        thongbao("Có lỗi xảy ra khi thực hiện thao tác");
        close_loadding();
      }
    }
  });
});