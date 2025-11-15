const express = require('express');
const router = express.Router();

const booksController = require('../controllers/books');
const validation = require('../middleware/validate');

router.get('/', booksController.getAll);

router.get('/:id', booksController.getSingle);

router.post('/', validation.saveSong, booksController.createSongs);

router.put('/:id', validation.saveSong, booksController.updateSongs);

router.delete('/:id', booksController.deleteSongs);

module.exports = router;