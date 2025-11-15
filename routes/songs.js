const express = require('express');
const router = express.Router();

const songsController = require('../controllers/songs');
const validation = require('../middleware/validate');

router.get('/', songsController.getAll);

router.get('/:id', songsController.getSingle);

router.post('/', songsController.createSongs);

router.put('/:id', songsController.updateSongs);

router.delete('/:id', songsController.deleteSongs);

module.exports = router;