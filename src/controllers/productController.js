const mysql = require("mysql");
const SQL = require('../SQL/config.js')
const Validator = require('../Validation/validation.js')
const db = mysql.createConnection(SQL);


const createProduct = async (req, res) => {
    try {

        let data = req.body
        let { productName, productDescription, productImage, astrologerId } = data


        if (Object.keys(data).length == 0) return res.status(400).send({ status: false, msg: "Enter input field!" })

        if (!Validator.isEmpty(productName)) return res.status(400).send({ status: false, msg: "Enter product name!" })

        if (!Validator.isEmpty(productDescription)) return res.status(400).send({ status: false, msg: "Write product description!" })

        if (!Validator.isEmpty(productImage)) return res.status(400).send({ status: false, msg: "Enter product image link!" })
        if (!Validator.imgRegex.test(productImage)) return res.status(400).send({ status: false, msg: "Enter valid product image link..!!" })

      //==============check duplicate Id ===================//
        db.query(`SELECT * from products WHERE (astrologerId = "${astrologerId}")`, async (err, results) => {

            if (err) { console.log(err) }

            if (results.length > 0) {
                for (let i in results) if (results[i].astrologerId == astrologerId) return res.status(400).send({ status: false, message: 'The astrologerId is already exist!' })
            }

            db.query(`INSERT INTO products SET ?`, { astrologerId: astrologerId, productName: productName, productDescription: productDescription, productImage: productImage }, (err, results) => {
                if (err) {
                    console.log(err);
                } else {
                    return res.status(201).send({ status: true, message: 'Product Created' });
                }
            })
        })
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}



const getProduct = async (req, res) => {
    try {

        let astrologerId = req.body.astrologerId

        if (!astrologerId) return res.status(400).send({ status: false, message: 'Please enter you astrologerId!' })

        db.query(`SELECT * from products  WHERE (astrologerId = "${astrologerId}")`, async (err, results) => {

            if (err) console.log(err)

            if (results.length == 0) return res.status(200).send({ status: false, message: 'No Product Available!' });

            for (let i in results) {

                if (results[i].astrologerId == astrologerId) {

                    return res.status(200).send({ status: true, message: 'Product Fetched!', data: results[i] });

                }
            }
        })
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}



module.exports = { createProduct, getProduct }