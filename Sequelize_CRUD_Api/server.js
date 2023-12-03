const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const db = require('./db.config');

//create  table if not exists 
db.sequelize.sync();

const controller = require('./customer.controller');  

app.get('/', function(req, res){
    res.send("hello world");
})

//create a new customer
app.post('/customers/new',function(req, res){
    controller.createCustomer(req, res);
})


//fetch all customers
app.get('/customers', function (req, res){
    controller.findAllCustomers(req, res);
})


//retrieve a single customer by id
app.get('/customers/:email', function(req, res){
    controller.findCustomerByEmail(req, res);
})


//update customer
app.put('/customers/update', function(req, res){
    controller.updateCustomer(req, res);
})


//delete a customer by email
app.delete('/customers/delete/:email', function(req, res){
    controller.deleteCustomer(req, res);
})

app.listen(3000, ()=>{
    console.log("Server is running on port 3000");
})
