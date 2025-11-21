const { response } = require('express');
const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async(req, res) => {
    //#swagger.tags=['Contacts']
    const result = await mongodb.getDatabase().db().collection('books').find();
    result.toArray().then((books) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(books);
    });
};

const getSingle = async(req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
    // res.status(400).json('Must use a valid book id to update a book.');
  
    //#swagger.tags=['Contacts']
    const bookId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('books').find({_id: bookId});
    try {
        result.toArray().then((books) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(books[0]);
        });
    } catch (err) {
        res.status(400).json({ message: err});
    }
} else {
    res.status(400).json("Invalid ID entered. Please try again.");
}
};


const createBooks = async(req, res) => {
    //#swagger.tags=['Contacts']
    const book = {
        NameBook: req.body.NameBook, 
        Author: req.body.Author, 
        Pages: req.body.Pages 
    };
    try {
        const response = await mongodb.getDatabase().db().collection('books').insertOne(book);
        if (response.aknowledged) {
            console.log((response.insertedId));
            res.status(204).send(response);
        }
    } catch (error) {
        res.status(500).json(response.error);
        res.json(response.errored || "An error ocurred. Please try again.");
    }

};

const updateBooks = async(req, res) => {
    //#swagger.tags=['Contacts']
    if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid book id to update a book.');
  }
    const bookId = new ObjectId(req.params.id);
    const book = {
        NameBook: req.body.NameBook, 
        Author: req.body.Author, 
        Pages: req.body.Pages 
    };
     const response = await mongodb.getDatabase().db().collection('books').replaceOne({_id:bookId }, book);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error ocurred while updating the book.');
    }
};


const deleteBooks = async (req, res) => {
    //#swagger.tags=['Contacts']
    if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid book id to delete a book.');
  }
    const bookId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('books').deleteOne({_id:bookId});
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error ocurred while updating the book.');
    }
};

module.exports = {
    getAll,
    getSingle,
    createBooks,
    updateBooks,
    deleteBooks
};