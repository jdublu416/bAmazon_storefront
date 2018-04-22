var mysql = require("mysql");
var inquirer = require("inquirer");
var STOCK_QUANTITY;
var ITEM_ID;

var connection = mysql.createConnection({
  host: "localhost",
  port: 3307,

  // Your username
  user: "root",

  // Your password
  password: "Pirahn437",
  database: "BAMAZON_DB"
});
connection.connect(function(err) {
  if (err) {
    throw err;
  }
  console.log("connected as id " + connection.threadId);
  displayItems();
});

// itemSearch();

function displayItems() {
  console.log("Selection of all products available for purchase...\n");
  var sql = "SELECT ITEM_ID, PRODUCT_NAME, PRICE, STOCK_QUANTITY FROM products";
  connection.query(sql, function(err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    // console.log(res);
    console.log("this item_id is " + res[0].ITEM_ID);

    for (var i = 0; i < res.length; i++) {
      console.log(`Item ID# for Sale: ${res[i].ITEM_ID}
                      Product Name: ${res[i].PRODUCT_NAME}
                      Price: ${res[i].PRICE}
                      Quantity Available: ${res[i].STOCK_QUANTITY}
        `);
    }
    itemSearch();
    connection.end();
  });
}

function itemSearch() {
  inquirer
    .prompt({
      name: "choice",
      type: "input",
      message:
        "What item would you like to purchase? Please select an Item ID#..."
    })
    .then(function(answer) {

      
      console.log(answer.choice);
      connection.query("SELECT * FROM PRODUCT WHERE ?", {ITEM_ID: answer.choice}, function(err, res) {
        console.log("The results are "+res);
      
        var chosenItem = res[0].ITEM_ID;
        var stock_quantity=res[0].STOCK_QUANTITY;
          
        
      });
      purchaseItem(stock_quantity);
      connection.end();
    });
}

function purchaseItem(stock_quantity) {
  inquirer
    .prompt({
      name: "userPurchase",
      type: "input",
      message: "How many would you like to purchase?"
    })
    .then(function(answer) {
      console.log(stock_quantity + " " + answer.userPurchase);
      if (stock_quantity < answer.userPurchase) {
        console.log(
          "Insufficient inventory...We only have " +
            stock_quantity +
            " items for sale!"
        );
      } else {
        console.log("do something else");
      }
    });
}
