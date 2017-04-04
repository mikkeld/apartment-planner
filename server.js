var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;

var app = express();

// In production we simply serve the application from the /dist folder, 
// where our bundled application is located
if(process.env.NODE_ENV === 'production') {
  app.use(express.static(__dirname + "/dist"));
}
app.use(bodyParser.json());

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

// Connect to the database before starting the application server.
var DB_URI = process.env.MONGODB_URI || "mongodb://localhost/apartmentplannerdb";
mongodb.MongoClient.connect(DB_URI, function (err, database) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = database;

  /*db.collection('bucketlist', function (err, collection) {
    collection.remove({
      //_id: new mongodb.ObjectID("58716a64e7bc820e924154b3")
    });
  });*/

  // Initialize the app.
  var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
});

// API routes
app.get('/api/bucketlist', function(req, res) {
  db.collection('bucketlist').find({}).toArray(function(err, list) {
    res.status(200).json(list);
  });
});

app.post('/api/bucketlist', function(req, res) {
  db.collection('bucketlist').insertOne(req.body, function (err, item) {
    res.status(201).json(item.ops[0]);
  });
});

app.delete('/api/bucketlist/:id', function (req, res) {
  db.collection('bucketlist').deleteOne({_id: new ObjectID(req.params.id)}, function (err, item) {
    res.status(204).end();
  });
});
