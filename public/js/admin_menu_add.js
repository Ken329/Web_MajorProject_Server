var available = "yes";
var discount = "yes";

document.getElementById("available_y").addEventListener('click',  function(){
    document.getElementById('available_toggle').style.left = "5%";
    available = "yes";
})
document.getElementById("available_n").addEventListener('click',  function(){
    document.getElementById('available_toggle').style.left = "35%";
    available = "no";
})
document.getElementById("discount_y").addEventListener('click',  function(){
    document.getElementById('discount_toggle').style.left = "5%";
    discount = "yes";
})
document.getElementById("discount_n").addEventListener('click',  function(){
    document.getElementById('discount_toggle').style.left = "35%";
    discount = "no";
})

document.getElementById('admin_add_menu').addEventListener('click', function(){
    var baseUrl = (window.location).href;
    var user_id = baseUrl.substring(baseUrl.lastIndexOf('=') + 1);
    var name = getData("food_name");
    var price = getData("food_price");
    var categories = getData("food_categories");
    var image = getData("food_image");
    
    if(checkData(name) && checkData(price) && checkData(categories) && checkData(image)){
        fetch(`/admin_menu_add/put_data?admin=${user_id}&admin=${name}&admin=${price}&admin=${categories}&admin=${image}&admin=${available}&admin=${discount}`, {
            method:"POST"
        })
        .then(res => res.json())
        .then(data => {
            alert(data.result);
            window.close('/admin_menu_add');
        })
    }else{
        alert("All the fields are required");
        window.close('/admin_menu_add');
    }
})

function checkData(data){
    if(data === null || data == undefined || data == ""){
        return false;
    }
    return true;
}
function getData(id){
    return document.getElementById(id).value;
}