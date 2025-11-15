const validator = require('../helpers/validate');

const saveSong = (req, res, next) => {
  const validationRule = {
    NameSong: 'required|string',
    Author: 'required|string',
    duration: 'required|string',
    releaseDate: 'required|string',
    genre: 'required|string',
    language: 'required|string',
    album: 'required|string'
     
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

module.exports = {
  saveSong
};