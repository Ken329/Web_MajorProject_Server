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
    // adding admin
    async addAdmin(email, password, restaurant, cuisine, image, start_time, end_time){
        try{
            const response = await new Promise((resolve, reject)=>{
                firebase.auth().createUserWithEmailAndPassword(email, password)
                .then( () =>{
                    const data = {
                        user_id : firebase.auth().currentUser.uid,
                        user_restaurant : restaurant,
                        user_cuisine : cuisine,
                        user_image : image,
                        user_start_time : start_time,
                        user_end_time : end_time
                    }
                    const firestore = firebase.firestore();
                    firestore.collection('user').doc(firebase.auth().currentUser.uid).set(data);
                    resolve("User Created");
                })
                .catch((error)=>{
                    resolve(error.message);
                })
            })
            return response;
        }catch(error){
            console.log(error);
        }
    }
    // admin login
    async loginAdmin(email, password){
        try{
            const response = await new Promise((resolve, reject)=>{
                firebase.auth().signInWithEmailAndPassword(email, password)
                .then( (userCredit)=>{
                    resolve(firebase.auth().currentUser.uid);
                })
                .catch((error)=>{
                    resolve(false);
                })
            })
            return response;
        }catch(error){
            console.log(error.message);
        }
    }
    // checking authorised
    async findUser(id){
        try{
            const response = await new Promise((resolve, reject)=>{
                let result = [];
                const firestore = firebase.firestore();
                firestore.collection('user').where("user_id", "==", id).get()
                .then(docs => {
                    docs.forEach(doc => result.push(doc.data()));
                    resolve(result);
                })
                .then((error)=>{
                    console.log(error);
                })
            })
            return response;
        }catch(error){
            console.log(error.message);
        }
    }
    // update admin
    async updateAdmin(id, restaurant, cuisine, image, start_time, end_time){
        try{
            const response = await new Promise((resolve, reject)=>{
                const data = {
                    user_restaurant : restaurant,
                    user_cuisine : cuisine,
                    user_image : image,
                    user_start_time : start_time,
                    user_end_time : end_time
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
    // add menu
    async addMenu(id, name, price, categories, image, available, discount){
        try{
            const response = await new Promise((resolve, reject)=>{
                const data = {
                    food_name: name,
                    food_price: price,
                    food_categories: categories,
                    food_image: image,
                    food_available: available,
                    food_discount: discount
                }
                const firestore = firebase.firestore();
                firestore.collection('user').doc(id).collection('menu').add(data);
                resolve("Menu Added Successfully");
            })
            return response;
        }catch(error){
            console.log(error);
        }
    }
    //get menu by categories
    async getMenuByCate(id){
        try{
            const response = await new Promise((resolve, reject)=>{
                let result = [];
                const firestore = firebase.firestore();
                firestore.collection('user').doc(id).collection('menu').get()
                .then(docs =>{
                    docs.forEach(doc => result.push(doc.data()));
                    resolve(result);
                })
                .then(error => console.log(error));
            })
            return response;
        }catch(error){
            console.log(error);
        }
    }
    //get single food from menu
    async getMenuBySingleId(user_id, food_name){
        try{
            const response = await new Promise((resolve, reject)=>{
                let result = [];
                const firestore = firebase.firestore();
                firestore.collection('user').doc(user_id).collection('menu').where("food_name", "==", food_name).get()
                .then(docs =>{
                    docs.forEach(doc => result.push(doc.data()));
                    resolve(result);
                })
                .then(error => console.log(error));
            })
            return response;
        }catch(error){
            console.log(error);
        }
    }
    //update menu
    async updateMenu(id, ori_name, name, price, categories, image, available, discount){
        try{
            const response = await new Promise((resolve, reject)=>{
                const data = {
                    food_name: name,
                    food_price: price,
                    food_categories: categories,
                    food_image: image,
                    food_available: available,
                    food_discount: discount
                }
                firebase.firestore().collection('user').doc(id).collection('menu').where("food_name", "==", ori_name).get()
                .then(function(docs){
                    docs.forEach((element)=>{
                        firebase.firestore().collection('user').doc(id).collection('menu').doc(element.id).update(data);
                    })
                })
                resolve("Menu Updated Succesfully");
            })
            return response;
        }catch(error){
            console.log(error);
        }
    }
    //Delete menu
    async deleteMenu(user_id, food_name){
        try{
            const response = await new Promise((resolve, reject)=>{
                firebase.firestore().collection('user').doc(user_id).collection('menu').where("food_name", "==", food_name).get()
                .then(function(doc){
                    doc.forEach(function(element){
                        firebase.firestore().collection('user').doc(user_id).collection('menu').doc(element.id).delete();
                    })
                })
                resolve("Menu deleted Succesfully");
            })
            return response;
        }catch(error){
            console.log(error);
        }
    }
}


module.exports = firebaseServices;