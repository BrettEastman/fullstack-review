const express = require('express');
// const mongoose = require('mongoose');
const { getReposByUsername } = require('../helpers/github.js');
// non-destructured version: const getReposByUsername = require('../helpers/github.js').getReposByUsername
const { getAll, save } = require('../database/index.js');
// const { Repo } = require('../database/index.js');

let app = express();

// TODO - your code here!
// Set up static file service for files in the `client/dist` directory.
// Webpack is configured to generate files in that directory and
// this server must serve those files when requested.
app.use(express.static('client/dist'));
app.use(express.json());
// app.use(express.urlencoded());

app.post('/repos', function (req, res) {
  getReposByUsername(req.body.name)
    .then(function(results) { //results is an axios object, data is a property on that object
      console.log(results);
      // calling the save function returns the promise
      save(results.data).then(function(myResults) {
        res.sendStatus(201);
      })
      .catch(function(err) {
        console.log(err)
        res.sendStatus(400);
      });
    });
  // getAll here to send data? Other option would be to do a get request from the client side with an ajax get request
});

app.get('/repos', function (req, res) {
  // return res.json({ message: "Hello, World ✌️" });
  // TODO - your code here!
  // This route should send back the top 25 repos
  getAll()
    .then((data) => {
      res.send(data)
    })
  // return res.status(200).json(allRepos);
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

// console.log("??", getReposByUsername);
