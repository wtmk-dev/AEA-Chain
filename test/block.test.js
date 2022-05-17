const Block = require("../class/block")

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

    it('gens a hash that mathces the difficulty', ()=>
    {
        expect(block.hash.substring(0, block.difficulty)).toEqual('0'.repeat(block.difficulty))
    })

    it('lowers the difficulty for slowly mined blocks', () => 
    {
        expect(Block.adjustDifficulty(block, block.timeStamp+360000).toEqual(block.difficulty-1))
    })

    it('raises the difficulty for quicly mined blocks', () => 
    {
        expect(Block.adjustDifficulty(block, block.timeStamp+1).toEqual(block.difficulty+1))
    })
});