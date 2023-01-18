const axios = require('axios');
const config = require('../config.js');

let getReposByUsername = (name) => {
  // TODO - Use the axios module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out,
  // but you'll have to fill in the URL

  let options = {
    method: 'get',
    url: `https://api.github.com/users/${name}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  return axios(options)
    // when it gets the data, this will return a promise
}

// module.exports.getReposByUsername is
module.exports.getReposByUsername = getReposByUsername;