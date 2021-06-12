getData();

function getData(){
    var baseUrl = (window.location).href;
    var user_id = baseUrl.substring(baseUrl.lastIndexOf('=') + 1);
    fetch(`/admin_site/admin_info?user_id=${user_id}`,{
        method:"GET"
    })
    .then(res => res.json())
    .then(data => {
        var myData = data.data;
        myData.forEach(docs =>{
            document.getElementById('admin_id').innerHTML = docs.user_id;
            document.getElementById('admin_name').innerHTML = docs.user_restaurant;
            document.getElementById('admin_cuisine').innerHTML = docs.user_cuisine;
            document.getElementById('admin_hour').innerHTML = docs.user_start_time + " to " + docs.user_end_time;
            document.getElementById('admin_image').src = docs.user_image;
        })
    });
}
document.getElementById('admin_logout').addEventListener('click', function(){
    window.open('/', "_self");
})
document.getElementById('admin_edit').addEventListener("click", function(){
    
})