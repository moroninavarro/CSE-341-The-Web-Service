const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async(req, res) => {
    //#swagger.tags=['Contacts']
    const result = await mongodb.getDatabase().db().collection('songs').find();
    result.toArray().then((songs) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(songs);
    });
};

const getSingle = async(req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
    // res.status(400).json('Must use a valid song id to update a song.');
  
    //#swagger.tags=['Contacts']
    const songId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('songs').find({_id: songId});
    try{
        result.toArray().then((songs) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(songs[0]);
        });

    } catch (err) {
        res.status(400).json({ message: err});
    }
} else {
    res.status(400).json("Invalid ID entered. Please try again.");
}
};


const createSongs = async(req, res) => {
    //#swagger.tags=['Contacts']
    const song = {
        NameSong: req.body.NameSong,  
        Author: req.body.Author, 
        duration: req.body.duration, 
        releaseDate: req.body.releaseDate, 
        genre: req.body.genre, 
        language: req.body.language, 
        album: req.body.album
    };

    try{
        const response = await mongodb.getDatabase().db().collection('songs').insertOne(song);
        if (response.aknowledged) {
            res.status(204).send();
        } 

    } catch (error) {
            res.status(500).json(response.error);
            res.json(response.errored || "An error ocurred. Please try again.");
        }
};

const updateSongs = async(req, res) => {
    //#swagger.tags=['Contacts']
    if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid song id to update a song.');
  }
    const songId = new ObjectId(req.params.id);
    const song = {
        NameSong: req.body.NameSong,  
        Author: req.body.Author, 
        duration: req.body.duration, 
        releaseDate: req.body.releaseDate, 
        genre: req.body.genre, 
        language: req.body.language, 
        album: req.body.album
    };
     const response = await mongodb.getDatabase().db().collection('songs').replaceOne({_id:songId }, song);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error ocurred while updating the song.');
    }
};


const deleteSongs = async (req, res) => {
    //#swagger.tags=['Contacts']
    if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid song id to delete a song.');
  }
    const songId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('songs').deleteOne({_id:songId });
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error ocurred while updating the song.');
    }
};

module.exports = {
    getAll,
    getSingle,
    createSongs,
    updateSongs,
    deleteSongs
};