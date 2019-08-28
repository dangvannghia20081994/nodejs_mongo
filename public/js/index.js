var socket = io.connect();
var username = localStorage.getItem("username");
var token = localStorage.getItem("token");
if(username == "" || username == null || username == "null"){
    var user = prompt('Xin chào! Hãy nhập tên của bạn để tiếp tục');
    if(user != "" && user != null){
        socket.emit("add_user",user);
    }else{
        location.reload();
    }
}
else{
    socket.emit("add_user",username);
}
socket.on("return_data",function(data){
    localStorage.setItem("token",data._id);
    localStorage.setItem("username",data.name);
    $("#info_user").addClass("text-primary").html("Xin chào: "+data.name);
});
socket.on("get_list_user",function(data){
    $("#total_online").html("Đang có "+data.length+" online");
    $("#list_user").html("");
    data.forEach(element => {
        if(element !== username){
            $("#list_user").append("<div>"+element+" đang online</div>");
        }
    });
});
socket.on("get_list_room",function(data){
    $("#list_room").html("");
    if(data.length > 0){
        data.forEach(function(element){
            $("#list_room").append("<div class='room' room='"+element+"'>"+element+"</div>");
        });
        console.log(data);
    }
    else{
        alert("full");
    }
});
$("body").on("click",".room",function(){
    room = $(this).attr("room");
    socket.emit("join_room",room);
});