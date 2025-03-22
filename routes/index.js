const router = require('express').Router();

router.use(require('./swagger'));

router.get('/', (req,res) => {
    //#swagger.tags=['books']
     //#swagger.tags=['readers']
     
    res.send('Hello World');
});

router.use('/books', require('./books'));
router.use('/readers', require('./readers'));

module.exports = router;