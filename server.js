const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');
const ObjectID = mongodb.ObjectID;
const MONGODB_URI= 'mongodb://aridozahero:testingalpha1@ds033106.mlab.com:33106/heroku_sm4hhq85';

const CONTACTS_COLLECTION = "contacts";

const app = express();
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

// Create a database variable outside the database connection callback to reuse the connection pool in your app
const db;

// Connect to the database before starting the application server
mongodb.MongoClient.connect(process.env.MONGODB_URI, function (err, database) {
  if (err){
    console.log(err);
    process.exit(1);
  }

  // Save the database object from the callback for reuse
  db = database;
  console.log("Database connection ready");

  // Initialize the app
  const server = app.listen(process.env.PORT || 8080, function() {
    const port = server.address().port;
    console.log("App now running on port", port);
  });
});

  // CONTACTS API ROUTES BELOW

  // Generic error handler used by all endpoints
  function handleError(res, reason, message, code) {
    console.log("ERROR: " + reason);
    res.status(code || 500).json({"error": message});
  }

  app.get("/contacts", function(req, res) {
    // db.collection(CONTACTS_COLLECTION).find({}).toArray(function(err, docs) {
    //   if (err) {
    //     handleError(res, err.message, "Failed to get contacts");
    //   } else {
    //     res.status(200).json(docs);
    //   }
    // });
  });

  app.post("/contacts", function(req, res) {
    const newContact = req.body;
    newContact.createDate = new Date();

    if (!(req.body.firstName || req.body.lastName)) {
      handleError(res, "Invalid user input", "Must provide a first or last name", 400);
    }

    db.collection(CONTACTS_COLLECTION).insertOne(newContact, function(err, doc) {
      if (err) {
        handleError(res, err.message, "Failed to create new contact");
      } else {
        res.status(201).json(doc.ops[0]);
      }
    });
  });

  // "/contacts/:id"
  //   GET: find contact by id
  //   PUT: update contact by id
  //   DELETE: delete contact by id

  app.get("/contacts/:id", function(req, res) {
    // db.collection(CONTACTS_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
    //   if (err) {
    //     handleError(res, err.message, "Failed to get contact");
    //   } else {
    //     res.status(200).json(doc);
    //   }
    // });
  });

  app.put("/contacts/:id", function(req, res) {
    // const updateDoc = req.body;
    // delete updateDoc._id;
    //
    // db.collection(CONTACTS_COLLECTION).updateOne({_id: new ObjectID(req.params.id)}, updateDoc, function(err, doc) {
    //   if (err) {
    //     handleError(res, err.message, "Failed to update contact");
    //   } else {
    //     res.status(204).end();
    //   }
    // });
  });

  app.delete("/contacts/:id", function(req, res) {
    // db.collection(CONTACTS_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
    //   if (err) {
    //     handleError(res, err.message, "Failes to delete contact");
    //   } else {
    //     res.status(204).end();
    //   }
    // });
  });
