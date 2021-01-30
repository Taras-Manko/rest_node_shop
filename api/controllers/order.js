const Order = require('../models/order')
const Product = require('../models/product')


const orderGet = async (req, res) => {
    await Order.find().select('_id product quantity')
        .populate('product', 'name')
        .exec()
        .then(order => {
            res.status(200).json({
                count: order.length,
                orders: order
            })
        })
        .catch(err => {
            res.status(500).json({
                message: err.message
            })
        })
}

const postOrder = async (req, res) => {
    await Product.findById(req.body.productId)
        .then(result => {
            if (!result) {
                return res.status(404).json({
                    message: "Product not found",
                    error: err
                })
            } else {
                const order = new Order({
                    product: req.body.productId,
                    quantity: req.body.quantity

                })
                return order.save()
                    .then(result => {
                        res.status(201).json(result)
                    })
            }

        }).catch(err => {
            res.status(500).json({
                message: "Product not found"
            })
        })

}

const getIdOrder = async (req, res) => {
    await Order.findById(req.params.id)
        .populate('product')
        .exec()
        .then(order => {
            if (!order) {
                return res.status(404).json({
                    message: "not found"
                })
            }
            res.status(200).json(order)
        })
        .catch(err => console.log(err.message))
}

const orderDelete = async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id, req.body)
        res.status(200).json({
            message: 'Order Deleted'
        })

    } catch (error) {
        res.json(error.message)
    }
}




module.exports = {
    orderGet,
    postOrder,
    getIdOrder,
    orderDelete
}