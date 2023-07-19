const router = require('express').Router();
const userController = require('../controllers/controller.user');


router.get('/', userController.index);
router.post('/', userController.store);

router.get('/admin', userController.getAdmin);
router.get('/guest', userController.getGuest);

module.exports = router;