const Block = require("../class/block")
const { DIFFICULTY } = require('../config')

describe('Block', ()=>
{
    let data, lastBlock, block

    beforeEach(()=>{
        data = 'poke'
        lastBlock = Block.genesis()
        block = Block.mineBlock(lastBlock, data)
    })

    it('sets the `data` to match the input', ()=>
    {
        expect(block.data).toEqual(data)
    })

    it('sets the `lastHash` to match the hash of the last block', ()=>
    {
        expect(block.lastHash).toEqual(lastBlock.hash)
    })

    it('gens a hash that mathces the difficulty', ()=>{
        expect(block.hash.substring(0, DIFFICULTY)).toEqual('0'.repeat(DIFFICULTY))
    })
});