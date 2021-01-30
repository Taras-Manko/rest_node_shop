const router = require('express').Router()
const authToken = require('../../middleware/token')

const {orderGet,postOrder,getIdOrder,orderDelete} = require('../controllers/order')

router.get('/',authToken, orderGet)
router.post('/',authToken,postOrder)
router.get('/:id',authToken, getIdOrder)
router.delete('/:id',authToken, orderDelete)



module.exports = router