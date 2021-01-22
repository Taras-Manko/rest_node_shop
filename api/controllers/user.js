const User = require('../models/user')
const bcrypt = require('bcrypt')
const key = require('../../config/app')
const jwt = require('jsonwebtoken')


const registerUser = async (req, res) => {

    const isEmail = await User.findOne({
        email: req.body.email
    })
    if (isEmail) {
        return res.status(409).json({
            message: "email already"
        })

    } else {
        const hashPass = await bcrypt.hash(req.body.password, 10)
        const user = new User({
            email: req.body.email,
            name:req.body.name,
            phone:req.body.phone,
            password: hashPass
        })
        await user.save()

    }

}


const loginUser = async (req,res) => {
    const user = await User.findOne({email: req.body.email})
    if(user) {
       const isPass = await bcrypt.compare(req.body.password,user.password)
       if(isPass) {
           const token = jwt.sign({
               userId:user._id,
               email:user.email
           },
           key.JWT,
           {
               expiresIn:'1h'
           }
           );
           return res.status(200).json({
               message:"Succses",
               token
           })
       } else {
           res.status(500).json({
               message:"Password in correct"
           })
       }
    } else {
        res.status(404).json({
            message:"User is not found"
        })
    }
 }


module.exports = {registerUser,loginUser}