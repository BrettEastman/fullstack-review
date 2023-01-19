const express = require('express');
// const mongoose = require('mongoose');
const { getReposByUsername } = require('../helpers/github.js');
// non-destructured version: const getReposByUsername = require('../helpers/github.js').getReposByUsername
const { save } = require('../database/index.js');
const { Repo } = require('../database/index.js');

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
    .then(function(results) {
      let id = results.data[0].id;
      let name = results.data[0].name;
      let url = results.data[0].owner.url;
      console.log('getReposByUsername results.data[0].owner.url', results.data[0].owner.url);
      save(id, name, url);
    })
  res.sendStatus(201);
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
});

app.get('/repos', function (req, res) {
  // return res.json({ message: "Hello, World ✌️" });
  // TODO - your code here!
  // This route should send back the top 25 repos
  const allRepos = Repo.find({}).sort('-name').limit(25).exec();
  return res.status(200).json(allRepos);
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

// console.log("??", getReposByUsername);
