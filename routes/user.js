const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');

const { createUser, updateUser, deleteUser, getUserById } = require('../controllers/user');
const { validateFields } = require('../middlewares');
const { emailExist, userByIdExists } = require('../helpers/dbValidators');

router.get('/:id', [
    check('id').isMongoId(),
    check('id').custom(userByIdExists),
    validateFields
], getUserById);

router.post('/', [
    check('name').not().isEmpty(),
    check('email').isEmail(),
    check('email').custom(emailExist),
    check('password').isLength({
        min: 6
    }),
    validateFields
], createUser);

router.put('/:id', [
    check('id').isMongoId(),
    check('id').custom(userByIdExists),
    validateFields
], updateUser);

router.delete('/:id', [
    check('id').isMongoId(),
    check('id').custom(userByIdExists),
    validateFields
], deleteUser);

module.exports = router;