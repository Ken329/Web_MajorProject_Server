document.getElementById("admin_login").addEventListener("click", function(){
    var username = document.getElementById("admin_username").value;
    var password = document.getElementById("admin_password").value;

    fetch(`/login/loginAdmin?admin=${username}&admin=${password}`, {
        method: "GET"
    })
    .then(res => res.json())
    .then(data => {
        if(data.data === false){
            alert("Wrong email or password");
            window.close('/login');
        }else{
            alert("Welcome back to Eatsy");
            window.close('/login');
            window.open(`/admin_site?user_id=${data.data}`);
        }
    });
})