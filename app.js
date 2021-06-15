const express = require("express");
const expressLayout = require("express-ejs-layouts");
const bodyParser = require("body-parser");
const firebase = require("./public/js/firebase/firebase_info");
const app = express();
const port = 3000;
var uid = 0;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/js', express.static(__dirname + "public/js"));
app.use('/img', express.static(__dirname + "public/img"));

app.use(expressLayout);
app.set('views', './views')
app.set("view engine", "ejs");

app.get('/', (req, res)=>{
    res.render('login-signup', {text: 'Login/Sign Up'});
})

// login Page
app.get('/login', (req, res)=>{
    res.render('partial/small_login');
})
app.get('/login/loginAdmin', (req, res)=>{
    var admin = req.query.admin;
    const fire = firebase.getfireInstance();
    const result = fire.loginAdmin(admin[0], admin[1]);
    result
    .then(function(data){
        if(data === false){
            res.json({ data : false});
        }else{
            uid = data;
            res.json({ data : data });
        }
    })
    .then(error => console.log(error));
})

// sign up page
app.get('/signUp', (req, res)=>{
    res.render('partial/small_signup');
})
app.post('/signup/addAdmin', (req, res)=>{
    var admin = req.query.admin;
    const fire = firebase.getfireInstance();
    const result = fire.addAdmin(admin[0], admin[1], admin[2], admin[3], admin[4], admin[5], admin[6])
    result
    .then(function(data){
        res.json({ result: data })
    })
    .then(error => console.log(error));
})

// admin page
app.get(`/admin_site`, (req, res)=>{
    var id = req.query.user_id;
    if(id === undefined || id === "" || id === null){
        res.send("Something goes wrong, please try to login again");
        return;
    }
    const fire = firebase.getfireInstance();
    const result = fire.findUser(id)
    result
    .then(function(data){
        if(data.length === 0){
            res.send("Something goes wrong, please try to login again");
            return;
        }
        res.render('admin_site');
    })
    .then(error => console.error(error));
})

// get admin info
app.get('/admin_site/admin_info', (req, res)=>{
    var id = req.query.user_id;
    if(id === undefined || id === "" || id === null){
        res.send("Something goes wrong, please try to login again");
        return;
    }
    const fire = firebase.getfireInstance();
    const result = fire.findUser(id)
    result
    .then(function(data){
        if(data.length === 0){
            res.send("Wrong user ID, please check");
            return;
        }
        res.json({ data : data });
    })
    .then(error => console.error(error));
})

// admin update
app.get('/admin_info_edit', (req, res)=>{
    var id = req.query.user_id;
    if(id === undefined || id === "" || id === null){
        res.send("Something goes wrong, please try to login again");
        return;
    }
    const fire = firebase.getfireInstance();
    const result = fire.findUser(id)
    result
    .then(function(data){
        if(data.length === 0){
            res.send("Wrong user ID, please check");
            return;
        }
        res.render('partial/small_admin_edit');
    })
    .then(error => console.error(error));
})
app.put('/admin_info_edit/info_update', (req, res)=>{
    var admin = req.query.admin;
    const fire = firebase.getfireInstance();
    const result = fire.updateAdmin(admin[0], admin[1], admin[2], admin[3], admin[4], admin[5])
    result
    .then(function(data){
        res.json({ result : data });
    })
    .then(error => console.error(error));
})

// admin menu page
app.get('/admin_site_menu', (req, res)=>{
    var id = req.query.user_id;
    if(id === undefined || id === "" || id === null){
        res.send("Something goes wrong, please try to login again");
        return;
    }
    const fire = firebase.getfireInstance();
    const result = fire.findUser(id)
    result
    .then(function(data){
        if(data.length === 0){
            res.send("Something goes wrong, please try to login again");
            return;
        }
        res.render('admin_site_menu');
    })
    .then(error => console.error(error));
})


app.listen(port, () =>{
    console.info(`Listening to port ${port}`);
});