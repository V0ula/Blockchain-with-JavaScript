const SHA512 = require('crypto-js/sha512');

class Block {
    constructor(number, time, info, priorHash = ''){ 
    //constructor: for creating & initializing an obj created within a class
        this.number = number;
        this.time = time;
        this.info = info;
        this.priorHash = priorHash;
        this.hash = this.generateHash();
    }

    generateHash(){
        return SHA512(this.number + this.priorHash + this.date + JSON.stringify(this.info)).toString();
        //JSON.stringify() method converts a JS value to a JSON string.
        //toString() method converts a number to a string.

    }

}
class Blockchain{
    constructor(){
        this.chain = [this.generateBlockGenesis()];
    }

    generateBlockGenesis(){
        return new Block(0, "18/09/2018", "First block", "0");

    }
    
    callLastBlockElement(){
        return this.chain[this.chain.length - 1];
    }

    appendBlock(newBlock){
        newBlock.priorHash = this.callLastBlockElement().hash;
        newBlock.hash = newBlock.generateHash();
        this.chain.push(newBlock);
    }

    checkBlockValidity(){
        for(let i = 1; i < this.chain.length; i++){
            const thisBlock = this.chain[i];
            const priorBlock = this.chain[i - 1];

            if(thisBlock.hash !== thisBlock.generateHash()){
                return false;
            }

            if(thisBlock.priorBlock !== priorBlock.hash){
                return false;
            }
        }

        return true;
    }
}

let testCoin = new Blockchain();
testCoin.appendBlock(new Block(1, "18/09/2018", {amount: 4}));
testCoin.appendBlock(new Block(1, "18/09/2018", {amount: 10}));

console.log('Is blockchain valid? ' + testCoin.checkBlockValidity());

console.log(JSON.stringify(testCoin, null, 4));