document.getElementById("admin_update").addEventListener('click', function(){
    var restaurant = document.getElementById("admin_restaurant").value;
    var cuisine = document.getElementById("admin_cuisine").value;
    var image = document.getElementById("admin_image").value;
    var start_time = document.getElementById("admin_open_time");
    var end_time = document.getElementById("admin_close_time");
    var startFormat = onTimeChange(start_time);
    var endFormat = onTimeChange(end_time);

    var baseUrl = (window.location).href;
    var user_id = baseUrl.substring(baseUrl.lastIndexOf('=') + 1);

    if(checkData(restaurant) && checkData(image) && checkData(start_time) && checkData(end_time)){
          fetch(`/admin_info_edit/info_update?admin=${user_id}&admin=${restaurant}&admin=${cuisine}&admin=${image}&admin=${startFormat}&admin=${endFormat}`,{
            method: "PUT"
          })
          .then(res => res.json())
          .then(data => {
            alert(data.result);
            window.close('/admin_info_edit');
          });
      }else{
        alert("Do not leave any field empty!!!");
        window.close('/admin_info_edit');
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