document.getElementById("admin_login").addEventListener("click", function(){
    var username = document.getElementById("admin_username").value;
    var password = document.getElementById("admin_password").value;

    if(username === "admin" && password === "admin"){

    }else{
        alert("Wrong Username or password");
        window.close('/login');
    }
})