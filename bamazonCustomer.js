var inquirer = require('inquirer');
var mysql = require('mysql');

// variable to store connection to products database
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'testuser',
  password : 'Hello123',
  database : 'bamazon'
});


connection.connect(function (err) { 
    if (err) throw err;
    start();
 })

 function start() {
     // query the database for all items available
     connection.query("SELECT * FROM products", function (err, results) {
         if (err) throw err;
         inquirer.prompt([
             {
                 name: "choice",
                 type: "rawlist",
                 choices: function () { 
                     var choiceArray = [];
                     for (let i = 0; i < results.length; i++) {
                         choiceArray.push(results[i].product_name);
                     };
                     return choiceArray;
                  },
                  message: "What would you like to buy?"
             },
             {
                 name: "amount",
                 type: "input",
                 message: "How many would you like to buy?"
             }
         ]).then(function (answer) { 
             var chosenItem;
             for (let i = 0; i < results.length; i++) {
                 if (results[i].product_name === answer.choice) {
                    chosenItem = results[i];
                    // console.log(chosenItem);
                    // console.log(chosenItem.id);
                    // console.log(chosenItem.stock_quantity);

                 }
                 
             }
             if (chosenItem.stock_quantity > parseInt(answer.amount)) {
                // var newStockAmount = results.stock_quantity -= answer.amount;
                // console.log(newStockAmount);
                // there was enough in stock, so update db, let the user know, and start over
                connection.query(                    
                  "UPDATE products SET ? WHERE ?",
                  [
                    {
                      stock_quantity: chosenItem.stock_quantity - answer.amount
                    },
                    {
                      item_id: chosenItem.item_id
                    }
                  ],
                  function(error) {
                    if (err) console.log("Oops... Something went wrong");
                    console.log("Order placed successfully!");
                    console.log("----------------------------------");
                    start();
                  }
                );
              }
              else {
                // not enough in stock
                console.log("Not enough in stock. Try again...");
                start();
              }
          })
     })
 }