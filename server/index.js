const express = require('express');
const { getReposByUsername } = require('../helpers/github.js');
const { save } = require('../database/index.js');
// non-destructured version: const getReposByUsername = require('../helpers/github.js').getReposByUsername
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
      console.log(results);
    });
  save();
  res.sendStatus(200);

  //   if (err) {
  //     sendStatus(400);
  //   } else {
  //     status(201).json(result);
  //   }
  // });
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

console.log("??", getReposByUsername);
