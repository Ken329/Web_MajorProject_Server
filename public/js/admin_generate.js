document.getElementById("add_table").addEventListener('click', function(){
    
})
document.getElementById('print').addEventListener('click', function(){

})
getadminInfo();

function getadminInfo(){
    var baseUrl = (window.location).href;
    var user_id = baseUrl.substring(baseUrl.lastIndexOf('=') + 1);
    fetch(`/admin_site/admin_info?user_id=${user_id}`,{
        method: 'GET'
    })
    .then(res => res.json())
    .then(data => {
        data.data.forEach((element)=>{
            document.getElementById("restaurant_name").innerHTML = element.user_restaurant;
            getQr(document.getElementById("restaurant"), element.user_id);
        })
    })
}

function getQr(id, data){
    var qrCode = new QRCode(id);
    qrCode.makeCode(data);
}
