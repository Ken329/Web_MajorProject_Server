var select = document.getElementById('menu_select');
var search = document.getElementById('menu_search');
var food_list = [];
var categories = [];

document.getElementById('admin_menu_add').addEventListener('click', function(){
    var baseUrl = (window.location).href;
    var user_id = baseUrl.substring(baseUrl.lastIndexOf('=') + 1);
    window.open(`/admin_menu_add?user_id=${user_id}`, "_blank", "width = 650px, height = 400px");

})
select.onchange = function(){
    putData(select.value, "categories");
}
search.oninput = function(){
    putData(search.value, "search");
}

getData("all", "categories");

function getData(){
    var baseUrl = (window.location).href;
    var user_id = baseUrl.substring(baseUrl.lastIndexOf('=') + 1);
    fetch(`/admin_site_menu/get_data_categories?user_id=${user_id}`, {
        method:"GET"
    })
    .then(res => res.json())
    .then(data => {
        getAllData(data.data);
    })
}
function getAllData(data){
    data.forEach(element => {
        food_list.push(element);
        categories.push(element.food_categories);
    });
    putData("all", "categories");
}
function putData(command, type){
    var menu = document.getElementById('menu_list');
    let html = "";
    if(food_list.length === 0){
        html += "<h2>No Menu Added</h2>"
    }else{
        if(type === "categories"){
            if(command === "all"){
                food_list.forEach(element => {
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
                putCategories(categories);
            }else{
                food_list.forEach(element => {
                    if(element.food_categories === command){
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
                    }
                })
            }
        }else{
            food_list.forEach(element => {
                var name = element.food_name.substring(0, command.length).toLowerCase();
                if(name === command){
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
                }
            })
        }
    }
    menu.innerHTML = html;
}
function putCategories(data){
    data = uniq(data);
    var select = document.getElementById('menu_select');
    let html = "";
    html += `<option value="all">All</option>`;
    for(var i = 0; i < data.length; i++){
        html += `<option value="${data[i]}">${data[i]}</option>`;
    }
    select.innerHTML = html;
}
function uniq(a) {
    var seen = {};
    return a.filter(function(item) {
        return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });
}