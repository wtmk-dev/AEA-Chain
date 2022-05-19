const ChainUtil = require("../chain-util")
const {DIFFICULTY, MINE_RATE} = require("../config")

class Block
{

    constructor(timeStamp, lastHash, hash, data, nonce, difficulty)
    {
        this.timeStamp = timeStamp
        this.lastHash = lastHash
        this.hash = hash
        this.data = data
        this.nonce = nonce
        this.difficulty = difficulty 
    }

    toString()
    {
        return `Block - 
            Timestamp : ${this.timeStamp}
            Last Hash : ${this.lastHash.substring(0,10)}
            Hash      : ${this.hash.substring(0, 10)}
            Nonce     : ${this.nonce},
            Difficulty: ${this.difficulty}
            Data      : ${this.data}`
    }

    static genesis()
    {
        return new this("It starts...", "999", "im-999-a-333-live-666", [], 0, DIFFICULTY)
    }

    static mineBlock(lastBlock, data)
    {
        const lastHash = lastBlock.hash
        let nonce = 0
        let hash, timeStamp
        let {difficulty} = lastBlock

        do //poof of work
        {
            nonce++;
            timeStamp = Date.now()
            difficulty = Block.adjustDifficulty(lastBlock, timeStamp)
            hash = Block.hash(timeStamp, lastHash, data, nonce, difficulty)
        }while(hash.substring(0,difficulty) !== '0'.repeat(difficulty))
        
        return new this(timeStamp, lastHash, hash, data, nonce, difficulty)
    }

    static hash(timeStamp, lastHash, data, nonce, difficulty)
    {
        return ChainUtil.hash(`${timeStamp}${lastHash}${data}${nonce}${difficulty}`).toString()
    }

    static blockHash(block)
    {
        const { timeStamp, lastHash, data, nonce, difficulty } = block;
        return Block.hash(timeStamp, lastHash, data, nonce, difficulty)
    }

    static adjustDifficulty(lastBlock, curentTyime)
    {
        let {difficulty} = lastBlock;
        difficulty = lastBlock.timeStamp + MINE_RATE > curentTyime ? 
            difficulty + 1 : difficulty - 1

        return difficulty
    }
}

module.exports = Block;