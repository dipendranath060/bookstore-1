const router = require('express').Router();

const bookController = require('../controllers/controller.book');

router.get('/', bookController.index);
router.post('/', bookController.store);
router.get('/:id', bookController.show);
router.delete('/:id', bookController.destroy);
router.put('/:id', bookController.update);

module.exports = router;