const Product = require('../models/product')
const User = require('../models/user')
const multer = require('multer')
const {
    storage,
    fileFilter
} = require('../../middleware/file')
const { findByIdAndUpdate } = require('../models/product')

const getProducts = async (req, res) => {
    await Product.find()
        .populate('user')
        .then(prod => {
            const response = {
                count: prod.length,
                products: prod.map(p => {
                    return {
                        name: p.name,
                        price: p.price,
                        id: p._id,
                        productImage: p.productImage,
                        user:p.user
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
    console.log(req.userData.userId)
    let product = new Product({
        name: req.body.name,
        price: req.body.price,
        user:req.userData.userId
    })
    product = await User.populate(product,{path : 'user'})
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
   let product = await Product.findById(req.params.id)
   product = new Product({
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
    
    

}

const getIdProducts = async (req, res) => {
    const id = req.params.id
    await Product.findById(id)
        .populate('user')
        .exec()
        .then(prod => {
            res.status(200).json(prod)
        })
        .catch(err => console.log(err.message))

}

const updateProducts = async (req, res) => {
    const {name} = req.body
        if(name.length < 3 ) {
            res.sendStatus(422).json({
                message:"Title should contain at least 3 characters"
            })
        }
    try {
        const items = await Product.findByIdAndUpdate(req.params.id, req.body)
        .populate('user')
        res.status(200).json(items)

    } catch (error) {
        res.json(error.message)
    }

}

const deletedProduct = async (req, res) => {
    await Product.findByIdAndDelete({
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