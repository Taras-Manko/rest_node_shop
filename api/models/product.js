const {Schema,model} = require('mongoose')

const productSchema = new Schema({
   name:{
      type:String,
      minlength:3
      
   },
   price:{
      type:Number
   },
   productImage:{
      type:String
   },
   user:{
      type:Schema.Types.ObjectId,
      ref:'User'

   }

},{ timestamps:true })

module.exports = model('Product',productSchema)