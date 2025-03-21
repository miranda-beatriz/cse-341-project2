const express = require('express');
const { body, validationResult } = require("express-validator");

const router = express.Router();

const booksController = require('../controllers/books');

router.get('/', booksController.getAll);

router.get('/:id', booksController.getSingle);

router.post(
    '/',
    [
      body("title").isString().withMessage("The title must be a string."),
      body("author").isString().withMessage("The author must be a string."),
      body("year").isInt({ min: 1800 }).withMessage("The year must be an integer greater than 1800."),
    ],
    (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      
      booksController.createBook(req, res);
    }
  );
  router.put(
    '/:id',
    [
      body("title").optional().isString().withMessage("The title must be a string."),
      body("author").optional().isString().withMessage("The author must be a string."),
      body("year").optional().isInt({ min: 1800 }).withMessage("The year must be an integer greater than 1800."),
    ],
    (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      
      booksController.updateBook(req, res);
    }
  );
router.delete('/:id', booksController.deleteBook);

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
