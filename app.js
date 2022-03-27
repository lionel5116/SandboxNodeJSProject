//to load a module
//for path
//./ means that the file is located in the same folder
//../ means that the file is at the parent level
const myLogger = require('./logger')

//below is how import a built-in module (notice how we are not specifying a ./)
const path = require('path')
const os = require('os')
const fs = require('fs')

//emmitter module (is a build module class)
const EventEmitter = require('events')

//HTTP example
const http = require('http')



//notice above how use modules
//const or var = require('<modulename'>)
//this is just like
//import <Module Name> from '...somefile.js'

//user defined modules below
//you can define a function one of two ways (shown below)
function sayHello(name){
   console.log('Hello' + name) 
}

var sayHello2 = function(name) 
{
    console.log('Hello' + name) 
}

sayHello2("Rick James Bitch again !!");

myLogger.log("i am still Rick James Bitch!! from logger")
//if used export function only export, i could called it like below
//logger("i am still Rick James Bitch!! from logger")

//built - in modules below
//working with getting paths
var pathObj = path.parse(__filename);
console.log(pathObj)
var totalMemory = os.totalmem();
var freeMemory = os.freemem();
console.log('Total Memory ' + totalMemory);
console.log('Free  Memory', freeMemory);
console.log(`Free  Memory  ${freeMemory}`);
const files = fs.readdirSync('./')
console.log(files)

//declare an instance of the emmitter built-in class
const emmiter = new EventEmitter();
emmiter.addListener('messageLogged', function() {
    console.log('Listener called');
})
emmiter.emit('messageLogged');

//demo on how to create a web server
//const http = require('http')
const server = http.createServer((req,res) => {
    if (req.url === '/') {
        res.write('Hello World');
        res.end();
    }

    //register another route on our HTTP SERVER
    if(req.url === '/api/courses') {
        res.write(JSON.stringify([1,2,3]))
        res.end();
    }
})

//add a listener
server.on('connection',(socket) => {
    console.log("New connection...")
})

server.listen(3000);
console.log('Listening on PORT 3000')






