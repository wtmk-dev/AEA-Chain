const {INITIAL_BALANCE} = require(`../config`)

class Wallet
{
    constructor()
    {
        this.balance
        this.keyPair
        this.publicKey
    }

    toString()
    {
        return `Wallet -
        publicKey : ${this.publicKey.toString()}
        balance   : ${this.balance}`
    }
}

module.exports = Wallet