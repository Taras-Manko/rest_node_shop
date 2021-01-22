const {Schema,model} = require('mongoose')

const userSchema = new Schema({
  email:{
      type:String,
      required:true
  },
  name:{
    type:String
  },
  phone:{
    type:String
  },
  password:{
      type:String,
      required:true
  }

})

module.exports = model('User',userSchema)