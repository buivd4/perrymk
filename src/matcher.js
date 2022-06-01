import {Any} from './type.js';

export class Matcher{
    constructor(){
        this.mappings = new Array();
    }
    static isMatch(callArgs,expectedArgs){
        /* will be changed */
        if (expectedArgs instanceof Any){
            return true;
        }
        if (callArgs.length!==expectedArgs.length){
            return false;
        }
        if (JSON.stringify(callArgs) === JSON.stringify(expectedArgs)){
            return true;
        }
        return false;
    }
    register(expectedArgs, desiredOutput){
        let record = new Object();
        record.expectedArgs = expectedArgs;
        record.desiredOutput = desiredOutput;
        this.mappings.push(record);
    }
    lookup(callArgs){
        for(let i=0;i<this.mappings.length;i++){
            if (Matcher.isMatch(callArgs, this.mappings[i].expectedArgs)){
                return this.mappings[i].desiredOutput;
            }
        }
        return undefined;
    }
}