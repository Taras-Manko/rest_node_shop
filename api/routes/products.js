const router = require('express').Router()
const multer = require('multer')
const {storage,fileFilter} = require('../../middleware/file')
const upload = multer({storage,fileFilter})
const authToken = require('../../middleware/token')
const {getProducts,postProducts,getIdProducts,updateProducts,deletedProduct,postProductsImages} = require('../controllers/product')

router.get('/',authToken,getProducts )
router.post('/:id/images',authToken, upload.single('productImage'),postProductsImages)
router.post('/',authToken,postProducts)
router.get('/:id',authToken,getIdProducts)
router.put('/:id',authToken, updateProducts)
router.delete('/:id',authToken, deletedProduct)







module.exports = router