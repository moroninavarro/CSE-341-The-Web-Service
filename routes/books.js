const express = require('express');
const router = express.Router();

const booksController = require('../controllers/books');
const validation = require('../middleware/validacion');
const { isAuthenticated } = require("../middleware/authenticate");


router.get('/', booksController.getAll);

router.get('/:id', booksController.getSingle);

router.post('/', isAuthenticated, validation.saveBooks, booksController.createBooks);

router.put('/:id', isAuthenticated, validation.saveBooks, booksController.updateBooks);

router.delete('/:id', isAuthenticated, booksController.deleteBooks);

module.exports = router;