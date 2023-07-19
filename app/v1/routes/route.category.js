const router = require('express').Router();

const categoryController = require('../controllers/controller.category');

router.get('/', categoryController.index);
router.post('/', categoryController.store);
router.get('/:id', categoryController.show);
router.delete('/:id', categoryController.destroy);
router.put('/:id', categoryController.update);

module.exports = router;