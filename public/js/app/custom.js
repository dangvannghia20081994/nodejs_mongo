var internet="online";
window.addEventListener('load', function() {
  function updateOnlineStatus(event) {
    internet = navigator.onLine ? "online" : "offline";
    if(internet == "online"){
      close_loadding();
    }
    else{
      open_loadding("Mất kết nối. Vui lòng kiểm tra đường mạng");
    }
  }
    window.addEventListener('online',  updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
});
var domain = document.domain;
if(domain == "127.0.0.1"){
  domain = "http://"+domain+":8000/";
}
else if(domain == "localhost")
  domain = 'http://'+domain+':3000/';
else{
  domain = "https://"+domain+"/";
}
var _token=$("input[name='_token']").val();
$("#btn_logout").click(function(){
  localStorage.removeItem("token");
  location.href = domain+"logout";
});