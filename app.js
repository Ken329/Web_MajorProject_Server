const express = require("express");
const bodyParser = require("body-parser");
const firebase = require("./firebase/firebase_info");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 4000;
const nodemailer = require("nodemailer");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: "https://eatsy.netlify.app/" }));

app.get("/", (req, res) => {
  res.send("Eatsy server is runnning now");
});

let transporter = nodemailer.createTransport({
  service: "hotmail",
  auth: {
    user: "Eatsy_Order@outlook.com",
    pass: "kahsoon123",
  },
});

// get restaurant menu by id
app.post("/getRestaurantById", (req, res) => {
  const id = req.body.id;

  const fire = firebase.getfireInstance();
  const result = fire.getRestaurantByIdCustomer(id);
  result.then((data) => res.json(data)).then((error) => console.log(error));
});
app.post("/getRestaurantMenuById", (req, res) => {
  const id = req.body.id;

  const fire = firebase.getfireInstance();
  const result = fire.getMenuByrestaurantId(id);
  result
    .then((data) => res.json({ data: data }))
    .then((error) => console.log(error));
});
app.post("/takeAwayFromRestaurant", (req, res) => {
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
  const result = fire.addNewOrderTakeAway(
    orderId,
    id.toString(),
    food,
    amount,
    customer,
    phone,
    email,
    type,
    status,
    method
  );
  result
    .then((data) => {
      if (data) {
        transporter
          .sendMail({
            from: "Eatsy_Order@outlook.com",
            to: email,
            subject: "Order has been confirmed",
            html: `<p>Hi ${customer}, </p><br>
                <p>Thank you for using Eatsy Food Ordering Services! We've successfully recieved you payment amount RM${amount}.</p><br>
                <p>You can check your order with this link right here https://eatsy.netlify.app//Client/Tracking?res_id=${id.toString()}&order_id=${orderId}</p><br>
                <p>Do not hesistate to contact us if you face any trouble. Thank you for choosing us, hope you have a nice day.</p><br>`,
          })
          .then(() =>
            res.json({ data: "Confirmation email has been sent to " + email })
          );
      }
    })
    .then((error) => console.log(error));
});
app.post("/dineInFromRestaurant", (req, res) => {
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
  const result = fire.addNewOrderDineIn(
    orderId,
    id.toString(),
    food,
    amount,
    customer,
    tableNo,
    phone,
    email,
    type,
    status,
    method
  );
  result
    .then((data) => {
      if (data) {
        transporter
          .sendMail({
            from: "Eatsy_Order@outlook.com",
            to: email,
            subject: "Order has been confirmed",
            html: `<p>Hi ${customer}, </p><br>
                <p>Thank you for using Eatsy Food Ordering Services! We've successfully recieved you payment amount RM${amount}.</p><br>
                <p>You can check your order with this link right here https://eatsy.netlify.app//Client/Tracking?res_id=${id.toString()}&order_id=${orderId}</p><br>
                <p>Do not hesistate to contact us if you face any trouble. Thank you for choosing us, hope you have a nice day.</p><br>`,
          })
          .then(() =>
            res.json({ data: "Confirmation email has been sent to " + email })
          );
      }
    })
    .then((error) => console.log(error));
});
app.post("/insertNewTable", (req, res) => {
  const id = req.body.id;
  const tableId = req.body.tableId;
  const name = req.body.name;
  const phone = req.body.phone;
  const pax = req.body.pax;
  const status = req.body.status;
  const date = req.body.date;
  const email = req.body.email;

  const fire = firebase.getfireInstance();
  const result = fire.insertNewTable(
    id,
    tableId,
    name,
    phone,
    pax,
    status,
    date
  );
  result
    .then((data) => {
      if (email === undefined) {
        res.json({ data: data });
      } else {
        transporter
          .sendMail({
            from: "Eatsy_Order@outlook.com",
            to: email,
            subject: "Table booking has been confirmed",
            html: `<p>Hi ${name}, </p><br>
                <p>Thank you for using Eatsy Food Ordering Services! We've successfully recieved your table booking request.</p><br>
                <p>Please do show this email to our staff in order to get your booked table.</p><br>
                <p>Do contact us if you can't make it, so we can rearrange another date and time for you.</p><br>`,
          })
          .then(() =>
            res.json({ data: "Confirmation email has been sent to " + email })
          );
      }
    })
    .then((error) => console.log(error));
});
app.post("/trackingFoodWithId", (req, res) => {
  const restaurantId = req.body.restaurantId;
  const foodId = req.body.foodId;

  const fire = firebase.getfireInstance();
  const result = fire.trackingFoodWithId(restaurantId, foodId);
  result
    .then((data) => res.json({ data: data }))
    .then((error) => console.log(error));
});
app.post("/addAdmin", (req, res) => {
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
  const result = fire.addAdmin(
    email,
    password,
    restaurant,
    cuisine,
    image,
    price_range,
    last_name,
    first_name,
    gender,
    state,
    address,
    city,
    postal_code
  );
  result
    .then((data) => {
      res.json({ data: data });
    })
    .then((error) => console.log(error));
});
app.post("/login", (req, res) => {
  var email = req.body.email;
  var password = req.body.password;

  const fire = firebase.getfireInstance();
  const result = fire.loginAdmin(email, password);
  result
    .then((data) => {
      res.json({ data: data });
    })
    .then((error) => console.log(error));
});
app.post("/resetPassword", (req, res) => {
  var email = req.body.email;

  const fire = firebase.getfireInstance();
  const result = fire.resetPassword(email);
  result
    .then((data) => {
      res.json({ data: data });
    })
    .then((error) => console.log(error));
});

// checking user accessibility - admin
app.post("/getUser", (req, res) => {
  const uid = req.body.uid;

  const fire = firebase.getfireInstance();
  const result = fire.getUser(uid);
  result
    .then((data) => {
      if (data.length === 0) {
        res.json({ success: false });
      } else {
        res.json({ success: true, data: data });
      }
    })
    .then((error) => console.log(error));
});
// restaurant ordering api - admin
app.post("/restaurantDineIn", (req, res) => {
  const restaurantId = req.body.id;
  const orderId = req.body.orderId;
  const food = req.body.food;
  const amount = req.body.amount;
  const tableNo = req.body.tableNo;
  const type = req.body.type;
  const status = req.body.status;

  const fire = firebase.getfireInstance();
  const result = fire.addRestaurantDineIn(
    restaurantId,
    orderId,
    food,
    amount,
    tableNo,
    type,
    status
  );
  result
    .then((data) => {
      res.json({ data: "Order has been made" });
    })
    .then((error) => console.log(error));
});
app.post("/restaurantTakeAway", (req, res) => {
  const restaurantId = req.body.id;
  const orderId = req.body.orderId;
  const food = req.body.food;
  const amount = req.body.amount;
  const type = req.body.type;
  const status = req.body.status;

  const fire = firebase.getfireInstance();
  const result = fire.addRestaurantTakeAway(
    restaurantId,
    orderId,
    food,
    amount,
    type,
    status
  );
  result
    .then((data) => {
      res.json({ data: "Order has been made" });
    })
    .then((error) => console.log(error));
});
// getting order api - admin
app.post("/getOrderWithIdNDate", (req, res) => {
  const id = req.body.id;

  const fire = firebase.getfireInstance();
  const result = fire.getUser(id);
  result
    .then((data) => {
      if (data.length === 0) {
        res.json({ success: false });
      } else {
        const menuResult = fire.getOrderWithIdNDate(id);
        menuResult.then((data) => res.json({ success: true, data: data }));
      }
    })
    .then((error) => console.log(error));
});
app.post("/getOrderWithId", (req, res) => {
  const id = req.body.id;

  const fire = firebase.getfireInstance();
  const result = fire.getUser(id);
  result
    .then((data) => {
      if (data.length === 0) {
        res.json({ success: false });
      } else {
        const menuResult = fire.getOrderWithId(id);
        menuResult.then((data) => res.json({ success: true, data: data }));
      }
    })
    .then((error) => console.log(error));
});
// tracking order api - admin
app.post("/trackOrderWithOrderId", (req, res) => {
  const id = req.body.id;
  const orderId = req.body.orderId;

  const fire = firebase.getfireInstance();
  const result = fire.getUser(id);
  result
    .then((data) => {
      if (data.length === 0) {
        res.json({ success: false });
      } else {
        const result = fire.trackOrderWithId(id, orderId);
        result.then((data) => res.json({ success: true, data: data }));
      }
    })
    .then((error) => console.log(error));
});
// update order api - admin
app.put("/updateOrderStatus", (req, res) => {
  const id = req.body.id;
  const orderId = req.body.orderId;
  const status = req.body.status;

  const fire = firebase.getfireInstance();
  const result = fire.getUser(id);
  result
    .then((data) => {
      if (data.length === 0) {
        res.json({ success: false });
      } else {
        const result = fire.updateOrderDetail(id, orderId, status);
        result.then((data) => res.json({ success: true, data: data }));
      }
    })
    .then((error) => console.log(error));
});
// delete order api - admin
app.post("/deleteOrderData", (req, res) => {
  const id = req.body.id;
  const orderId = req.body.orderId;

  const fire = firebase.getfireInstance();
  const result = fire.getUser(id);
  result
    .then((data) => {
      if (data.length === 0) {
        res.json({ success: false });
      } else {
        const menuResult = fire.deleteOrderData(id, orderId);
        menuResult.then((data) => res.json({ success: true, data: data }));
      }
    })
    .then((error) => console.log(error));
});
// getting table api - admin
app.post("/getTableWithIdNDate", (req, res) => {
  const id = req.body.id;

  const fire = firebase.getfireInstance();
  const result = fire.getUser(id);
  result
    .then((data) => {
      if (data.length === 0) {
        res.json({ success: false });
      } else {
        const result = fire.getTableWithIdNDate(id);
        result.then((data) => res.json({ success: true, data: data }));
      }
    })
    .then((error) => console.log(error));
});
app.post("/getTableWithId", (req, res) => {
  const id = req.body.id;

  const fire = firebase.getfireInstance();
  const result = fire.getUser(id);
  result
    .then((data) => {
      if (data.length === 0) {
        res.json({ success: false });
      } else {
        const menuResult = fire.getTableWithId(id);
        menuResult.then((data) => res.json({ success: true, data: data }));
      }
    })
    .then((error) => console.log(error));
});
// update table api - admin
app.put("/updateTableStatus", (req, res) => {
  const id = req.body.id;
  const tableId = req.body.tableId;
  const status = req.body.status;

  const fire = firebase.getfireInstance();
  const result = fire.getUser(id);
  result
    .then((data) => {
      if (data.length === 0) {
        res.json({ success: false });
      } else {
        const result = fire.updateTableStatus(id, tableId, status);
        result.then((data) => res.json({ success: true, data: data }));
      }
    })
    .then((error) => console.log(error));
});
// delete table api - admin
app.post("/deleteTableData", (req, res) => {
  const id = req.body.id;
  const tableId = req.body.tableId;

  const fire = firebase.getfireInstance();
  const result = fire.getUser(id);
  result
    .then((data) => {
      if (data.length === 0) {
        res.json({ success: false });
      } else {
        const menuResult = fire.deleteTableData(id, tableId);
        menuResult.then((data) => res.json({ success: true, data: data }));
      }
    })
    .then((error) => console.log(error));
});
// insert menu api
app.post("/insertNewMenu", (req, res) => {
  const id = req.body.id;
  const menu = req.body.menu;

  const fire = firebase.getfireInstance();
  const result = fire.getUser(id);
  result
    .then((data) => {
      if (data.length === 0) {
        res.json({ success: false });
      } else {
        const result = fire.insertNewMenu(id, menu);
        result.then((data) => res.json({ success: true, data: data }));
      }
    })
    .then((error) => console.log(error));
});
// update menu api - admin
app.put("/updateMenuDiscount", (req, res) => {
  const id = req.body.id;
  const menuId = req.body.menuId;
  const discount = req.body.discount;

  const fire = firebase.getfireInstance();
  const result = fire.getUser(id);
  result
    .then((data) => {
      if (data.length === 0) {
        res.json({ success: false });
      } else {
        const result = fire.updateMenuDiscount(id, menuId, discount);
        result.then((data) => res.json({ success: true, data: data }));
      }
    })
    .then((error) => console.log(error));
});
app.put("/updateMenuAvailable", (req, res) => {
  const id = req.body.id;
  const menuId = req.body.menuId;
  const available = req.body.available;

  const fire = firebase.getfireInstance();
  const result = fire.getUser(id);
  result
    .then((data) => {
      if (data.length === 0) {
        res.json({ success: false });
      } else {
        const result = fire.updateMenuAvailable(id, menuId, available);
        result.then((data) => res.json({ success: true, data: data }));
      }
    })
    .then((error) => console.log(error));
});
app.put("/updateMenuDetail", (req, res) => {
  const id = req.body.id;
  const menuId = req.body.menuId;
  const detail = req.body.detail;

  const fire = firebase.getfireInstance();
  const result = fire.getUser(id);
  result
    .then((data) => {
      if (data.length === 0) {
        res.json({ success: false });
      } else {
        const result = fire.updateMenuDetail(id, menuId, detail);
        result.then((data) => res.json({ success: true, data: data }));
      }
    })
    .then((error) => console.log(error));
});
// delete menu api - admin
app.post("/deleteMenuDetail", (req, res) => {
  const id = req.body.id;
  const menuId = req.body.menuId;

  const fire = firebase.getfireInstance();
  const result = fire.getUser(id);
  result
    .then((data) => {
      if (data.length === 0) {
        res.json({ success: false });
      } else {
        const result = fire.deleteMenuDetail(id, menuId);
        result.then((data) => res.json({ success: true, data: data }));
      }
    })
    .then((error) => console.log(error));
});
// get generate api - admin
app.post("/getAllGenerateData", (req, res) => {
  const id = req.body.id;

  const fire = firebase.getfireInstance();
  const result = fire.getUser(id);
  result
    .then((data) => {
      if (data.length === 0) {
        res.json({ success: false });
      } else {
        const result = fire.getAllGenerateData(id);
        result.then((data) => res.json({ success: true, data: data }));
      }
    })
    .then((error) => console.log(error));
});
// insert generate api - admin
app.post("/insertGenerateData", (req, res) => {
  const id = req.body.id;
  const tableDetail = req.body.tableDetail;

  const fire = firebase.getfireInstance();
  const result = fire.getUser(id);
  result
    .then((data) => {
      if (data.length === 0) {
        res.json({ success: false });
      } else {
        const result = fire.insertGenerateData(id, tableDetail);
        result.then((data) => res.json({ success: true, data: data }));
      }
    })
    .then((error) => console.log(error));
});
// update generate api - admin
app.put("/updateGenerateData", (req, res) => {
  const id = req.body.id;
  const tableId = req.body.tableId;
  const tableDetail = req.body.tableDetail;

  const fire = firebase.getfireInstance();
  const result = fire.getUser(id);
  result
    .then((data) => {
      if (data.length === 0) {
        res.json({ success: false });
      } else {
        const result = fire.updateGenerateData(id, tableId, tableDetail);
        result.then((data) => res.json({ success: true, data: data }));
      }
    })
    .then((error) => console.log(error));
});
// delete generate api - admin
app.post("/deleteGenerateData", (req, res) => {
  const id = req.body.id;
  const tableId = req.body.tableId;

  const fire = firebase.getfireInstance();
  const result = fire.getUser(id);
  result
    .then((data) => {
      if (data.length === 0) {
        res.json({ success: false });
      } else {
        const result = fire.deleteGenerateData(id, tableId);
        result.then((data) => res.json({ success: true, data: data }));
      }
    })
    .then((error) => console.log(error));
});
// get all order data
app.post("/getFoodWithId", (req, res) => {
  const id = req.body.id;
  const foodId = req.body.foodId;

  const fire = firebase.getfireInstance();
  const result = fire.getUser(id);
  result
    .then((data) => {
      if (data.length === 0) {
        res.json({ success: false });
      } else {
        const result = fire.getFoodWithId(id, foodId);
        result.then((data) => res.json({ success: true, data: data }));
      }
    })
    .then((error) => console.log(error));
});
app.post("/getAllOrder", (req, res) => {
  const id = req.body.id;

  const fire = firebase.getfireInstance();
  const result = fire.getUser(id);
  result
    .then((data) => {
      if (data.length === 0) {
        res.json({ success: false });
      } else {
        const result = fire.getAllOrder(id);
        result.then((data) => {
          var newResult = [];
          for (var i = 0; i < data.length; i++) {
            var dateResult = [];
            var j = 0;
            for (j = i; j < data.length; j++) {
              if (
                new Date(
                  data[i].order_date.seconds * 1000
                ).toLocaleDateString() ===
                new Date(data[j].order_date.seconds * 1000).toLocaleDateString()
              ) {
                dateResult.push(data[j]);
              } else {
                break;
              }
            }
            var myData = {
              date: data[i].order_date.seconds,
              data: dateResult,
            };
            newResult.push(myData);
            i = j - 1;
          }
          res.json({ success: true, data: newResult });
        });
      }
    })
    .then((error) => console.log(error));
});
app.post("/getAllFilteringOrder", (req, res) => {
  const id = req.body.id;

  const fire = firebase.getfireInstance();
  const result = fire.getUser(id);
  result
    .then((data) => {
      if (data.length === 0) {
        res.json({ success: false });
      } else {
        const result = fire.getAllFilteringOrder(id);
        result.then((data) => {
          var result = [];
          for (var i = 0; i < data.length; i++) {
            var myData = JSON.parse(data[i]).food;
            for (var j = 0; j < myData.length; j++) {
              var index = result.findIndex(
                (detail) => detail.id === myData[j].id
              );
              if (index < 0) {
                result.push(myData[j]);
              } else {
                result[index].quantity += myData[j].quantity;
              }
            }
          }
          res.json({ success: true, data: result });
        });
      }
    })
    .then((error) => console.log(error));
});
// update user profile - admin
app.put("/updateUserProfile", (req, res) => {
  const id = req.body.id;
  const profile = req.body.profile;

  const fire = firebase.getfireInstance();
  const result = fire.getUser(id);
  result
    .then((data) => {
      if (data.length === 0) {
        res.json({ success: false });
      } else {
        const result = fire.updateUserProfile(id, profile);
        result.then((data) => res.json({ success: true, data: data }));
      }
    })
    .then((error) => console.log(error));
});

app.listen(port, () => {
  console.info(`Listening to port ${port}`);
});
