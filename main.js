//const test = require("./test/dev-test.js")
const express = require('express')
const Blockchain = require("./class/blockchain")

const HTTP_PORT = process.env.HTTP_Port || 3001

const app = express()
const bc = new Blockchain()

app.get('/blocks',(req, res) =>
{
    res.json(bc.chain)
})

app.listen(HTTP_PORT, ()=>{
    console.log(`Listing port ${HTTP_PORT}`)
})