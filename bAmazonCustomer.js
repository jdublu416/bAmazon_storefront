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

  var 

  function displayItems(){

  }
  