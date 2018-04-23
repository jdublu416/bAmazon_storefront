var mysql = require("mysql");
var inquirer = require("inquirer");
var STOCK_QUANTITY;
var ITEM_ID;
var chosenItem;

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

function displayItems() {
  console.log("Selection of all products available for purchase...\n");
  var sql = "SELECT ITEM_ID, PRODUCT_NAME, PRICE, STOCK_QUANTITY FROM products";
  connection.query(sql, function(err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement

    // console.log("this item_id is " + res[0].ITEM_ID);

    for (var i = 0; i < res.length; i++) {
      console.log(`Item ID# for Sale: ${res[i].ITEM_ID}
                      Product Name: ${res[i].PRODUCT_NAME}
                      Price: ${res[i].PRICE}
                      Quantity Available: ${res[i].STOCK_QUANTITY}
        `);
    }
    itemSearch();
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
      connection.query(
        "SELECT * FROM PRODUCTS WHERE ?",
        { ITEM_ID: answer.choice },
        function(err, res) {
          chosenItem = res[0];
          var stock_quantity = res[0].STOCK_QUANTITY;

          purchaseItem(chosenItem);
        }
      );
    });
}

function purchaseItem(chosenItem) {
  inquirer
    .prompt({
      name: "userPurchase",
      type: "input",
      message: "How many would you like to purchase?"
    })
    .then(function(answer) {
      // console.log(stock_quantity + " " + answer.userPurchase);
      if (chosenItem.STOCK_QUANTITY < answer.userPurchase) {
        console.log(
          "Insufficient inventory...We only have " +
            chosenItem.STOCK_QUANTITY +
            " items for sale!"
        );
        purchaseItem(chosenItem);
      } else {
        var changeSQ = chosenItem.STOCK_QUANTITY - answer.userPurchase;
        var salePrice= chosenItem.PRICE * answer.userPurchase;
        console.log("Your order is just about complete  \nTotal cost will be "+ salePrice);
        updateDB(changeSQ);
      }
    });
}

function updateDB(changeSQ) {
  connection.query(
    "UPDATE PRODUCTS SET ? WHERE ?",
    [
      {
        STOCK_QUANTITY: changeSQ
      },
      { ITEM_ID: chosenItem.ITEM_ID }
    ],
    function(err) {
      if (err) throw err;
      console.log("Congratulations! Order submitted...You successfully purchased your item!");
      connection.end();
    }
  );
}
