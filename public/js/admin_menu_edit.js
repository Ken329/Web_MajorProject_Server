var available = "yes";
var discount = "yes";

window.onunload = function(){
    window.opener.location.reload();
};
document.getElementById("available_y").addEventListener('click',  function(){
    availableToggle(true);
})
document.getElementById("available_n").addEventListener('click',  function(){
    availableToggle(false);
})
document.getElementById("discount_y").addEventListener('click',  function(){
    discountToggle(true);
})
document.getElementById("discount_n").addEventListener('click',  function(){
    discountToggle(false);
})
document.getElementById('admin_update_menu').addEventListener('click', function(){
    var param = getParameter();
    var name = document.getElementById('food_name').value;
    var price = document.getElementById('food_price').value;
    var categories = document.getElementById('food_categories').value;
    var image = document.getElementById('food_image').value;
    
    if(checkData(name) && checkData(price) && checkData(categories) && checkData(image)){
        fetch(`/admin_menu_edit/updateData?admin=${param[0].Value}&admin=${param[1].Value}&admin=${name}&admin=${price}&admin=${categories}&admin=${image}&admin=${available}&admin=${discount}`, {
            method: "PUT"
        })
        .then(res => res.json())
        .then(data => {
            alert(data.result);
            window.close('/admin_menu_edit');
        })
    }else{
        alert("All the fields are required");
        window.close('/admin_menu_edit');
    }
})

getData();

function getData(){
    var param = getParameter();
    fetch(`/admin_menu_edit/getData?admin=${param[0].Value}&admin=${param[1].Value}`, {
        method: "GET"
    })
    .then(res => res.json())
    .then(data => {
        putData(data.result);
    })
}
function putData(data){
    document.getElementById('food_name').value = data[0].food_name;
    document.getElementById('food_price').value = data[0].food_price;
    document.getElementById('food_categories').value = data[0].food_categories;
    document.getElementById('food_image').value = data[0].food_image;
    if(data[0].food_available === "yes"){
        availableToggle(true);
    }else{
        availableToggle(false);
    }
    if(data[0].food_discount === "yes"){
        discountToggle(true);
    }else{
        discountToggle(false);
    }
}
function availableToggle(check){
    if(check){
        document.getElementById('available_toggle').style.left = "5%";
        available = "yes";
    }else{
        document.getElementById('available_toggle').style.left = "35%";
        available = "no";
    }
}
function discountToggle(check){
    if(check){
        document.getElementById('discount_toggle').style.left = "5%";
        discount = "yes";
    }else{
        document.getElementById('discount_toggle').style.left = "35%";
        discount = "no";
    }
}
function getParameter(){
    var url = (window.location).href;
    var splitParametersFromUrl = url.split('?');
    var spliteParameters = splitParametersFromUrl[1].split('&');

    var param = function (name, value) {
        this.Name = name,
        this.Value = value
    }
    var result = new Array();
    for (var i = 0; i < spliteParameters.length; i++) {
        var item = spliteParameters[i].split('=');
        var itemParam = new param(item[0], item[1]);
        result.push(itemParam);
    }

    return result;
}
function checkData(data){
    if(data === null || data == undefined || data == ""){
        return false;
    }
    return true;
}