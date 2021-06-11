const express = require("express");
const expressLayout = require("express-ejs-layouts");
const bodyParser = require("body-parser");
const firebase = require("./public/js/firebase/firebase_info");
const app = express();
const port = 3000;

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
app.get('/login', (req, res)=>{
    res.render('small_login');
})
app.get('/signUp', (req, res)=>{
    res.render('small_signup');
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

app.listen(port, () =>{
    console.info(`Listening to port ${port}`);
});