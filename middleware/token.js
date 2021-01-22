
const jwt = require('jsonwebtoken')

const key = require('../config/app')

module.exports = (req,res,next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decode = jwt.verify(token,key.JWT)
        req.userData = decode
        next()

    } catch (error) {
        console.log(error)
    }
}