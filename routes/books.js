const express = require('express');
const router = express.Router();

const booksController = require('../controllers/books');
const validation = require('../middleware/validacion');

router.get('/', booksController.getAll);

router.get('/:id', booksController.getSingle);

router.post('/', validation.saveBooks, booksController.createBooks);

router.put('/:id', validation.saveBooks, booksController.updateBooks);

router.delete('/:id', booksController.deleteBooks);

module.exports = router;