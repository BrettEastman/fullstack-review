const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = new mongoose.Schema({
  id: {type:Number, unique: true},
  name: String,
  url: String
});

let Repo = mongoose.model('Repo', repoSchema);

// MODELS:
exports.save = (data) => {
  // data is an array of objects received from getReposByUsername
  console.log(data);
  const array = [];
  for (let repo of data) {
    let obj = {id: repo.id, name: repo.name, url: repo.html_url};
    array.push(obj);
  }
  return Repo.create(array);
}

// when you 'return' a promise it means you can use it with .then elsewhere
exports.getAll = () => {
  return Repo.find({}).sort('name').limit(25).exec();
}

// module.exports.save = save;
// module.exports.Repo = Repo;