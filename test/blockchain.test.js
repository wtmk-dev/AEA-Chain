const Blockchain = require("../class/blockchain")
const Block = require("../class/block")

describe('Blockchain', ()=>{
    let bc;
    let bc2;
    beforeEach(()=>{
        bc = new Blockchain();
        bc2 = new Blockchain();
    })

    it('starts with genesis block', ()=>
    {
        expect(bc.chain[0]).toEqual(Block.genesis())
    })

    it('adds a new block', ()=>
    {
        const data = "seed"
        const block = bc.addBlock(data)

        expect(bc.chain[bc.chain.length -1].data).toEqual(block.data);
    })

    it('validates a valid chain', ()=>
    {
        bc2.addBlock("seed")
        expect(bc.isValidChain(bc2.chain)).toBe(true)
    })

    it('invalidates a chaing with a corrup genesis block', ()=>
    {
        bc2.chain[0].data = "</3";

        expect(bc.isValidChain(bc2.chain)).toBe(false)
    })

    it('invalidates a chaing with a corrup chain', ()=>
    {
        bc2.addBlock("hey")
        bc2.chain[1].data = "listen"
        bc2.addBlock("QQ")

        bc.chain = 

        expect(bc.isValidChain(bc2.chain)).toBe(false)
    })

    it('replaces valid chain', ()=>
    {
        bc2.addBlock("hey")
        bc.replaceChain(bc2.chain)
        
        expect(bc.chain).toEqual(bc2.chain)
    })

    it('rejects chain of less then or equal length', ()=>
    {
        bc2.chain = []
        bc.replaceChain(bc2.chain)
        expect(bc.chain).not.toEqual(bc2.chain)
    })

    it('replaces the chain with a valid chain', ()=>{
        bc2.addBlock('hey')
        bc.replaceChain(bc2.chain)

        expect(bc.chain).toEqual(bc2.chain)
    })

    it('it dos not replace with smaller chain', ()=>{
        bc.addBlock("you")
        bc.replaceChain(bc2.chain)

        expect(bc.chain).not.toEqual(bc2.chain)
    })
})