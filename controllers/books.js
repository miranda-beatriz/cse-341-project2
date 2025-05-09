const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

const getAll = async (req, res) => {
      //#swagger.tags=['books']
  const result = await mongodb.getDatabase().collection('books').find();
  result.toArray().then((books) => {
    res.setHeader('content-Type', 'application/json');
    res.status(200).json(books);
  });
};

const getSingle = async (req, res) => {
      //#swagger.tags=['books']
      try {
        const bookId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().collection('books').findOne({ _id: bookId });
    
        if (result) {
          res.setHeader('content-Type', 'application/json');
          res.status(200).json(result);
        } else {
          res.status(404).json({ message: 'Book not found' });
        }
      } catch (error) {
        res.status(500).json({ error: 'Invalid ID format or database error' });
      }
    };

const createBook = async (req, res) => {
      //#swagger.tags=['books']
    const book = {
      title: req.body.title,
      author: req.body.author,
      genre: req.body.genre,
      publication_year: req.body.publication_year,
      publisher: req.body.publisher,
      isbn: req.body.isbn,
      pages: req.body.pages,
      summary:req.body.summary
    };
    const response = await mongodb.getDatabase().collection('books').insertOne(book);
    if(response.acknowledged){
      res.status(204).send();
    } else{
      res.status(500).json(response.error || 'Some error ocurred while updating the book information');
    }

};

const updateBook = async (req, res) => {
      //#swagger.tags=['books']
  const bookId = new ObjectId(req.params.id);
  const book = {
    title: req.body.title,
    author: req.body.author,
    genre: req.body.genre,
    publication_year: req.body.publication_year,
    publisher: req.body.publisher,
    isbn: req.body.isbn,
    pages: req.body.pages,
    summary:req.body.summary
  };
  const response = await mongodb.getDatabase().collection('books').replaceOne({_id:bookId},book);
  if(response.modifiedCount > 0){
    res.status(204).send();
  } else{
    res.status(500).json(response.error || 'Some error ocurred while updating the book information');
  }

};

const deleteBook = async (req, res) => {
      //#swagger.tags=['books']
    const bookId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().collection('books').deleteOne({_id:bookId});
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else{
      res.status(500).json(response.error || 'Some error ocurred while deleting the book information.');
    }
    
};


module.exports = {
  getAll,
  getSingle,
  createBook,
  updateBook,
  deleteBook
};

