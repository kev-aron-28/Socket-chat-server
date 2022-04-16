const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');
const { login, renovateJWT } = require('../controllers/auth');
const { validateJWT } = require('../middlewares/validateJWT');

router.post('/login',[
    check('email').isEmail(),
    check('password').not().isEmpty()
], login);

router.get('/', validateJWT, renovateJWT);

module.exports = router;