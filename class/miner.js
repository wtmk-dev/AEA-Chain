class Miner{
    constructor(blockchain, transactionPool, wallet, p2pServer)
    {
        this.blockchain = blockchain
        this.transactionPool = transactionPool
        this.wallet = wallet
        this.p2pServer = p2pServer
    }

    mine()
    {
        const validTransactions = this.transactionPool.validTransactions()

        // include a reward for the miner
        // create a block consisting of the valid transation
        // sync chains in the p2p
        // clear the transaction pool
        //broascast to every minor to clear their transtion pool
    }
}

module.exports = Miner