const mongoose = require('mongoose');
const lmsSchema = new mongoose.Schema({
  BookRefNumber: {
    type: String,
    require: true
  },
  BookTitle: {
    type: String,
    require: true
  },
  AuthorName: {
    type: String,
    require: true
  },
  PublicationName: {
    type: String,
    require: true
  },
  PublishedDate: {
    type: String,
    require: true
  },
  BookAge: {
    type: String,
    require: true
  },
  copiesinstock: {
    type: Number,
    require: true
  },
  Currency: {
    type: String,
    require: true
  },
  BookPrice: {
    type: Number,
    require: true
  },
  Bookratings: {
    type: String,
    require: true
  },
  Audiobookavailable: {
    type: Boolean,
    require: true
  },
  AudiobookLink: {
    type: String
  }
});

module.exports = mongoose.model('LMS', lmsSchema);
