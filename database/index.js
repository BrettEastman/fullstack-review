const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = new mongoose.Schema({
  id: {type:Number, unique: true},
  name: {type:String, unique: true},
  url: {type:String, unique: true}
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (id, name, url) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  Repo.create({id: id, name: name, url: url})
}

module.exports.save = save;
module.exports.Repo = Repo;