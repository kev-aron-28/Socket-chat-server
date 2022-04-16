const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');
const { getMessages } = require('../controllers/message');
const { userByIdExists } = require('../helpers/dbValidators');

router.get('/',[
    check('to').isMongoId(),
    check('from').isMongoId(),
    check('to').custom(userByIdExists),
    check('from').custom(userByIdExists)
], getMessages);


module.exports = router;