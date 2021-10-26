const firebase = require('firebase/app');
require('firebase/auth');
require('firebase/firebase-auth');
require('firebase/firestore');
require('firebase/firebase-firestore');
require('firebase/firebase-app');
const { response, query } = require('express')
let instance = null;

var firebaseConfig = {
    apiKey: "AIzaSyDygRZqNcr-77d6r80_4kDZwT-K_mRS6hU",
    authDomain: "eatsy-d60ac.firebaseapp.com",
    databaseURL: "https://eatsy-d60ac-default-rtdb.firebaseio.com",
    projectId: "eatsy-d60ac",
    storageBucket: "eatsy-d60ac.appspot.com",
    messagingSenderId: "32542278845",
    appId: "1:32542278845:web:ea6cefe70affab0e8463d4",
    measurementId: "G-3QZNVWFP62"
};
firebase.initializeApp(firebaseConfig);

class firebaseServices{
    static getfireInstance(){
        return instance ? instance : new firebaseServices();
    }

    // function without user login
    async getAllMenuRestaurant(){
        try{
            const response = await new Promise((resolve, reject)=>{
                let result = [];
                const firestore = firebase.firestore();
                firestore.collection('user').get()
                .then(docs => {
                    docs.forEach( doc => {
                        result.push(doc.data());
                    });
                    resolve(result);
                })
                .then(error => console.log(error));
            })
            return response;
        }catch(error){
            console.log(error);
        }
    }
    async getMenuByrestaurantId(id){
        try{
            const response = await new Promise((resolve, reject)=>{
                let result = [];
                const firestore = firebase.firestore();
                firestore.collection('user').doc(id).get()
                .then(detail => {
                    result.push(detail.data().user_image);
                    firestore.collection('user').doc(id).collection('menu').get()
                    .then(docs =>{
                        docs.forEach( doc => {
                            result.push(doc.id);
                            result.push(doc.data());
                        });
                        resolve(result);
                    })
                })
                .then(error => console.log(error));
            })
            return response;
        }catch(error){
            console.log(error);
        }
    }
    async getRestaurantByCategories(categories){
        try{
            const response = await new Promise((resolve, reject)=>{
                let result = [];
                const firestore = firebase.firestore();
                firestore.collection('user').where("user_cuisine", "==", categories).get()
                .then(docs =>{
                    docs.forEach( doc => {       
                        result.push(doc.data());
                    });
                    resolve(result);
                })
                .then(error => console.log(error));
            })
            return response;
        }catch(error){
            console.log(error);
        }
    }
    async getRestaurantById(id){
        try{
            const response = await new Promise((resolve, reject)=>{
                let result = [];
                const firestore = firebase.firestore();
                firestore.collection('user').where("user_id", "==", id).get()
                .then(docs => {
                    docs.forEach( doc => {     
                        result.push(doc.data());
                    });
                    resolve(result);
                })
                .then(error => console.log(error));
            })
            return response;
        }catch(error){
            console.log(error);
        }
    }
    async updateUserDetail(id, restaurant, cuisine, image, start_time, end_time, credit){
        try{
            const response = await new Promise((resolve, reject)=>{
                const data = {
                    user_restaurant : restaurant,
                    user_cuisine : cuisine,
                    user_image : image,
                    user_start_time : start_time,
                    user_end_time : end_time,
                    user_credit : credit
                }
                const firestore = firebase.firestore();
                firestore.collection('user').doc(id).update(data);
                resolve("Information Updated");
            })
            return response;
        }catch(error){
            console.log(error);
        }
    }
    async addNewOrderTakeAway(orderId, id, food, amount, customer, phone, email, type, status, method){
        try{
            const response = await new Promise((resolve, reject)=>{
                const data = {
                    order_id: orderId,
                    order_food : food,
                    order_amount : amount,
                    order_customer : customer,
                    order_phone : phone,
                    order_email : email,
                    order_type : type,
                    order_status : status,
                    order_method : method,
                    order_date : firebase.firestore.Timestamp.fromDate(new Date())
                }
                const firestore = firebase.firestore();
                firestore.collection('user').doc(id).collection('order').doc(orderId).set(data)
                .then((data) => {
                    resolve(data);  
                })
            })
            return response;
        }catch(error){
            console.log(error);
        }
    }
    async addNewOrderDineIn(orderId, id, food, amount, customer, tableNo, phone, email, type, status, method){
        try{
            const response = await new Promise((resolve, reject)=>{
                const data = {
                    order_id: orderId,
                    order_food : food,
                    order_amount : amount,
                    order_customer : customer,
                    order_no : tableNo,
                    order_phone : phone,
                    order_email : email,
                    order_type : type,
                    order_status : status,
                    order_method : method,
                    order_date : firebase.firestore.Timestamp.fromDate(new Date())
                }
                const firestore = firebase.firestore();
                firestore.collection('user').doc(id).collection('order').doc(orderId).set(data)
                .then((data) => {
                    resolve(data);  
                })
            })
            return response;
        }catch(error){
            console.log(error);
        }
    }
    async trackOrderWithId(restaurantId, orderId){
        try{
            const response = await new Promise((resolve, reject)=>{
                const firestore = firebase.firestore();
                const result = [];
                firestore.collection('user').doc(restaurantId).collection('order').where("order_id", "==", orderId).get()
                .then(docs => {
                    docs.forEach(doc => result.push(doc.data()));
                    resolve(result);
                })
            })
            return response;
        }catch(error){
            console.log(error);
        }
    }
    async trackingFoodWithId(restaurantId, foodId){
        try{
            const response = await new Promise((resolve, reject)=>{
                const firestore = firebase.firestore();
                const result = [];
                firestore.collection('user').doc(restaurantId).collection('menu').get()
                .then(docs => {
                    docs.forEach( doc => {
                        if(foodId.includes(doc.id)){
                            result.push(doc.data());
                        }
                    });
                    resolve(result);
                })
            })
            return response;
        }catch(error){
            console.log(error);
        }
    }
    async addAdmin(email, password, restaurant, cuisine, image, price_range, last_name, first_name, gender, state, address, city, 
        postal_code){
        try{
            const response = await new Promise((resolve, reject)=>{
                firebase.auth().createUserWithEmailAndPassword(email, password)
                .then( () =>{
                    const data = {
                        user_id : firebase.auth().currentUser.uid,
                        user_restaurant : restaurant,
                        user_cuisine : cuisine,
                        user_image : image,
                        user_price_range : price_range,
                        user_last_name : last_name,
                        user_first_name : first_name,
                        user_gender : gender,
                        user_state : state,
                        user_address : address,
                        user_city : city,
                        user_postal_code : postal_code,
                        user_credit : "0.00"
                    }
                    const firestore = firebase.firestore();
                    firestore.collection('user').doc(firebase.auth().currentUser.uid).set(data);
                    firebase.auth().signOut();
                    resolve({message: "User Created Successfully", success: true});
                })
                .catch((error)=>{
                    resolve({message: error.message, success: false});
                })
            })
            return response;
        }catch(error){
            console.log(error);
        }
    }
    async loginAdmin(email, password){
        try{
            const response = await new Promise((resolve, reject)=>{
                firebase.auth().signInWithEmailAndPassword(email, password)
                .then( (userCredit)=>{
                    resolve({message: "Login Successfully", success: true, id: firebase.auth().currentUser.uid});
                })
                .catch((error)=>{
                    resolve({message: error.message, success: false});
                })
            })
            return response;
        }catch(error){
            console.log(error.message);
        }
    }
    async resetPassword(email){
        try{
            const response = await new Promise((resolve, reject)=>{
                firebase.auth().sendPasswordResetEmail(email)
                .then( ()=>{
                    resolve({success: true, message:"Reset Email has been sent"});
                })
                .catch((error)=>{
                    resolve({message: error.message, success: false});
                })
            })
            return response;
        }catch(error){
            console.log(error.message);
        }
    }

    // function with user id and api checked
    async getUser(id){
        try{
            const response = await new Promise((resolve, reject)=>{
                let result = [];
                const firestore = firebase.firestore();
                firestore.collection('user').where("user_id", "==", id).get()
                .then(docs => {
                    docs.forEach( doc => result.push(doc.data()));
                    resolve(result)
                })
            })
            return response;
        }catch(error){
            console.log(error.message);
        }
    }
    async addRestaurantDineIn(id, orderId, food, amount, tableNo, type, status){
        try{
            const response = await new Promise((resolve, reject)=>{
                const data = {
                    order_id: orderId,
                    order_food : food,
                    order_amount : amount,
                    order_no : tableNo,
                    order_type : type,
                    order_status : status,
                    order_date : firebase.firestore.Timestamp.fromDate(new Date())
                }
                const firestore = firebase.firestore();
                firestore.collection('user').doc(id).collection('order').doc(orderId).set(data)
                .then((data) => {
                    resolve(data);  
                })
            })
            return response;
        }catch(error){
            console.log(error);
        }
    }
    async addRestaurantTakeAway(id, orderId, food, amount, type, status){
        try{
            const response = await new Promise((resolve, reject)=>{
                const data = {
                    order_id: orderId,
                    order_food : food,
                    order_amount : amount,
                    order_type : type,
                    order_status : status,
                    order_date : firebase.firestore.Timestamp.fromDate(new Date())
                }
                const firestore = firebase.firestore();
                firestore.collection('user').doc(id).collection('order').doc(orderId).set(data)
                .then((data) => {
                    resolve(data);  
                })
            })
            return response;
        }catch(error){
            console.log(error);
        }
    }
    async getOrderWithIdNDate(id){
        try{
            const response = await new Promise((resolve, reject)=>{
                let result = [];
                const firestore = firebase.firestore();
                firestore.collection('user').doc(id).collection("order").get()
                .then(docs => {
                    docs.forEach( doc => {
                        const date = new Date(doc.data().order_date.seconds * 1000).toLocaleDateString();
                        var today = new Date().toLocaleDateString();
                        if(date === today){
                            result.push(doc.data())
                        }
                    });
                    resolve(result)
                })
            })
            return response;
        }catch(error){
            console.log(error.message);
        }
    }
    async getOrderWithId(id){
        try{
            const response = await new Promise((resolve, reject)=>{
                let result = [];
                const firestore = firebase.firestore();
                firestore.collection('user').doc(id).collection("order").get()
                .then(docs => {
                    docs.forEach( doc => {
                        const date = new Date(doc.data().order_date.seconds * 1000).toLocaleDateString();
                        var today = new Date().toLocaleDateString();
                        if(date < today){
                            result.push(doc.data())
                        }
                    });
                    resolve(result)
                })
            })
            return response;
        }catch(error){
            console.log(error.message);
        }
    }
    async updateOrderDetail(id, orderId, status){
        try{
            const response = await new Promise((resolve, reject)=>{
                const firestore = firebase.firestore();
                firestore.collection('user').doc(id).collection("order").doc(orderId).update({
                    order_status: status
                })
                resolve("Updated Successfully")
            })
            return response;
        }catch(error){
            console.log(error.message);
        }
    }
    async insertNewTable(id, tableId, name, phone, pax, status, date){
        try{
            const response = await new Promise((resolve, reject)=>{
                const data = {
                    id: tableId,
                    name : name,
                    phone : phone,
                    pax : pax,
                    status : status,
                    date : firebase.firestore.Timestamp.fromDate(new Date(date))
                }
                const firestore = firebase.firestore();
                firestore.collection('user').doc(id).collection('table').doc(tableId).set(data)
                resolve("Inserted Successfully")
            })
            return response;
        }catch(error){
            console.log(error.message);
        }
    }
    async getTableWithIdNDate(id){
        try{
            const response = await new Promise((resolve, reject)=>{
                let result = [];
                const firestore = firebase.firestore();
                firestore.collection('user').doc(id).collection("table").where("status", "!=", "decline").get()
                .then(docs => {
                    docs.forEach( doc => {
                        const date = new Date(doc.data().date.seconds * 1000).toLocaleDateString();
                        var today = new Date().toLocaleDateString();
                        if(date >= today){
                            result.push(doc.data())
                        }
                    });
                    resolve(result)
                });
            })
            return response;
        }catch(error){
            console.log(error.message);
        }
    }
    async getTableWithId(id){
        try{
            const response = await new Promise((resolve, reject)=>{
                let result = [];
                const firestore = firebase.firestore();
                firestore.collection('user').doc(id).collection("table").get()
                .then(docs => {
                    docs.forEach( doc => {
                        const date = new Date(doc.data().date.seconds * 1000).toLocaleDateString();
                        var today = new Date().toLocaleDateString();
                        if(date < today || doc.data().status === "decline"){
                            result.push(doc.data())
                        }
                    });
                    resolve(result)
                })
            })
            return response;
        }catch(error){
            console.log(error.message);
        }
    }
    async updateTableStatus(id, tableId, status){
        try{
            const response = await new Promise((resolve, reject)=>{
                const firestore = firebase.firestore();
                firestore.collection('user').doc(id).collection("table").doc(tableId).update({
                    status: status
                })
                resolve("Updated Successfully")
                
            })
            return response;
        }catch(error){
            console.log(error.message);
        }
    }
    async deleteOrderData(id, orderId){
        try{
            const response = await new Promise((resolve, reject)=>{
                const firestore = firebase.firestore();
                firestore.collection('user').doc(id).collection("order").doc(orderId).delete()
                resolve("Deleted Successfully")
            })
            return response;
        }catch(error){
            console.log(error.message);
        }
    }
    async deleteTableData(id, tableId){
        try{
            const response = await new Promise((resolve, reject)=>{
                const firestore = firebase.firestore();
                firestore.collection('user').doc(id).collection("table").doc(tableId).delete()
                resolve("Deleted Successfully")
            })
            return response;
        }catch(error){
            console.log(error.message);
        }
    }
    async insertNewMenu(id, menu){
        try{
            const response = await new Promise((resolve, reject)=>{
                const firestore = firebase.firestore();
                firestore.collection('user').doc(id).collection("menu").add(menu);
                resolve("Inserted Successfully");
            })
            return response;
        }catch(error){
            console.log(error.message);
        }
    }
    async updateMenuDiscount(id, menuId, discount){
        try{
            const response = await new Promise((resolve, reject)=>{
                const firestore = firebase.firestore();
                firestore.collection('user').doc(id).collection("menu").doc(menuId).update({
                    food_discount: discount
                })
                resolve("Updated Successfully")
                
            })
            return response;
        }catch(error){
            console.log(error.message);
        }
    }
    async updateMenuAvailable(id, menuId, available){
        try{
            const response = await new Promise((resolve, reject)=>{
                const firestore = firebase.firestore();
                firestore.collection('user').doc(id).collection("menu").doc(menuId).update({
                    food_available: available
                })
                resolve("Updated Successfully")
                
            })
            return response;
        }catch(error){
            console.log(error.message);
        }
    }
    async updateMenuDetail(id, menuId, detail){
        try{
            const response = await new Promise((resolve, reject)=>{
                const firestore = firebase.firestore();
                firestore.collection('user').doc(id).collection("menu").doc(menuId).update(detail)
                resolve("Updated Successfully")
                
            })
            return response;
        }catch(error){
            console.log(error.message);
        }
    }
    async deleteMenuDetail(id, menuId){
        try{
            const response = await new Promise((resolve, reject)=>{
                const firestore = firebase.firestore();
                firestore.collection('user').doc(id).collection("menu").doc(menuId).delete();
                resolve("Deleted Successfully")
                
            })
            return response;
        }catch(error){
            console.log(error.message);
        }
    }
    async getAllGenerateData(id){
        try{
            const response = await new Promise((resolve, reject)=>{
                const firestore = firebase.firestore();
                let result = [];
                firestore.collection('user').doc(id).collection("generate").orderBy("table_no").get()
                .then(docs => {
                    docs.forEach( doc => {
                        result.push(doc.id);
                        result.push(doc.data());
                    });
                    resolve(result);
                })
            })
            return response;
        }catch(error){
            console.log(error.message);
        }
    }
    async insertGenerateData(id, tableDetail){
        try{
            const response = await new Promise((resolve, reject)=>{
                const firestore = firebase.firestore();
                firestore.collection('user').doc(id).collection("generate").add(tableDetail)
                resolve("Inserted Successfully");
            })
            return response;
        }catch(error){
            console.log(error.message);
        }
    }
    async updateGenerateData(id, tableId, tableDetail){
        try{
            const response = await new Promise((resolve, reject)=>{
                const firestore = firebase.firestore();
                firestore.collection('user').doc(id).collection("generate").doc(tableId).update(tableDetail)
                resolve("Updated Successfully");
            })
            return response;
        }catch(error){
            console.log(error.message);
        }
    }
    async deleteGenerateData(id, tableId){
        try{
            const response = await new Promise((resolve, reject)=>{
                const firestore = firebase.firestore();
                firestore.collection('user').doc(id).collection("generate").doc(tableId).delete();
                resolve("Deleted Successfully");
            })
            return response;
        }catch(error){
            console.log(error.message);
        }
    }
    async getAllOrder(id){
        try{
            const response = await new Promise((resolve, reject)=>{
                const firestore = firebase.firestore();
                let result = [];
                firestore.collection('user').doc(id).collection("order").orderBy("order_date").get()
                .then(docs => {
                    docs.forEach( doc => {
                        result.push(doc.data());
                    });
                    resolve(result);
                })
            })
            return response;
        }catch(error){
            console.log(error.message);
        }
    }
    async getAllFilteringOrder(id){
        try{
            const response = await new Promise((resolve, reject)=>{
                const firestore = firebase.firestore();
                let result = [];
                firestore.collection('user').doc(id).collection("order").get()
                .then(docs => {
                    docs.forEach( doc => {
                        result.push(doc.data().order_food);
                    });
                    resolve(result);
                })
            })
            return response;
        }catch(error){
            console.log(error.message);
        }
    }
    async updateUserProfile(id, profile){
        try{
            const response = await new Promise((resolve, reject)=>{
                const firestore = firebase.firestore();
                let result = [];
                firestore.collection('user').doc(id).update(profile);
                resolve("Updated Successfully");
            })
            return response;
        }catch(error){
            console.log(error.message);
        }
    }


    // checking authorised
    // async findUser(id){
    //     try{
    //         const response = await new Promise((resolve, reject)=>{
    //             let result = [];
    //             const firestore = firebase.firestore();
    //             firestore.collection('user').where("user_id", "==", id).get()
    //             .then(docs => {
    //                 docs.forEach(doc => result.push(doc.data()));
    //                 resolve(result);
    //             })
    //             .then((error)=>{
    //                 console.log(error);
    //             })
    //         })
    //         return response;
    //     }catch(error){
    //         console.log(error.message);
    //     }
    // }
    
    // // add menu
    // async addMenu(id, name, price, categories, image, available, discount){
    //     try{
    //         const response = await new Promise((resolve, reject)=>{
    //             const data = {
    //                 food_name: name,
    //                 food_price: price,
    //                 food_categories: categories,
    //                 food_image: image,
    //                 food_available: available,
    //                 food_discount: discount
    //             }
    //             const firestore = firebase.firestore();
    //             firestore.collection('user').doc(id).collection('menu').add(data);
    //             resolve("Menu Added Successfully");
    //         })
    //         return response;
    //     }catch(error){
    //         console.log(error);
    //     }
    // }
    // //get menu by categories
    // async getMenuByCate(id){
    //     try{
    //         const response = await new Promise((resolve, reject)=>{
    //             let result = [];
    //             const firestore = firebase.firestore();
    //             firestore.collection('user').doc(id).collection('menu').get()
    //             .then(docs =>{
    //                 docs.forEach(doc => result.push(doc.data()));
    //                 resolve(result);
    //             })
    //             .then(error => console.log(error));
    //         })
    //         return response;
    //     }catch(error){
    //         console.log(error);
    //     }
    // }
    // //get single food from menu
    // async getMenuBySingleId(user_id, food_name){
    //     try{
    //         const response = await new Promise((resolve, reject)=>{
    //             let result = [];
    //             const firestore = firebase.firestore();
    //             firestore.collection('user').doc(user_id).collection('menu').where("food_name", "==", food_name).get()
    //             .then(docs =>{
    //                 docs.forEach(doc => result.push(doc.data()));
    //                 resolve(result);
    //             })
    //             .then(error => console.log(error));
    //         })
    //         return response;
    //     }catch(error){
    //         console.log(error);
    //     }
    // }
    // //update menu
    // async updateMenu(id, ori_name, name, price, categories, image, available, discount){
    //     try{
    //         const response = await new Promise((resolve, reject)=>{
    //             const data = {
    //                 food_name: name,
    //                 food_price: price,
    //                 food_categories: categories,
    //                 food_image: image,
    //                 food_available: available,
    //                 food_discount: discount
    //             }
    //             firebase.firestore().collection('user').doc(id).collection('menu').where("food_name", "==", ori_name).get()
    //             .then(function(docs){
    //                 docs.forEach((element)=>{
    //                     firebase.firestore().collection('user').doc(id).collection('menu').doc(element.id).update(data);
    //                 })
    //             })
    //             resolve("Menu Updated Succesfully");
    //         })
    //         return response;
    //     }catch(error){
    //         console.log(error);
    //     }
    // }
    // //Delete menu
    // async deleteMenu(user_id, food_name){
    //     try{
    //         const response = await new Promise((resolve, reject)=>{
    //             firebase.firestore().collection('user').doc(user_id).collection('menu').where("food_name", "==", food_name).get()
    //             .then(function(doc){
    //                 doc.forEach(function(element){
    //                     firebase.firestore().collection('user').doc(user_id).collection('menu').doc(element.id).delete();
    //                 })
    //             })
    //             resolve("Menu deleted Succesfully");
    //         })
    //         return response;
    //     }catch(error){
    //         console.log(error);
    //     }
    // }
}


module.exports = firebaseServices;