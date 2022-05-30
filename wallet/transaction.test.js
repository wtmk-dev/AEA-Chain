const Transaction = require('./transaction')
const Wallet = require('./index');
const { MINING_REWARD } = require('../config');
const Blockchain = require('../class/blockchain');

describe('Transaction', ()=>{
    let transaction, wallet, recipient, amount, blockchain;

    beforeEach(()=>{
        wallet = new Wallet()
        amount = 6
        recipient = "Junko"
        blockchain = new Blockchain()
        transaction = Transaction.newTransaction(wallet, recipient, amount)
    })

    it('outputs the `amount` subtracted from the wallet balance', () => {
        expect(transaction.outputs.find(output => output.address == wallet.publicKey).amount)
        .toEqual(wallet.balance - amount)
    })

    it('outputs the `amount` added from the wallet balance', () => {
        expect(transaction.outputs.find(output => output.address == recipient).amount)
        .toEqual(amount)
    })

    it('inputs the balance of the wallet', ()=>{
        expect(transaction.input.amount).toEqual(wallet.balance)
    })
    
    it('validates a valid transaction',()=>{
        expect(Transaction.verifyTransaction(transaction)).toBe(true)
    })

    it('validates a corrupt transaction', ()=>{
        transaction.outputs[0].amount = 5000;
        expect(Transaction.verifyTransaction(transaction)).toBe(false)
    })

    

    describe('transaction amount exceeds the balance', () => {

        beforeEach(()=>{
            amount = 5000
            transaction = Transaction.newTransaction(wallet, recipient, amount)
        })

        it('does not create a transaction', ()=> {
            expect(transaction).toEqual(undefined)
        })
    })

    describe('Update a transaction', ()=>{
        let nextAmount, nextRecipient;
        beforeEach(()=>{
            nextAmount = 100;
            nextRecipient = ":loiirr"
            transaction = transaction.update(wallet, nextRecipient, nextAmount)
        })

        it(`subtracts the next amount from the sender's output`, ()=>{
            expect(transaction.outputs.find(output => output.address === wallet.publicKey).amount)
            .toEqual(wallet.balance - amount - nextAmount);
        })

        it('outputs an amount for the next recipient', ()=> {
            expect(transaction.outputs.find(output => output.address === nextRecipient).amount)
            .toEqual(nextAmount)
        })
    })

    describe('creating a reward transation', ()=>{
        beforeEach(()=>{
            transaction = Transaction.rewardTransaction(wallet, Wallet.blockchainWallet());
        })


        it(`reward the mier's wallet`, ()=>{
            expect(transaction.outputs.find(output => output.address === wallet.publicKey).amount)
            .toEqual(MINING_REWARD)
        })
    })
})