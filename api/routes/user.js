const router = require('express').Router()
const authToken = require('../../middleware/token')
const {loginUser,registerUser,getMe} = require('../controllers/user')

router.post('/register', registerUser)
router.get('/me',authToken,getMe)
router.post('/login',loginUser)


module.exports = router