var express = require('express');
const app = require('../../../../app');
const { getAds, deleteAd, updateAd, insertAd } = require('../../../database/ads');
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
    authController.signup
)

// router.post('/auth/signin', controller.signin)

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).json({ message: "hello, welcome to api v0"})
});

router.get('/ads', async (req, res) => {
    res.send(await getAds())
})

router.delete('/ads/:id', async (req, res) => {
    await deleteAd(req.params.id)
    res.send({message: 'ad removed'})
})

router.put('/ads/:id', async (req, res) => {
    const updatedAd = req.body
    await updateAd(req.params.id, updatedAd)
    res.send({message: 'ad updated'})
})

router.post('/ads', async (req, res) => {
    const newAd = req.body
    await insertAd(newAd)
    res.send({message: 'new ad inserted'})
})


module.exports = router;