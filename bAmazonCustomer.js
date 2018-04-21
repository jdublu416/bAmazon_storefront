var mysql=require ('mysql');
var inquirer=require('inquirer');

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
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
   
    
    
    displayItems();
    
  });
  
  
// itemSearch();

  function  displayItems() {
    console.log("Selecting all products...\n");
    var sql="SELECT ITEM_ID, PRODUCT_NAME, PRICE, Stock_quantity FROM products"
    connection.query(sql, function(err, res) {
      if (err) throw err;
      // Log all results of the SELECT statement
      console.log(res);
      console.log("this var is"+res[0].item_id);
      // for (var i=0; i<res.length;i++)
      // {
      //   console.log (`Item for Sale: ${res[i].value(item_id)}
      //   `)
      // }  
  
      connection.end();
    });
  }

  function itemSearch() {
    inquirer
      .prompt({
        name: "choice",
        type: "input",
        message: "What item would you like to purchase? Please select an item number..."
      })
      .then(function(choice) {
        var stock_quantity;
        var query = "SELECT ITEM_ID, STOCK_QUANTITY FROM PRODUCT WHERE ?";
        connection.query(query, { choice: item_id }, function(err, res) {
         return stock_quantity;
        });
      });
  }
  
  