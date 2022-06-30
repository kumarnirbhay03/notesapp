const mongoose = require('mongoose');

// Note Schema
const noteschema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String
    // required: true
  },
  body: {
    type: String,
    required: true
  },
  date: {
    type: String
    // required: true
  }
});
const Note = mongoose.model('Note', noteschema);
module.exports.Note = Note;