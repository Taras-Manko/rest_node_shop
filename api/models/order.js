const {Schema,model} = require('mongoose')

const orderSchema = new Schema({
   product:{
       required:true,
       type:Schema.Types.ObjectId,
       ref:'Product'
   },
   quantity:{
       type:Number,
       default:1
   }

})

module.exports = model('Order',orderSchema)