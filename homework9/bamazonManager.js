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

function runProgram() {
    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            choices: ["View Products for Sale", "View Low Inventory", "Add To Inventory", "Exit"],
            name: "userChoice"
        }
    ]).then(function (inquirerResponse) {
        userChoice = inquirerResponse.userChoice;
        switchChoices(userChoice);
    })
}

//Switch function

function switchChoices(userChoice) {
    switch (userChoice) {
        case "View Products for Sale":
            viewProducts();
            break;
        case "View Low Inventory":
            viewInventory();
            break;
        case "Add To Inventory":
            addInventory();
            break;
        case "Exit":
            exit();
            break;
    }
}

function viewProducts() {
    connection.query("select * from bamazonitems", function (err, res) {
        if (err) {
            throw err;
        }
        console.log("\n");
        console.table(res);
        console.log("\n");
        runProgram();
    });
}

function viewInventory() {
    connection.query("select * from bamazonitems WHERE stock_quantity < 5;", function (err, res) {
        if (err) {
            throw err;
        }
        console.log("\n");
        console.table(res);
        console.log("\n");
        runProgram();
    });
}

function addInventory() {
    inquirer.prompt([
        {
            type: "input",
            message: "What item id would you like to increase?",
            name: "pickedItem"
        },
        {
            type: "input",
            message: "How much would you like to add?",
            name: "increaseAmount"
        }
    ]).then(function (result){ 
        var stockIncrease = result.increaseAmount;
        var itemID = result.pickedItem;
        connection.query("select stock_quantity from bamazonitems WHERE item_id = " + itemID + ";", function (err, res) {
            if (err) {
                throw err;
            }
            console.log(res);
            var newStock = parseInt(res[0].stock_quantity) + parseInt(stockIncrease);
            connection.query("UPDATE bamazonitems SET stock_quantity = " + newStock + " WHERE item_id = " + itemID + ";", function (err, res) {
                if (err) {
                    throw err;
                }
                viewProducts();
            });
        });


    });

}

function exit(){
    console.log("\n---------------------------------Good-Bye!---------------------------------")
    connection.end();
}
runProgram();