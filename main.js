//const test = require("./test/dev-test.js")
const express = require('express')
const bodyParser = require('body-parser')
const Blockchain = require("./class/blockchain")
const P2pServer = require('./class/p2p-server') 
const Wallet = require('./wallet')
const TransactionPool = require('./wallet/transaction-pool')
const Miner = require('./class/miner')

const HTTP_PORT = process.env.HTTP_Port || 3001

const tp = new TransactionPool()
const app = express()
const bc = new Blockchain()
const wallet = new Wallet()
const p2pServer = new P2pServer(bc, tp)
const miner = new Miner(bc,tp,wallet,p2pServer)

app.use(bodyParser.json())

app.get('/blocks',(req, res) =>
{
    res.json(bc.chain)
})

app.get('/transactions', (req, res)=>
{
    res.json(tp.transactions)
})

app.get('/mine-transactions', (req, res) =>
{
    const block = miner.mine()
    console.log(`New block added: ${block.toString()}`)
    res.redirect('/blocks')
})

app.post('/transact', (req,res)=>
{
    const{ recipient, amount } = req.body
    const transaction = wallet.createTransaction(recipient, amount, bc, tp)
    p2pServer.broadcastTransaction(transaction)
    res.redirect('/transactions')
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

app.get('/publicKey', (req, res)=>{
    res.json({publicKey: wallet.publicKey})
})

p2pServer.listen()

