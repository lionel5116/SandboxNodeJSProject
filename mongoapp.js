//this code was taken from the official docs
//https://mongodb.github.io/node-mongodb-native/3.5/quick-start/quick-start/

/*
To start the docker containers in detached mode (so you can still have your terminal)
docker compose up -d

To remove all running containers
docker compose down   

To stop
docker compose stop

To Start
Docker compose start

If you start and stop, you will not use your changes from the previous binding

MONGO DB COMMANDS
To run the mongo shell (command line) to see inside of the container
docker container ps
(grab the container id)

To get inside of the container's file system
docker exec -it 879cdc88d39f bash

This will take you inside of the container
To get to the mongo DB shell
mongo mongodb://localhost:27017 -u rootuser -p rootpass

And this gets you inside of the mongodb shell

To see your databases
show dbs;

To see other commands, see the other note for MongoDB Commands
*/

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://rootuser:rootpass@localhost:27017';

// Database Name
const dbName = 'lioneldb';

// Create a new MongoClient
const client = new MongoClient(url);

// Use connect method to connect to the Server
client.connect(function(err) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

const db = client.db(dbName);

  findDocuments(db, function() {
    client.close();
  });  

});

const findDocuments = function(db, callback) {
  // Get the student collection
  const collection = db.collection('student');
  // Find some documents
  collection.find({}).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(docs)
    callback(docs);
  });
}

