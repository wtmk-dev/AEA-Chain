//const test = require("./test/dev-test.js")
const express = require('express')
const bodyParser = require('body-parser')
const Blockchain = require("./class/blockchain")
const P2pServer = require('./class/p2p-server') 

const HTTP_PORT = process.env.HTTP_Port || 3001

const app = express()
const bc = new Blockchain()
const p2pServer = new P2pServer(bc)

app.use(bodyParser.json())

app.get('/blocks',(req, res) =>
{
    res.json(bc.chain)
})

app.post('/mine', (req, res) => {
    const block = bc.addBlock(req.body.data);
    console.log(`New Block ${block.toString()}`);

    p2pServer.syncChains()
    res.redirect('/blocks')
})

app.listen(HTTP_PORT, ()=>{
    console.log(`Listing port ${HTTP_PORT}`)
})

p2pServer.listen()