const { verifyToken } = require('../../../middlewares/authJwt')

const controller = require('../../../controllers/post.controller')

const router = require('express').Router()

const addResHeader = (req, res, next) => {
    res.header('Access-Control-Allow-Headers', 'x-access-token, Origin, Content-Type, Accept')
    next()
}

router.use(addResHeader)

router.post('/post/submit', verifyToken, controller.submitPost)
router.get('/post/all_posts', controller.getAllPosts)
router.get('/post/post', controller.getPost)

module.exports = router