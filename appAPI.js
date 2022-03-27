//npm install mysql
//https://www.w3schools.com/nodejs/nodejs_mysql.asp

var mysql = require('mysql');
var http = require('http');

function Product() {
    this.product_id = 0
    this.name = ""
    this.quantity_in_stock = 0
    this.unit_price = 0
}

let lst_products = []
function getProducts(data,callback)
{
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Mag17615@",
    database: "sql_store"
  });

  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    lst_products = [];
    con.query("SELECT product_id,name,quantity_in_stock,unit_price FROM products", function (err, result) {
        if (err) throw err;
        Object.keys(result).forEach(key=>{
            var _product = new Product();
            _product.product_id = result[key].product_id
            _product.name = result[key].name
            _product.quantity_in_stock = result[key].quantity_in_stock
            _product.unit_price = result[key].unit_price
    
            lst_products.push(_product)
            
        })

        return callback(lst_products);
      });  //con.query(
   }); //con.connect(
}

const server = http.createServer((req,res) => {
    if (req.url === '/') {
        res.write('Hello World');
        res.end();
    }

    //register another route on our HTTP SERVER
    if(req.url === '/api/products') {
        var param = ""
        getProducts(param,function(result){
      
            //console.log("Resutls from MYSQL CALL..")
            //console.log(result)
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
            res.setHeader('Access-Control-Max-Age', 2592000); // 30 days
            res.write(JSON.stringify(result))
            res.end();
        });
    }
})

server.listen(4000);
console.log('Listening on PORT 4000')



 