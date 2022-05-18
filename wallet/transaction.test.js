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

    it('outputs the `amount` subtracted from the wallet balabce', () => {
        expect(transaction.outputs.find(output => output.address == wallet.publicKey))
        .amount.toEaual(wallet.balance - amount)
    })

    it('outputs the `amount` added from the wallet balabce', () => {
        expect(transaction.outputs.find(output => output.address == wallet.publicKey))
        .amount.toEaual(amount)
    })
})