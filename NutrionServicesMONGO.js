//wire up cors
var cors = require('cors')

const express = require('express');
const app = express();
app.use(cors())
const PORT = 4095;

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');


app.get('/', function (req, res) {
    res.json({ "hello": "world" });
});

app.get('/api/ftbo', function (req, res) {
 
    //the @ in your password needs to be encoded as %40
    //https://www.mongodb.com/docs/atlas/troubleshoot-connection/#special-characters-in-connection-string-password
    var url ='mongodb+srv://lionel5116:Mag17615%40@cluster0.jwcnt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
    
    // Database Name
    const dbName = 'NutritionServices';

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
    const collection = db.collection('tblFoodsToBeOmmited');
    // Find some documents
    collection.find({}).toArray(function (err, docs) {
        assert.equal(err, null);
        console.log("Found the following records");
        //console.log(docs)
        callback(docs);
    });
}