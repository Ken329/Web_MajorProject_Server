document.getElementById("admin_signup").addEventListener("click", function(){
    var email = document.getElementById("admin_email").value;
    var password = document.getElementById("admin_password").value;
    var conPass = document.getElementById("admin_con_password").value;
    var restaurant = document.getElementById("admin_restaurant").value;
    var cuisine = document.getElementById("admin_cuisine").value;
    var image = document.getElementById("admin_image").value;
    var start_time = document.getElementById("admin_open_time");
    var end_time = document.getElementById("admin_close_time");
    var startFormat = onTimeChange(start_time);
    var endFormat = onTimeChange(end_time);

    if(checkData(email) && checkData(password) && checkData(conPass) && checkData(restaurant) && checkData(image) && checkData(start_time) && checkData(end_time)){
      if(password === conPass){
        fetch(`/signup/addAdmin?admin=${email}&admin=${password}&admin=${restaurant}&admin=${cuisine}&admin=${image}&admin=${startFormat}&admin=${endFormat}`,{
          method: "POST"
        })
        .then(res => res.json())
        .then(data => {
          alert(data.result);
          window.close('/signUp');
        });
      }else{
        alert("Password is not the same");
        window.close('/signUp');
      }
    }else{
      alert("Do not leave any field empty!!!");
      window.close('/signUp');
    }
})
function checkData(data){
  if(data === null || data === "" || data == undefined){
    return false;
  }
  return true;
}
function onTimeChange(time){
    var timeSplit = time.value.split(':'),
      hours,
      minutes,
      meridian;
    hours = timeSplit[0];
    minutes = timeSplit[1];
    if (hours > 12) {
      meridian = 'PM';
      hours -= 12;
    } else if (hours < 12) {
      meridian = 'AM';
      if (hours == 0) {
        hours = 12;
      }
    } else {
      meridian = 'PM';
    }
    return hours + ':' + minutes + ' ' + meridian;
}