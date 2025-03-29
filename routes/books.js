const express = require('express');
const { body, validationResult } = require("express-validator");

const router = express.Router();

const booksController = require('../controllers/books');

const {isAuthenticated} = require("../middleware/authenticate");


router.get('/', async (req, res) => {
  try {
      await booksController.getAll(req, res);
  } catch (error) {
      console.error('Error fetching books:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
});
router.get('/:id', async (req, res) => {
  try {
      await booksController.getSingle(req, res);
  } catch (error) {
      console.error('Error fetching book:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
});


router.post(
  "/",
  isAuthenticated,
  [
      body("title").isString().withMessage("The title must be a string."),
      body("author").isString().withMessage("The author must be a string."),
      body("genre").isString().withMessage("The genre must be a string."),
      body("publication_year")
          .isInt({ min: 1800 })
          .withMessage("The publication year must be an integer greater than 1800."),
      body("publisher").isString().withMessage("The publisher must be a string."),
      body("isbn").isString().withMessage("The ISBN must be a string."),
      body("pages")
          .isInt({ min: 1 })
          .withMessage("The pages must be an integer greater than 0."),
      body("summary").isString().withMessage("The summary must be a string."),
  ],
  async (req, res) => {
      try {
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
              return res.status(400).json({ errors: errors.array() });
          }
          await booksController.createBook(req, res);
      } catch (error) {
          console.error('Error creating book:', error);
          res.status(500).json({ message: 'Internal server error' });
      }
  }
);

router.put(
  '/:id',
  isAuthenticated,
  [
      body("title").optional().isString().withMessage("The title must be a string."),
      body("author").optional().isString().withMessage("The author must be a string."),
      body("year").optional().isInt({ min: 1800 }).withMessage("The year must be an integer greater than 1800."),
  ],
  async (req, res) => {
      try {
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
              return res.status(400).json({ errors: errors.array() });
          }
          await booksController.updateBook(req, res);
      } catch (error) {
          console.error('Error updating book:', error);
          res.status(500).json({ message: 'Internal server error' });
      }
  }
);

router.delete('/:id',isAuthenticated, async (req, res) => {
  try {
      await booksController.deleteBook(req, res);
  } catch (error) {
      console.error('Error deleting book:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
});


/**
 * @swagger
 * /books:
 *   get:
 *     summary: Returns all books
 *     description: Retrieves a list of all registered books.
 *     responses:
 *       200:
 *         description: List of books successfully returned
 *
 * /books/{id}:
 *   get:
 *     summary: Returns a single book
 *     description: Retrieves details of a book by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Book found
 *       404:
 *         description: Book not found
 *
 *   put:
 *     summary: Updates an existing book
 *     description: Modifies the details of a book by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               year:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Book successfully updated
 *       400:
 *         description: Data validation error
 *       404:
 *         description: Book not found
 *
 * /books:
 *   post:
 *     summary: Adds a new book
 *     description: Registers a new book in the API.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - author
 *               - year
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               year:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Book successfully registered
 *       400:
 *         description: Data validation error
 *
 * /books/{id}:
 *   delete:
 *     summary: Deletes a book
 *     description: Removes a book from the database by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Book successfully deleted
 *       404:
 *         description: Book not found
 */

module.exports = router;
