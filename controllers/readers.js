const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

const getAllReader = async (req, res) => {
      //#swagger.tags=['readers']
  const result = await mongodb.getDatabase().collection('readers').find();
  result.toArray().then((readers) => {
    res.setHeader('content-Type', 'application/json');
    res.status(200).json(readers);
  });
};

const getSingleReader = async (req, res) => {
      //#swagger.tags=['readers']
      try {
        const readerId = req.params.id;

    // Verifica se o ID é válido antes de criar um ObjectId
    if (!ObjectId.isValid(readerId)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }

    const reader = await mongodb.getDatabase().collection('readers').findOne({ _id: new ObjectId(readerId) });

        if (reader) {
          res.setHeader('content-Type', 'application/json');
          res.status(200).json(reader);
        } else {
          res.status(404).json({ message: 'Reader not found' });
        }
      } catch (error) {
        res.status(500).json({ error: 'Invalid ID format or database error' });
      }
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
    const response = await mongodb.getDatabase().collection('readers').insertOne(reader);
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
  const response = await mongodb.getDatabase().collection('readers').replaceOne({_id:readerId},reader);
  if(response.modifiedCount > 0){
    res.status(204).send();
  } else{
    res.status(500).json(response.error || 'Some error ocurred while updating the reader information');
  }

};

const deleteReader = async (req, res) => {
      //#swagger.tags=['readers']
    const readerId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().collection('readers').deleteOne({_id:readerId});
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

