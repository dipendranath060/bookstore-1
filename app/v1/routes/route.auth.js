const router = require('express').Router();
const authController = require('../controllers/controller.auth');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/refresh-token', authController.refreshToken);

module.exports = router;