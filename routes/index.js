const router = require('express').Router();

router.use('/', require('./swagger'));

router.get('/', (req, res) => { 
    res.send('Hello World');
});

router.use('/songs', require('./songs'));

router.use('/books', require('./books'));

router.get('/login', passport.authenticate('github'), (req, res) =>{});
router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
    });


module.exports = router;