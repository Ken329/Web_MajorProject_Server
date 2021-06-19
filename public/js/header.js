document.getElementById('home').addEventListener('click', function(){
    var id = getId();
    window.open(`/admin_site?user_id=${id}`, "_self");
})
document.getElementById('menu').addEventListener('click', function(){
    var id = getId();
    window.open(`/admin_site_menu?user_id=${id}`, "_self");
})
document.getElementById('generate').addEventListener('click', function(){
    var id = getId();
    window.open(`/admin_site_generate?user_id=${id}`, "_self");
})

function getId(){
    var baseUrl = (window.location).href;
    var user_id = baseUrl.substring(baseUrl.lastIndexOf('=') + 1);  
    return user_id;
}