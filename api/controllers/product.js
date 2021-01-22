const Product = require('../models/product')
const multer = require('multer')
const {
    storage,
    fileFilter
} = require('../../middleware/file')

const getProducts = async (req, res) => {
    await Product.find()
        .then(prod => {
            const response = {
                count: prod.length,
                products: prod.map(p => {
                    return {
                        name: p.name,
                        price: p.price,
                        id: p._id,
                        productImage: p.productImage
                    }
                })
            }
            res.json(response)
        })
        .catch(err => {
            res.status(500).json({
                error: err.message
            })
        })
}

const postProducts = async (req, res) => {

    const product = new Product({
        name: req.body.name,
        price: req.body.price
    })
    await product.save((err, prod) => {
        if (err) {
            console.log(err)
        }
        if (prod) {
            res.status(201).json({
                mes: 'Products Created',
                product
            })
        }
    })

}

const postProductsImages = async (req, res) => {
    const user = await findById(req.params.id)
    if(user) {
        user = new Product({
            productImage: req.file.path
        })
        await product.save((err, prod) => {
            if (err) {
                console.log(err)
            }
            if (prod) {
                res.status(201).json({
                    mes: 'Products Created',
                    product
                })
            }
        })
    } else {
        res.status(404).json({
            message:"User is not found"
        })
    }
    

}

const getIdProducts = async (req, res) => {
    const id = req.params.id
    await Product.findById(id)
        .exec()
        .then(prod => {
            console.log(prod)
            res.status(200).json(prod)
        })
        .catch(err => console.log(err.message))

}

const updateProducts = async (req, res) => {
    const {title} = req.body
        if(title.value.length < 3 ) {
            res.sendStatus(422).json({
                message:"Title should contain at least 3 characters"
            })
        }
    try {
        await Product.findOneAndUpdate(req.params.id, req.body)
        res.status(200).json({
            message: 'updated'
        })

    } catch (error) {
        res.json(error.message)
    }

}

const deletedProduct = async (req, res) => {
    await Product.findOneAndDelete({
            _id: req.params.id
        }).exec()
        .then(del => {
            res.json({
                message: "Products deleted",
                del
            })
        })
        .catch(err => {
            res.status(500).json(err)
        })

}

module.exports = {
    getProducts,
    postProducts,
    getIdProducts,
    updateProducts,
    deletedProduct,
    postProductsImages
}