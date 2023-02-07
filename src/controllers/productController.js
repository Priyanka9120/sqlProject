const mysql = require("mysql");
const ShortUniqueId = require('short-unique-id')
const SQL = require('../SQL/config.js')
const Validator = require('../Validation/validation.js')
const uid = new ShortUniqueId();
const uidWithTimestamp = uid.stamp(36);
const db = mysql.createConnection(SQL);


const createProduct = async (req, res) => {
    try {

        let data = req.body
        let { productId, productName, description, productImage, astrollorger } = data


        if (Object.keys(data).length == 0) return res.status(400).send({ status: false, msg: "Enter input field!" })

        if (!Validator.isEmpty(productName)) return res.status(400).send({ status: false, msg: "Enter product name!" })

        if (!Validator.isEmpty(description)) return res.status(400).send({ status: false, msg: "Write product description!" })

        if (!Validator.isEmpty(productImage)) return res.status(400).send({ status: false, msg: "Enter product image link!" })
        if (!Validator.imgRegex.test(productImage)) return res.status(400).send({ status: false, msg: "Enter valid product image link..!!" })

        if (!Validator.isEmpty(astrollorger)) return res.status(400).send({ status: false, msg: "Enter astrollorger!" })


        db.query(`INSERT INTO products SET ?`, { productId: uidWithTimestamp, productName: productName, description: description, productImage: productImage, astrollorger: astrollorger }, (err, results) => {
            if (err) {
                console.log(err);
            } else {
                return res.status(201).send({ status: true, message: 'Product Created' });
            }
        })
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}



const getProduct = async (req, res) => {
    try {

        db.query(`SELECT * from products`, async (err, results) => {

            if (err) {
                console.log(err)
            } else {
                return res.status(200).send({ status: true, message: 'Product Fetched!', data: results });
            }
        })
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}



module.exports = { createProduct, getProduct }