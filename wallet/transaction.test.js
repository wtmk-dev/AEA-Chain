const Transaction = require('./transaction')
const Wallet = require('./index');

describe('Transaction', ()=>{
    let transaction, wallet, recipient, amount;

    beforeEach(()=>{
        wallet = new Wallet()
        amount = 6
        recipient = "Junko"
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

    describe('transaction amount exceeds the balance', () => {

        beforeEach(()=>{
            amount = 5000
            transaction = Transaction.newTransaction(wallet, recipient, amount)
        })

        it('does not create a transaction', ()=> {
            expect(transaction).toEqual(undefined)
        })
    })
})