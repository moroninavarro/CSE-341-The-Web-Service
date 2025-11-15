const validator = require('../helpers/validate');

const saveBooks = (req, res, next) => {
  const validationRule = {
    NameBook: 'required|string',
    Author: 'required|string',
    Pages: 'required|string'  
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
  saveBooks
};