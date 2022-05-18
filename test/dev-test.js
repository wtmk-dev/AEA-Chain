
const Block = require("../class/block")
const Blockchain = require("../class/blockchain")

/*
const Test_BlockGen = () =>
{
    let block = new Block("1","2","3","4");
    console.log(block.toString())
    console.log(Block.genesis().toString())
}

const mineBlock = Block.mineBlock(Block.genesis(), "mineTest")


const bc2 = new Blockchain()

bc2.addBlock("seed")
const isValid = bc.isValidChain(bc2.chain)

bc.addBlock("you")
bc.replaceChain(bc2.chain)

console.log(isValid)
*/

/*
const bc = new Blockchain()

for(let i = 0; i < 10; i++)
{
    console.log(bc.addBlock(`one day at a time ${i}`).toString())
}
*/

const Wallet = require('../wallet')
const wallet = new Wallet()

console.log(wallet.toString())

