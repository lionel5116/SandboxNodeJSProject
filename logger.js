//demos how to create and use a module

var url = 'http://mylogger.io/log';

function log(message){
    console.log(message)
}

//make the variables and functions available to 
//other parts of the program
//export the function
//below exports the module as an object
module.exports.log = log;
//export a variable
module.exports.url = url;

//if you want to just export the function
//module.exports = log