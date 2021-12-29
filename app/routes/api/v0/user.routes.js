const { verifyToken, isAdmin, isModerator } = require('../../../middlewares/authJwt')

const controller = require('../../../controllers/user.controller')

const router = require('express').Router()

const addResHeader = (req, res, next) => {
    res.header('Access-Control-Allow-Headers', 'x-access-token, Origin, Content-Type, Accept')
    next()
}
router.use(addResHeader)

router.get('/all', controller.allAccess)

router.get('/user', verifyToken, controller.userBoard)

router.get('/mod', verifyToken, isModerator, controller.moderatorBoard)

router.get('/admin', verifyToken, isAdmin, controller.adminBoard)

router.get('/allusers', controller.allUsers)

module.exports = router