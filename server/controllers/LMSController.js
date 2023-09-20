const { request } = require('express');
const { Query } = require('mongoose');
const LMSModel = require('../models/LMSModel');
const lmsModel = require('../models/LMSModel');

module.exports.getLMS = async (req, res) => {
  // console.log("req.query:", req.query)
  let lms,
    value = '';
  if (req.query?.BookTitle) {
    // /getall?bookRef=LIN
    value = req.query?.BookTitle;
    lms = await lmsModel.findOne({ BookTitle: value });
    // res.send(lms);
  } else {
    lms = await lmsModel.find();
    // res.send(lms);
  }
  res.send(lms);
};

module.exports.getbyid = async (req, res) => {
  const lms = await lmsModel.findById(req.query._id);
  res.send(lms);
};

module.exports.addLMS = async (req, res) => {
  const {
    BookRefNumber,
    BookTitle,
    AuthorName,
    PublicationName,
    PublishedDate,
    BookAge,
    copiesinstock,
    Currency,
    BookPrice,
    Bookratings,
    Audiobookavailable,
    AudiobookLink
  } = req.body;
  LMSModel.create({
    BookRefNumber,
    BookTitle,
    AuthorName,
    PublicationName,
    PublishedDate,
    BookAge,
    copiesinstock,
    Currency,
    BookPrice,
    Bookratings,
    Audiobookavailable,
    AudiobookLink
  }).then((data) => {
    // console.log(`Added Successfully: ${data}`);
    res.send({ data, ok: true });
  });
};

module.exports.updateLMS = async (req, res) => {
  const { _id, ...rest } = req.body;

  LMSModel.findByIdAndUpdate(_id, rest)
    .then(() => res.send('Updated succesfully'))
    .catch((err) => console.log(`Error while updating: ${err}`));
};

module.exports.deleteLMS = async (req, res) => {
  const { _id } = req.params;
  // console.log('ID is', _id);
  LMSModel.findByIdAndDelete(_id)
    .then(() => res.send('Deleted succesfully'))
    .catch((err) => console.log(`Error while Deleting: ${err}`));
};

module.exports.findOneUserDBService = async(req, res) => {
  const {_id} = req.paramas;
  LMSModel.findOne({name:BookRefNumber})
}