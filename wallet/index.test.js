const Blockchain = require('../class/blockchain');
const { INITIAL_BALANCE } = require('../config');
const Wallet = require('./index')
const TransactionPool = require('./transaction-pool')

describe('Wallet', ()=>{
    let wallet, tp, blockchain;

    beforeEach(()=>{
        wallet = new Wallet()
        tp = new TransactionPool()
        blockchain = new Blockchain()
    })

    describe('creating a transaction', ()=>{
        let transaction, sendAmount, recipient

        beforeEach(()=>{
            sendAmount = 50
            recipient = '586ooikj'
            transaction = wallet.createTransaction(recipient, sendAmount, blockchain, tp)
        })
    

        describe('and doing the same transaction', ()=>{

            beforeEach(()=>{
                wallet.createTransaction(recipient, sendAmount, blockchain, tp)
            })


            it('doubled the `sendAmount` subtracted from the wallet balance', ()=>{
                console.log(wallet.publicKey)
                expect(transaction.outputs.find(output => output.address === wallet.publicKey).amount)
                .toEqual(wallet.balance - sendAmount * 2)
            })

            it('clones the `sendAmount` outpt for the recipient', ()=>{
                expect(transaction.outputs.filter(output => output.address === recipient)
                .map(output => output.amount)).toEqual([sendAmount, sendAmount])
            })
        })

        describe('calculating a balance', ()=>{
            let addBalance, repeatAdd, senderwallet

            beforeEach(()=>{
                wallet = new Wallet()
                senderwallet = new Wallet()
                addBalance = 1
                repeatAdd = 3

                for(let i=0; i < repeatAdd; i++)
                {
                    senderwallet.createTransaction(wallet.publicKey, addBalance, blockchain, tp)
                }

                blockchain.addBlock(tp.transactions)
            })

            it('calculates the balance for blockchain transactions matching the recipient', ()=>{
                expect(wallet.calculateBalance(blockchain)).toEqual(INITIAL_BALANCE + (addBalance * repeatAdd))
            })

            it('calculates the balance for blockchain transactions matching the sender', ()=>{
                expect(senderwallet.calculateBalance(blockchain)).toEqual(INITIAL_BALANCE - (addBalance * repeatAdd))
            })
        })

    })
})