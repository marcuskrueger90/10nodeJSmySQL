var mysql = require('mysql');
var inquirer = require('inquirer');
var fs = require ('fs');

var connection = mysql.createConnection({
    host: 'localhost',

    port:3306,

    user: 'root',

    password: 'S0cc3rM4n!69',
    database: 'bamazon_db'
});

connection.connect( function(err, res){
    if (err) throw err;

    showProducts();
});

function showProducts() {
    console.log("Selecting all products...\n");
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      
      for (var i= 0; i < res.length; i++){
        console.log(`<-------------->
        Item ID: ${res[i].item_id}
        Name: ${res[i].product_name} 
        Department: ${res[i].department_name}
        Price: $${res[i].price}
        ${res[i].stock_quantity} LEFT IN STOCK!`);
      }

      
      connection.end();
    });
  }