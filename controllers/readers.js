const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

const getAllReader = async (req, res) => {
      //#swagger.tags=['readers']
  const result = await mongodb.gettDatabase().db().collection('readers').find();
  result.toArray().then((readers) => {
    res.setHeader('content-Type', 'application/json');
    res.status(200).json(readers);
  });
};

const getSingleReader = async (req, res) => {
      //#swagger.tags=['readers']
  const readerId = new ObjectId(req.params.id);
  const result = await mongodb.gettDatabase().db().collection('readers').find({ _id:readerId });
  result.toArray().then((readers) => {
    res.setHeader('content-Type', 'application/json');
    res.status(200).json(readers[0]);
  });
};

const createReader = async (req, res) => {
      //#swagger.tags=['readers']
    const reader = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      birthday: req.body.birthday,
      favorite_gender: req.body.favorite_gender
    };
    const response = await mongodb.gettDatabase().db().collection('readers').insertOne(reader);
    if(response.acknowledged){
      res.status(204).send();
    } else{
      res.status(500).json(response.error || 'Some error ocurred while updating the reader information');
    }

};

const updateReader = async (req, res) => {
      //#swagger.tags=['readers']
  const readerId = new ObjectId(req.params.id);
  const reader = {
    firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      birthday: req.body.birthday,
      favorite_gender: req.body.favorite_gender
  };
  const response = await mongodb.gettDatabase().db().collection('readers').replaceOne({_id:readerId},reader);
  if(response.modifiedCount > 0){
    res.status(204).send();
  } else{
    res.status(500).json(response.error || 'Some error ocurred while updating the reader information');
  }

};

const deleteReader = async (req, res) => {
      //#swagger.tags=['readers']
    const readerId = new ObjectId(req.params.id);
    const response = await mongodb.gettDatabase().db().collection('readers').deleteOne({_id:readerId});
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else{
      res.status(500).json(response.error || 'Some error ocurred while deleting the reader information.');
    }
    
};


module.exports = {
  getAllReader,
  getSingleReader,
  createReader,
  updateReader,
  deleteReader
};

