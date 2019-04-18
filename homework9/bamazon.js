//Requiring mysql and inquirer

var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");


// Enter connection to bamazon_db
var connection = mysql.createConnection({
    host: "127.0.0.1",
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'bamazon_db'
});


//This runs the program
function runProgram(){

    getData();

//Console log some kind of greeting
console.log("-----------------------------------Welcome to my store-----------------------------------\n");
}

//This function will ask what item the user wants by getting the id and the quantity
function itemChoice(inventory){
    console.log("\n");
    console.table(inventory);
    console.log("\n");
    inquirer.prompt([
        {
            type: "input",
            message: "Please list the id of the item you want: ",
            name: "pickedItem"
        },
        {
            type: "input",
            message: "How many would you like?",
            name: "quantity"
        }
    ]).then(function(item) {
        if (inventory[item.pickedItem - 1].stock_quantity - item.quantity < 0) {
            console.log("\n-----------------------------------Insufficient quantity!-----------------------------------\n");
            console.log("-------------------------------------Please pick again!-------------------------------------\n");
            comeAgain();
        }
        else {
            purchaseItem(item.pickedItem, item.quantity, inventory);
        }
    })
}

//This function will display the table
function getData() {
    connection.query("select * from bamazonitems", function (err, res){
        if (err) {
            throw err;
        }
        itemChoice(res);
    });

}

function purchaseItem(id, quantity, inventory){
        var query = "UPDATE bamazonitems SET stock_quantity = " +  (inventory[id - 1].stock_quantity - quantity) + " WHERE item_id = " + id;
        connection.query(query, function (err, res){
            if (err) throw err;
            console.log("\n----------------Congrats! You've spent: " + quantity * inventory[id - 1].price + " dollars----------------------\n");
            comeAgain();
    });
}

function comeAgain() {
    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do next?",
            choices: ["Make Another Purchase", "Exit"],
            name: "confirm"
        }
    ]).then(function (response){
        if (response.confirm === "Make Another Purchase"){
            getData();
        }
        else {
            console.log("\n---------------------------------Good-Bye!---------------------------------")
            connection.end();
        }
    })
}

runProgram();
