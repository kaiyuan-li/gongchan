var express = require('express');
const app = require('../../../../app');
const { verifyToken, isAdmin, isModerator } = require('../../../middlewares/authJwt')
var router = express.Router();
const verifySignUp = require('../../../middlewares/verifySignUp')
const authController = require('../../../controllers/auth.controller')

// All requests to this route will get it
router.use((req, res, next) => {
    res.header(
        'Access-Control-Allow-Headers',
        'x-access-token, Origin, Content-Type, Accept'
    )
    next()
})

router.post(
    '/auth/signup',
    verifySignUp.checkDuplicateUsernameOrEmail,
    verifySignUp.checkRolesExisted,
    verifySignUp.checkPassword,
    authController.signup
)

router.post('/auth/signin', authController.signin)

module.exports = router;