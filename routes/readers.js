const express = require('express');
const { body, validationResult } = require("express-validator");

const router = express.Router();

const readersController = require('../controllers/readers');

router.get('/', readersController.getAllReader);

router.get('/:id', readersController.getSingleReader);

router.post(
    '/',
    [
      body("firstName").isString().withMessage("The first name must be a string."),
      body("lastName").isString().withMessage("The last name must be a string."),
    ],
    (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      
      readersController.createReader(req, res);
    }
  );
  router.put(
    '/:id',
    [
        body("firstName").isString().withMessage("The first name must be a string."),
        body("lastName").isString().withMessage("The last name must be a string."),
    ],
    (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      
      readersController.updateReader(req, res);
    }
  );
router.delete('/:id', readersController.deleteReader);

/**
 * @swagger
  * /readers:
 *   get:
 *     summary: Returns all readers
 *     description: Retrieves a list of all registered readers.
 *     responses:
 *       200:
 *         description: List of readers successfully returned
 *
 * /readers/{id}:
 *   get:
 *     summary: Returns a single reader
 *     description: Retrieves details of a reader by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Reader found
 *       404:
 *         description: Reader not found
 *
 *   put:
 *     summary: Updates an existing reader
 *     description: Modifies the details of a reader by ID.
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
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *     responses:
 *       200:
 *         description: Reader successfully updated
 *       400:
 *         description: Data validation error
 *       404:
 *         description: Reader not found
 *
 * /readers:
 *   post:
 *     summary: Adds a new reader
 *     description: Registers a new reader in the API.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *     responses:
 *       201:
 *         description: Reader successfully registered
 *       400:
 *         description: Data validation error
 *
 * /readers/{id}:
 *   delete:
 *     summary: Deletes a reader
 *     description: Removes a reader from the database by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Reader successfully deleted
 *       404:
 *         description: Reader not found
 */

module.exports = router;
