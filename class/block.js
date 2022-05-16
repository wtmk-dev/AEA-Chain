const SHA256 = require('crypto-js/sha256')
const {DIFFICULTY} = require("../config")

class Block
{

    constructor(timeStamp, lastHash, hash, data, nonce)
    {
        this.timeStamp = timeStamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
        this.nonce = nonce
    }

    toString()
    {
        return `Block - 
            Timestamp: ${this.timeStamp}
            Last Hash: ${this.lastHash.substring(0,10)}
            Hash     : ${this.hash.substring(0, 10)}
            Nonce    : ${this.nonce},
            Data     : ${this.data}`
    }

    static genesis()
    {
        return new this("It starts...", "999", "im-999-a-333-live-666", [], 0)
    }

    static mineBlock(lastBlock, data)
    {
        const lastHash = lastBlock.hash
        let nonce = 0
        let hash
        let timeStamp

        do //poof of work
        {
            nonce++;
            timeStamp = Date.now()
            hash = Block.hash(timeStamp, lastHash, data, nonce)
        }while(hash.substring(0,DIFFICULTY) !== '0'.repeat(DIFFICULTY))
        
        return new this(timeStamp, lastHash, hash, data, nonce)
    }

    static hash(timeStamp, lastHash, data, nonce)
    {
        return SHA256(`${timeStamp}${lastHash}${data}${nonce}`).toString()
    }

    static blockHash(block)
    {
        const { timeStamp, lastHash, data, nonce } = block;
        return Block.hash(timeStamp, lastHash, data, nonce)
    }
}

module.exports = Block;