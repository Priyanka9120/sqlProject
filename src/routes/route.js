const express = require("express")
const Router = express.Router()
const { createProduct, getProduct } = require('../controllers/productController.js')


Router.get('/test', (req, res) => {
    res.send("testing successful")
})


Router.post('/createProduct', createProduct)
Router.get('/getProduct', getProduct)


module.exports = Router