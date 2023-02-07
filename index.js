const express = require("express")
const mysql = require("mysql");
const route = require("./src/routes/route.js")
const app = express()
require('dotenv').config()

app.use(express.json())

const db = mysql.createConnection({
    host: "sql12.freesqldatabase.com",
    user: "sql12596439",
    password: "NMGLWYRRHH",
    database: "sql12596439"
});

db.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("MySQL is Connected...")
    }
})

app.use('/', route)

app.all('/*', (req, res) => {
    res.status(404).send("Page not found!")
})

app.listen(process.env.PORT, () => {
    console.log(`Server is runing on port: ${process.env.PORT}...`)
})