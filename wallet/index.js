const { INITIAL_BALANCE } = require(`../config`)
const ChainUtil = require('../chain-util')
const Transaction = require('./transaction')
const TransactionPool = require('./transaction-pool')

class Wallet
{
    constructor()
    {
        this.balance = INITIAL_BALANCE
        this.keyPair = ChainUtil.genKeyPair()
        this.publicKey = this.keyPair.getPublic().encode('hex')
    }

    toString()
    {
        return `Wallet -
        publicKey : ${this.publicKey.toString()}
        balance   : ${this.balance}`
    }

    sign(dataHash)
    {
        return this.keyPair.sign(dataHash);
    }

    createTransaction(recipient, amount, transactionPool)
    {
        if(amount > this.balance)
        {
            console.log(`${amount} exceeds balance of ${this.balance}`)
            return
        }

        let transaction = transactionPool.existingTransaction(this.publicKey)

        if(transaction)
        {
            transaction.update(this, recipient, amount)
        }else{
            transaction = Transaction.newTransaction(this, recipient, amount)
            transactionPool.updateOrAddTransaction(transaction)
        }

        return transaction
    }

    calculateBalance(blcokchain)
    {
        let balance = this.balance
        let transactions = []

        blcokchain.chain.forEach(
            block => block.data.forEach(
                transaction => {
                    transactions.push(transaction)
        }))

        const walletInputTransactions = 
            transactions.filter(transaction => transaction.input.address === this.publicKey)
        
   
        let startTime = 0;
        if(walletInputTransactions.length > 0)
        {
            const recentInputTransaction = walletInputTransactions.reduce(
                (prev, current)=>{ prev.input.timeStamp > current.input.timeStamp ? prev : current })


            balance = recentInputTransaction.outputs.find(output => output.address === this.publicKey).amount
            startTime - recentInputTransaction.input.timeStamp
        }
        
        transactions.forEach(
            transaction =>
            {
                if(transaction.input.timeStamp > startTime)
                {
                    transaction.outputs.find(output => {
                        if(output.address === this.publicKey)
                        {
                            balance += output.amount;
                        }
                    })
                }
            }
        )

        return balance
    }

    static blockchainWallet()
    {
        const blockchainWallet = new this()
        blockchainWallet.address = 'blockchain-wallet'
        return blockchainWallet
    }
}

module.exports = Wallet