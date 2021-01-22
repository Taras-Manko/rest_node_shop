const router = require('express').Router()
const {loginUser,registerUser} = require('../controllers/user')

router.post('/signup', registerUser)

router.post('/signin',loginUser)


module.exports = router