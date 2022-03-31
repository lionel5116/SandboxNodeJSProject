var mongoose = require('mongoose');

const studentSchema = new mongoose.Schema ({
    firstname:String,
    lastName:String,
    email:String,
    gender:String    
})

//mongodb collection, schemaname
//export the schema
module.exports = mongoose.model("student",studentSchema)