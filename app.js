const express = require("express");
const bodyParser = require("body-parser");
const firebase = require("./public/js/firebase/firebase_info");
const cors = require("cors")
const app = express();
const port = process.env.PORT || 4000;
var uid = 0;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
const corsOptions ={
   origin:'*', 
   credentials:true,           
   optionSuccessStatus:200,
}
app.use(cors(corsOptions))

app.get('/', (req, res)=>{
    res.send("Eatsy server is runnning now");
})

// get restaurant menu by id
app.get('/getAllMenuRestaurant', (req, res) => {
    const fire = firebase.getfireInstance();
    const result = fire.getAllMenuRestaurant();
    result
    .then((data) => res.json({data: data}))
    .then(error => console.log(error));
})
app.post('/getRestaurantMenuById', (req, res) => {
    const id = req.body.id;
    
    const fire = firebase.getfireInstance();
    const result = fire.getMenuByrestaurantId(id.toString());
    result
    .then((data) => res.json({data: data}))
    .then(error => console.log(error));
})
app.post('/getRestaurantByCategories', (req, res) => {
    const categories = req.body.categories;
    
    const fire = firebase.getfireInstance();
    const result = fire.getRestaurantByCategories(categories);
    result
    .then((data) => res.json({data: data}))
    .then(error => console.log(error));
})

// login Page
// app.get('/login', (req, res)=>{
//     res.render('partial/small_login');
// })
// app.get('/login/loginAdmin', (req, res)=>{
//     var admin = req.query.admin;
//     const fire = firebase.getfireInstance();
//     const result = fire.loginAdmin(admin[0], admin[1]);
//     result
//     .then(function(data){
//         if(data === false){
//             res.json({ data : false});
//         }else{
//             uid = data;
//             res.json({ data : data });
//         }
//     })
//     .then(error => console.log(error));
// })

// // sign up page
// app.get('/signUp', (req, res)=>{
//     res.render('partial/small_signup');
// })
// app.post('/signup/addAdmin', (req, res)=>{
//     var admin = req.query.admin;
//     const fire = firebase.getfireInstance();
//     const result = fire.addAdmin(admin[0], admin[1], admin[2], admin[3], admin[4], admin[5], admin[6])
//     result
//     .then(function(data){
//         res.json({ result: data })
//     })
//     .then(error => console.log(error));
// })

// // admin page
// app.get(`/admin_site`, (req, res)=>{
//     var id = req.query.user_id;
//     if(id === undefined || id === "" || id === null){
//         res.send("Something goes wrong, please try to login again");
//         return;
//     }
//     const fire = firebase.getfireInstance();
//     const result = fire.findUser(id)
//     result
//     .then(function(data){
//         if(data.length === 0){
//             res.send("Something goes wrong, please try to login again");
//             return;
//         }
//         res.render('admin_site');
//     })
//     .then(error => console.error(error));
// })

// // get admin info
// app.get('/admin_site/admin_info', (req, res)=>{
//     var id = req.query.user_id;
//     if(id === undefined || id === "" || id === null){
//         res.send("Something goes wrong, please try to login again");
//         return;
//     }
//     const fire = firebase.getfireInstance();
//     const result = fire.findUser(id)
//     result
//     .then(function(data){
//         if(data.length === 0){
//             res.send("Wrong user ID, please check");
//             return;
//         }
//         res.json({ data : data });
//     })
//     .then(error => console.error(error));
// })

// // admin update
// app.get('/admin_info_edit', (req, res)=>{
//     var id = req.query.user_id;
//     if(id === undefined || id === "" || id === null){
//         res.send("Something goes wrong, please try to login again");
//         return;
//     }
//     const fire = firebase.getfireInstance();
//     const result = fire.findUser(id)
//     result
//     .then(function(data){
//         if(data.length === 0){
//             res.send("Wrong user ID, please check");
//             return;
//         }
//         res.render('partial/small_admin_edit');
//     })
//     .then(error => console.error(error));
// })
// app.put('/admin_info_edit/info_update', (req, res)=>{
//     var admin = req.query.admin;
//     const fire = firebase.getfireInstance();
//     const result = fire.updateAdmin(admin[0], admin[1], admin[2], admin[3], admin[4], admin[5])
//     result
//     .then(function(data){
//         res.json({ result : data });
//     })
//     .then(error => console.error(error));
// })

// // admin menu page
// app.get('/admin_site_menu', (req, res)=>{
//     var id = req.query.user_id;
//     if(id === undefined || id === "" || id === null){
//         res.send("Something goes wrong, please try to login again");
//         return;
//     }
//     const fire = firebase.getfireInstance();
//     const result = fire.findUser(id)
//     result
//     .then(function(data){
//         if(data.length === 0){
//             res.send("Something goes wrong, please try to login again");
//             return;
//         }
//         res.render('admin_site_menu');
//     })
//     .then(error => console.error(error));
// })

// // admin menu page - get all categories
// app.get('/admin_site_menu/get_data_categories', (req, res)=>{
//     var user_id = req.query.user_id;
//     if(user_id === undefined || user_id === "" || user_id === null){
//         res.send("Something goes wrong, please try to login again");
//         return;
//     }
//     const fire = firebase.getfireInstance();
//     const result = fire.getMenuByCate(user_id)
//     result
//     .then(function(data){
//         res.json({ data : data });
//     })
//     .then(error => console.error(error));
// })

// // admin menu page - add
// app.get('/admin_menu_add', (req, res)=>{
//     var id = req.query.user_id;
//     if(id === undefined || id === "" || id === null){
//         res.send("Something goes wrong, please try to login again");
//         return;
//     }
//     const fire = firebase.getfireInstance();
//     const result = fire.findUser(id)
//     result
//     .then(function(data){
//         if(data.length === 0){
//             res.send("Wrong user ID, please check");
//             return;
//         }
//         res.render('partial/small_admin_menu_add');
//     })
//     .then(error => console.error(error));
// })
// app.post('/admin_menu_add/put_data', (req, res)=>{
//     var admin = req.query.admin;
//     const fire = firebase.getfireInstance();
//     const result = fire.getMenuBySingleId(admin[0], admin[1])
//     result
//     .then(function(data){
//         if(data.length === 0){
//             const result = fire.addMenu(admin[0], admin[1], admin[2], admin[3], admin[4], admin[5], admin[6])
//             result
//             .then(function(data){
//                 res.json({ result: data })
//             })
//             .then(error => console.log(error));
//         }else{
//             res.json({ result: "Food appear in your menu, kindly check!!!"});
//         }
//     })
// })

// // admin menu page - edit
// app.get('/admin_menu_edit', (req, res)=>{
//     var admin = req.query.admin;
//     if(admin[0] === undefined || admin[0] === "" || admin[0] === null){
//         res.send("Something goes wrong, please try to login again");
//         return;
//     }
//     const fire = firebase.getfireInstance();
//     const result = fire.findUser(admin[0])
//     result
//     .then(function(data){
//         if(data.length === 0){
//             res.send("Wrong user ID, please check");
//             return;
//         }
//         res.render('partial/small_admin_menu_edit');
//     })
//     .then(error => console.error(error));
// })
// app.get('/admin_menu_edit/getData', (req, res)=>{
//     var admin = req.query.admin;
//     if(admin[0] === undefined || admin[0] === "" || admin[0] === null){
//         res.send("Something goes wrong, please try to login again");
//         return;
//     }
//     const fire = firebase.getfireInstance();
//     const result = fire.getMenuBySingleId(admin[0], admin[1])
//     result
//     .then(function(data){
//         res.json({ result: data })
//     })
//     .then(error => console.log(error));
// })
// app.put('/admin_menu_edit/updateData', (req, res)=>{
//     var admin = req.query.admin;
//     if(admin[0] === undefined || admin[0] === "" || admin[0] === null){
//         res.send("Something goes wrong, please try to login again");
//         return;
//     }
//     const fire = firebase.getfireInstance();
//     const result = fire.updateMenu(admin[0], admin[1], admin[2], admin[3], admin[4], admin[5], admin[6], admin[7])
//     result
//     .then(function(data){
//         res.json({ result: data })
//     })
//     .then(error => console.log(error));
// })
// app.delete('/admin_menu_edit/deleteData', (req, res)=>{
//     var admin = req.query.admin;
//     if(admin[0] === undefined || admin[0] === "" || admin[0] === null){
//         res.send("Something goes wrong, please try to login again");
//         return;
//     }
//     const fire = firebase.getfireInstance();
//     const result = fire.deleteMenu(admin[0], admin[1])
//     result
//     .then(function(data){
//         res.json({ result: data })
//     })
//     .then(error => console.log(error));
// })

// // admin generate page
// app.get('/admin_site_generate', (req, res)=>{
//     var id = req.query.user_id;
//     if(id === undefined || id === "" || id === null){
//         res.status("Something goes wrong, please try to login again");
//         return;
//     }
//     const fire = firebase.getfireInstance();
//     const result = fire.findUser(id)
//     result
//     .then(function(data){
//         if(data.length === 0){
//             res.send("Wrong user id, kindly check and see");
//             return;
//         }
//         res.render('admin_site_generate');
//     })
//     .then(error => console.error(error));
// })

app.listen(port, () =>{
    console.info(`Listening to port ${port}`);
});