const express = require('express');
const router = express.Router();

const songsController = require('../controllers/songs');
// const validation = require('../middleware/validate');

const { isAuthenticated } = require("../middleware/authenticate");

router.get('/', songsController.getAll);

router.get('/:id', songsController.getSingle);

router.post('/', isAuthenticated, songsController.createSongs);

router.put('/:id', isAuthenticated, songsController.updateSongs);

router.delete('/:id', isAuthenticated, songsController.deleteSongs);

module.exports = router;