const mysql = require("mysql");
const inquirer = require("inquirer");

console.log(`
WELCOME TO BAMAZON
`)
const connection = mysql.createConnection({
    host: "localhost",
    
    port: 3306,
    
    user: "root",
    
    password: "Defsam1999",
    database: "bamazon"
});
function showStock(){
  connection.query("SELECT * FROM products", function(err, res){
    console.log(`
    ------------
    CURRENT STOCK
    ------------
    `)
    for (let i=0; i<res.length; i++){

        if (res[i].stock <= 0){
            price = "OUT OF STOCK"
        } else {
            price = `\$${res[i].price}`
        }
      console.log(`
      |  ${res[i].id}  |  ${res[i].product_name}  |  ${price}  |
      `)
    }
  })
}
function userPrompt(){
  inquirer
    .prompt([
        {
            type: "input",
            name: "productChoice",
            message: "What would you like to purchase? [INPUT ID]"
        },
        {
            type: "input",
            name: "quantChoice",
            message: "How many would you like to purchase?"
        }
    ]).then(function(answers){
        connection.query("SELECT * FROM products WHERE ?", { id: answers.productChoice }, function(err, res) {
            if (!answers.productChoice || !answers.quantChoice){
                console.log(`
                PLEASE INPUT A VALUE
                `)
            }
            if (res[0].stock - answers.quantChoice >= 0){
                console.log(`
                
                We'll ship that to you ASAP!
                
                `)
                connection.query("UPDATE products SET ? WHERE ?", [
                    {
                        stock: res[0].stock -= answers.quantChoice
                    },
                    {
                        id: answers.productChoice
                    }
                ], function(error){
                    if (error) throw error;
                });
                start();
            } else {
                console.log(`
                
                We don't have that many! **${res[0].stock} units left**
                
                `)
                start();
            };
        });
    });
};

connection.connect(function(err) {
    if (err) throw err;
});
function start(){
showStock();
userPrompt();
}
start()