const mongoose = require('mongoose');

const SerieSchema = mongoose.Schema({
  name: String,
  status: {
    type: String,
    enumValues: ['to-watch', 'watching', 'watched'] // define accepted values
  },
  comments: [String]
});

// register model in mongoose
const Serie = mongoose.model('Serie', SerieSchema);

module.exports = Serie;