var mysql = require("mysql");

var inquirer = require("inquirer");

// call once somewhere in the beginning of the app
//https://www.npmjs.com/package/console.table
const cTable = require('console.table');

var connection = mysql.createConnection({

    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "bamazon"

});

//This function will ask the user if they want to continue shopping, restarting the start() function if 
//yes and ending the connection if no//
function buyMore(){

    inquirer.prompt([{
        name: "Continue",
        type: "list",
        message: "Continue shopping?",
        choices: ["Yes please!", "No thanks!"]
    }

])
.then(function(answer) {
   
    if (answer.Continue === "Yes please!") {
        start();
    
    } else {

        connection.end();
   
    }

});

};

//start() function contains the app// 
function start() {

    // Selects the database from mysql
    connection.query("SELECT * FROM products", function (err, results) {

        if (err) throw err;

        //displays the table 
        console.table(results);

        var itemList = [];

        //this function will move all of the products from the mysql table into an array
        for (var i = 0; i < results.length; i++) {

            // Push products to choice array
            itemList.push(results[i].product_name);

        }

        //this creates a line for aesthetic
        console.log('\n  ');

        //this prompt will ask the user which item they want to buy
        inquirer.prompt([{
            name: "Purchase",
            type: "input",
            message: "Welcome to Bamazon, which item would you like to purchase? (Please enter product ID number) [Press Ctr + C to quit]",
            choices: itemList
        },

        //this prompt will ask the user how much of the selected item they would like to purchase
        {
            name: "stock",
            type: "input",
            message: "How much/many would you like to buy? (Enter number) [Press Ctr + C to quit]",

        }
        ])
            .then(function (answer) {

                //creating a stock variable that will check the respective stock of the selected
                //item from the "Purchase" prompt in the sql table if it exists.
                //i subtracted 1 because arrays start at postion 0 but the items in the table
                //begin at 1
                var stock = results[answer.Purchase - 1].stock_quantity;

                //this variable takes the saved number from the "stock" prompt and subtracts it from the 
                //stock value in the table. 
                var updatedStock = stock - answer.stock;

                //this conditional checks to see if the requested stock is less than the total.
                //if this is the case it will subtract and update the mysql database.
                if (answer.stock <= stock) {
                    connection.query(

                        "UPDATE products SET ? WHERE ?",
                        [
                            {
                                //the new stock value will now replace the old one
                                stock_quantity: updatedStock
                            },
                            {
                                //this tells the program where to change the stock number, i.e. at the 
                                //respective position of the chosen item
                                id: answer.Purchase
                            }
                        ],

                        function (err) {

                            //this is a validation check to make sure the userinput is valid 
                            if (err) throw err;

                            //this variable will grab the price of the matching item
                            var cost = results[answer.Purchase - 1].price;
                            
                            //this variable will multiply the price of the selected item by the amount of stock
                            var totalCost = answer.stock * cost;

                            console.log("Thank you for your purchase!");
                            console.log("You're total is: " + "$" + totalCost);
                            buyMore();

                          
                        }
                    );

                }

                //this is the conditional incase the user requests too much stock or there is not
                //enough stock left
                else if (answer.stock > stock) {

                    console.log("Insufficient stock! Please pick another item");
                    buyMore();

               
                }
            });
    }
    );
};


   





//checks for connection, if successful run start()
connection.connect(function (err) {

    if (err) throw err;

    start();

});






