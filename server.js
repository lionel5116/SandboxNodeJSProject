//https://appdividend.com/2022/03/05/how-to-setup-node-express-and-mongodb-in-docker/
/*
const express = require('express');
const app = express();
const mongodb = require('mongodb');
*/

/*
const config = require('./db');
const PORT = 4000;
const client = mongodb.MongoClient;

client.connect(config.DB, function(err, db) {
    if(err) {
        console.log('database is not connected')
    }
    else {
        console.log('connected!!')
    }
});
*/

//wire up cors
var cors = require('cors')

const express = require('express');
const app = express();
app.use(cors())
const PORT = 4090;

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');




app.get('/', function (req, res) {
    res.json({ "hello": "world" });
});

app.get('/api/students', function (req, res) {
    // Connection URL
    const url = 'mongodb://rootuser:rootpass@localhost:27017';

    // Database Name
    const dbName = 'lioneldb';

    // Create a new MongoClient
    const client = new MongoClient(url);

    // Use connect method to connect to the Server
    client.connect(function (err) {
        assert.equal(null, err);
        console.log("Connected successfully to server");

        const db = client.db(dbName);

        findDocuments(db, function (response) {
            res.json(response)
            client.close();
        });

    });

});

app.listen(PORT, function () {
    console.log('Your node js server is running on PORT:', PORT);
});

const findDocuments = function (db, callback) {
    // Get the student collection
    const collection = db.collection('student');
    // Find some documents
    collection.find({}).toArray(function (err, docs) {
        assert.equal(err, null);
        console.log("Found the following records");
        //console.log(docs)
        callback(docs);
    });
}