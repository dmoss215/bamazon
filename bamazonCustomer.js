var inquirer = require('inquirer');
var mysql = require('mysql');

// variable to store connection to products database
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'testuser',
  password : 'Welcome123',
  database : 'bamazon'
});

// connection.connect();

// connection.query("SELECT * FROM products", function (err, results) {
//     if (err) throw err;
//     console.log(results);
// })

// connection.end();

conection.connect(function (err) { 
    if (err) throw err;
    start();
 })

 function start() {
     // query the database for all items available
     connection.query("SELECT * FROM products", function (err, results) {
         if (err) throw err;
         
     })
 }