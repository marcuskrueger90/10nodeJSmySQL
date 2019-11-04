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
console.log(`WELCOME TO BAMAZON!`)
    purchaseItem();
});

function purchaseItem(){
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;

    inquirer.prompt([
      {
        name: 'choice',
        type: 'rawlist',
        choices: function(){
          var itemshere = [];
          for(var i =0; i< res.length; i++){
          itemshere.push(`${res[i].product_name}: $${res[i].price} | ${res[i].stock_quantity} left in stock`);
        }
        return itemshere;
      },
      message: 'Which item would you like to purchase?'
    },
    {
      name:'quantity',
      type:'input',
      message:'How many would you like to purchase?'

    },
    
  ]).then(function(answer){
    
    var chosenItem;
        for (var i = 0; i < res.length; i++) {
          if ((`${res[i].product_name}: $${res[i].price} | ${res[i].stock_quantity} left in stock`) === answer.choice) {
            chosenItem = res[i];
            
          }
         
        }
        
        if(chosenItem.stock_quantity >= parseInt(answer.quantity)){
          var amount = parseInt(answer.quantity);
          console.log(`You purchased ${amount} ${chosenItem.product_name}(s) for a total of $${chosenItem.price*amount}!!!`)
        
          var newQuantity = chosenItem.stock_quantity - amount;

          connection.query(
            'UPDATE products SET ? WHERE ?',
            [
              {
                stock_quantity : newQuantity
              },
              {
                item_id : chosenItem.item_id
              }
            ]
          )
          showProducts();
        }else{
          console.log(`There are only ${chosenItem.stock_quantity} left and you chose ${answer.quantity}. Please try again.`)
          purchaseItem();
        }
  })

  
  
})

};

function showProducts() {
    console.log("Catalog updated...\n");
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


  