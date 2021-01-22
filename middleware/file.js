const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination:'./uploads/',
    filename(req,file,cb) {
        cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
const fileFilter = (req,file,cb) => {
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
        cb(null,true)
    } else {
        cb(null,false)
    }
}

module.exports = {
    storage,fileFilter
}