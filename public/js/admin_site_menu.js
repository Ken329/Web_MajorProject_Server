var categories = [];

document.getElementById('admin_menu_add').addEventListener('click', function(){
    var baseUrl = (window.location).href;
    var user_id = baseUrl.substring(baseUrl.lastIndexOf('=') + 1);
    window.open(`/admin_menu_add?user_id=${user_id}`, "_blank", "width = 650px, height = 400px");

})

getData("all", "categories");

function getData(command, type){
    var baseUrl = (window.location).href;
    var user_id = baseUrl.substring(baseUrl.lastIndexOf('=') + 1);
    if(type === "categories"){
        fetch(`/admin_site_menu/get_data_categories?admin=${user_id}&admin=${command}`, {
            method:"GET"
        })
        .then(res => res.json())
        .then(data => {
            putData(data.data);
        })
    }else{

    }
}
function putData(data){
    var menu = document.getElementById('menu_list');
    let html = "";
    if(data.length === 0){
        html += "<h2>No Menu Added</h2>"
    }else{
        data.forEach(element => {
            categories.push(element.food_categories);
            html += `<div class="menu-con-div-list">
                        <img src="${element.food_image}" alt="">
                        <div class="div-list-btn">
                            <button>Edit</button>
                            <button>Delete</button>
                        </div>
                        <div class="div-list-div">
                            <p>Name: ${element.food_name}</p>
                            <p>Price: ${element.food_price}</p>
                            <p>Categories: ${element.food_categories}</p>
                            <p>Available: ${element.food_available}</p>
                            <p>Discount: ${element.food_discount}</p>
                        </div>
                    </div>`;
        });
    }
    menu.innerHTML = html;
    putCategories(uniq(categories));
}
function putCategories(data){
    var select = document.getElementById('menu_select');
    let html = "";
    html += `<option value="All">All</option>`;
    for(var i = 0; i < data.length; i++){
        html += `<option value="${data[i]}">${data[i]}</option>`;
    }
}
function uniq(a) {
    var seen = {};
    return a.filter(function(item) {
        return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });
}