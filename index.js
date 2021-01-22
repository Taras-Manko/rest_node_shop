const express = require('express')
const app = express()
const port = 3000 || process.env.port
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const key = require('./config/app')
const routerProducts = require('./api/routes/products')
const userProducts = require('./api/routes/user')

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use('/uploads',express.static('uploads'))

app.use('/api/items',routerProducts)
app.use('/api',userProducts)

app.use((req,res,next) => {
    const error = new Error('Not found')
    error.status = 404
    next(error)
})
app.use((error,req,res,next) => {
    res.status(error.status || 500)
    res.json({
        error:{
            message:error.message
        }
    })
})

async function start() {
      await mongoose.connect(key.uri,{
          useFindAndModify:false,
          useUnifiedTopology:true,
          useNewUrlParser:true
      })
       app.listen(port, () => console.log(`Example app listening on port port!`))
}

start()