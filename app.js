const express = require("express");
const bodyParser = require("body-parser");
const firebase = require("./firebase/firebase_info");
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
    const result = fire.getMenuByrestaurantId(id);
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
app.post('/cashInRestaurant', (req, res) => {
    const id = req.body.id;
    const amount = req.body.amount;

    const fire = firebase.getfireInstance();
    const result = fire.getRestaurantById(id);
    result
    .then((data) => {
        const total = parseFloat(data[0].user_credit) + parseFloat(amount);
        const cashInResult = fire.updateUserDetail(id, data[0].user_restaurant, data[0].user_cuisine, data[0].user_image, data[0].user_start_time, data[0].user_end_time, total.toFixed(2));
        cashInResult
        .then((data) => res.json({data: true}))
    })
    .then(error => console.log(error));
})
app.post('/takeAwayFromRestaurant', (req, res) => {
    const orderId = req.body.orderId;
    const id = req.body.id;
    const food = req.body.food;
    const amount = req.body.amount;
    const customer = req.body.customer;
    const phone = req.body.phone;
    const type = req.body.type;
    const email = req.body.email;
    const status = req.body.status;
    const method = req.body.method;
    
    const fire = firebase.getfireInstance();
    const result = fire.addNewOrderTakeAway(orderId, id.toString(), food, amount, customer, phone, email, type, status, method);
    result
    .then((data) => res.json({data: data}))
    .then(error => console.log(error));
})
app.post('/dineInFromRestaurant', (req, res) => {
    const orderId = req.body.orderId;
    const id = req.body.id;
    const food = req.body.food;
    const amount = req.body.amount;
    const customer = req.body.customer;
    const tableNo = req.body.table_no;
    const phone = req.body.phone;
    const type = req.body.type;
    const email = req.body.email;
    const status = req.body.status;
    const method = req.body.method;
    
    const fire = firebase.getfireInstance();
    const result = fire.addNewOrderDineIn(orderId, id.toString(), food, amount, customer, tableNo, phone, email, type, status, method);
    result
    .then((data) => res.json({data: data}))
    .then(error => console.log(error));
})
app.post('/insertNewTable', (req, res) => {
    const id = req.body.id;
    const tableId = req.body.tableId;
    const name = req.body.name;
    const phone = req.body.phone;
    const pax = req.body.pax;
    const status = req.body.status;
    const date = req.body.date;

    const fire = firebase.getfireInstance();
    const result = fire.insertNewTable(id, tableId, name, phone, pax, status, date);
    result
    .then(data => res.json({data: data}))
    .then(error => console.log(error));
})
app.post('/trackOrderWithId', (req, res) => {
    const restaurantId = req.body.restaurantId;
    const orderId = req.body.orderId;
    
    const fire = firebase.getfireInstance();
    const result = fire.trackOrderWithId(restaurantId, orderId);
    result
    .then((data) => res.json({data: data}))
    .then(error => console.log(error));
})
app.post('/trackingFoodWithId', (req, res) => {
    const restaurantId = req.body.restaurantId;
    const foodId = req.body.foodId;

    const fire = firebase.getfireInstance();
    const result = fire.trackingFoodWithId(restaurantId, foodId);
    result
    .then((data) => res.json({data: data}))
    .then(error => console.log(error));
})
app.post('/addAdmin', (req, res)=>{
    const email = req.body.email;
    const password = req.body.password;
    const restaurant = req.body.restaurant;
    const cuisine = req.body.cuisine;
    const image = req.body.image;
    const price_range = req.body.priceRange;
    const last_name = req.body.lastName;
    const first_name = req.body.firstName;
    const gender = req.body.gender;
    const state = req.body.state;
    const address = req.body.address;
    const city = req.body.city;
    const postal_code = req.body.postalCode;

    const fire = firebase.getfireInstance();
    const result = fire.addAdmin(email, password, restaurant, cuisine, image, price_range, last_name, first_name, gender, state, 
        address, city, postal_code)
    result
    .then( (data) => {
        res.json({ data: data })
    })
    .then(error => console.log(error));
})
app.post('/login', (req, res)=>{
    var email = req.body.email;
    var password = req.body.password;

    const fire = firebase.getfireInstance();
    const result = fire.loginAdmin(email, password);
    result
    .then( (data) => {
        res.json({ data : data });
    })
    .then(error => console.log(error));
})

// checking user accessibility - admin
app.post('/getUser', (req, res)=>{
    const uid = req.body.uid;

    const fire = firebase.getfireInstance();
    const result = fire.getUser(uid);
    result
    .then( (data) => {
        if(data.length === 0){
            res.json({ success : false });
        }else{
            res.json({ success : true, data : data });
        }
    })
    .then(error => console.log(error));
})
// restaurant ordering api - admin
app.post('/restaurantDineIn', (req, res) => {
    const restaurantId = req.body.id;
    const orderId = req.body.orderId;
    const food = req.body.food;
    const amount = req.body.amount;
    const tableNo = req.body.tableNo;
    const type = req.body.type;
    const status = req.body.status;
    
    const fire = firebase.getfireInstance();
    const result = fire.addRestaurantDineIn(restaurantId, orderId, food, amount, tableNo, type, status);
    result
    .then( (data) => {
        res.json({data: "Order has been made"});
    })
    .then(error => console.log(error));
})
app.post('/restaurantTakeAway', (req, res) => {
    const restaurantId = req.body.id;
    const orderId = req.body.orderId;
    const food = req.body.food;
    const amount = req.body.amount;
    const type = req.body.type;
    const status = req.body.status;
    
    const fire = firebase.getfireInstance();
    const result = fire.addRestaurantTakeAway(restaurantId, orderId, food, amount, type, status);
    result
    .then( (data) => {
        res.json({data: "Order has been made"});
    })
    .then(error => console.log(error));
})
// getting order api - admin
app.post('/getOrderWithIdNDate', (req, res) => {
    const id = req.body.id;

    const fire = firebase.getfireInstance();
    const result = fire.getUser(id);
    result
    .then( (data) => {
        if(data.length === 0){
            res.json({ success : false });
        }else{
            const menuResult = fire.getOrderWithIdNDate(id);
            menuResult
            .then((data) => res.json({ success: true, data: data}))
        }
    })
    .then(error => console.log(error));
})
app.post('/getOrderWithId', (req, res) => {
    const id = req.body.id;

    const fire = firebase.getfireInstance();
    const result = fire.getUser(id);
    result
    .then( (data) => {
        if(data.length === 0){
            res.json({ success : false });
        }else{
            const menuResult = fire.getOrderWithId(id);
            menuResult
            .then((data) => res.json({ success: true, data: data}))
        }
    })
    .then(error => console.log(error));
})
// tracking order api - admin
app.post('/trackOrderWithOrderId', (req, res) => {
    const id = req.body.id;
    const orderId = req.body.orderId;

    const fire = firebase.getfireInstance();
    const result = fire.getUser(id);
    result
    .then( (data) => {
        if(data.length === 0){
            res.json({ success : false });
        }else{
            const result = fire.trackOrderWithId(id, orderId);
            result
            .then((data) => res.json({success: true, data: data}))
        }
    })
    .then(error => console.log(error));
})
// update order api - admin
app.put('/updateOrderStatus', (req, res) => {
    const id = req.body.id;
    const orderId = req.body.orderId;
    const status = req.body.status;

    const fire = firebase.getfireInstance();
    const result = fire.getUser(id);
    result
    .then( (data) => {
        if(data.length === 0){
            res.json({ success : false });
        }else{
            const result = fire.updateOrderDetail(id, orderId, status);
            result
            .then((data) => res.json({success: true, data: data}))
        }
    })
    .then(error => console.log(error));
})
// delete order api - admin
app.post('/deleteOrderData', (req, res) => {
    const id = req.body.id;
    const orderId = req.body.orderId;
    
    const fire = firebase.getfireInstance();
    const result = fire.getUser(id);
    result
    .then( (data) => {
        if(data.length === 0){
            res.json({ success : false });
        }else{
            const menuResult = fire.deleteOrderData(id, orderId);
            menuResult
            .then((data) => res.json({ success: true, data: data}))
        }
    })
    .then(error => console.log(error));
})
// getting table api - admin
app.post('/getTableWithIdNDate', (req, res) => {
    const id = req.body.id;

    const fire = firebase.getfireInstance();
    const result = fire.getUser(id);
    result
    .then( (data) => {
        if(data.length === 0){
            res.json({ success : false });
        }else{
            const result = fire.getTableWithIdNDate(id);
            result
            .then((data) => res.json({success: true, data: data}))
        }
    })
    .then(error => console.log(error));
})
app.post('/getTableWithId', (req, res) => {
    const id = req.body.id;
    
    const fire = firebase.getfireInstance();
    const result = fire.getUser(id);
    result
    .then( (data) => {
        if(data.length === 0){
            res.json({ success : false });
        }else{
            const menuResult = fire.getTableWithId(id);
            menuResult
            .then((data) => res.json({ success: true, data: data}))
        }
    })
    .then(error => console.log(error));
})
// update table api - admin
app.put('/updateTableStatus', (req, res) => {
    const id = req.body.id;
    const tableId = req.body.tableId;
    const status = req.body.status;
    
    const fire = firebase.getfireInstance();
    const result = fire.getUser(id);
    result
    .then( (data) => {
        if(data.length === 0){
            res.json({ success : false });
        }else{
            const result = fire.updateTableStatus(id, tableId, status);
            result
            .then((data) => res.json({success: true, data: data}))
        }
    })
    .then(error => console.log(error));
})
// delete table api - admin
app.post('/deleteTableData', (req, res) => {
    const id = req.body.id;
    const tableId = req.body.tableId;
    
    const fire = firebase.getfireInstance();
    const result = fire.getUser(id);
    result
    .then( (data) => {
        if(data.length === 0){
            res.json({ success : false });
        }else{
            const menuResult = fire.deleteTableData(id, tableId);
            menuResult
            .then((data) => res.json({ success: true, data: data}))
        }
    })
    .then(error => console.log(error));
})
// insert menu api
app.post('/insertNewMenu', (req, res) => {
    const id = req.body.id;
    const menu = req.body.menu;
    
    const fire = firebase.getfireInstance();
    const result = fire.getUser(id);
    result
    .then( (data) => {
        if(data.length === 0){
            res.json({ success : false });
        }else{
            const result = fire.insertNewMenu(id, menu);
            result
            .then((data) => res.json({success: true, data: data}))
        }
    })
    .then(error => console.log(error));
})
// update menu api - admin
app.put('/updateMenuDiscount', (req, res) => {
    const id = req.body.id;
    const menuId = req.body.menuId;
    const discount = req.body.discount;
    
    const fire = firebase.getfireInstance();
    const result = fire.getUser(id);
    result
    .then( (data) => {
        if(data.length === 0){
            res.json({ success : false });
        }else{
            const result = fire.updateMenuDiscount(id, menuId, discount);
            result
            .then((data) => res.json({success: true, data: data}))
        }
    })
    .then(error => console.log(error));
})
app.put('/updateMenuAvailable', (req, res) => {
    const id = req.body.id;
    const menuId = req.body.menuId;
    const available = req.body.available;
    
    const fire = firebase.getfireInstance();
    const result = fire.getUser(id);
    result
    .then( (data) => {
        if(data.length === 0){
            res.json({ success : false });
        }else{
            const result = fire.updateMenuAvailable(id, menuId, available);
            result
            .then((data) => res.json({success: true, data: data}))
        }
    })
    .then(error => console.log(error));
})
app.put('/updateMenuDetail', (req, res) => {
    const id = req.body.id;
    const menuId = req.body.menuId;
    const detail = req.body.detail;
    
    const fire = firebase.getfireInstance();
    const result = fire.getUser(id);
    result
    .then( (data) => {
        if(data.length === 0){
            res.json({ success : false });
        }else{
            const result = fire.updateMenuDetail(id, menuId, detail);
            result
            .then((data) => res.json({success: true, data: data}))
        }
    })
    .then(error => console.log(error));
})
// delete menu api - admin
app.post('/deleteMenuDetail', (req, res) => {
    const id = req.body.id;
    const menuId = req.body.menuId;
    
    const fire = firebase.getfireInstance();
    const result = fire.getUser(id);
    result
    .then( (data) => {
        if(data.length === 0){
            res.json({ success : false });
        }else{
            const result = fire.deleteMenuDetail(id, menuId);
            result
            .then((data) => res.json({success: true, data: data}))
        }
    })
    .then(error => console.log(error));
})



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