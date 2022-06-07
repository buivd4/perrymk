export class MatchChecker{
    constructor(){
        this.mappings = new Array();
    }
    static isMatch(callArgs,expectedArgs){
        if (expectedArgs === undefined){
            return true;
        }
        if (callArgs.length!==expectedArgs.length){
            return false;
        }
        for(let i=0;i<expectedArgs.length;i++){
            if(!expectedArgs[i].isMatch(callArgs[i]))
                return false;
        }
        return true;
    }
    register(expectedArgs, desiredOutput){
        let record = new Object();
        record.expectedArgs = expectedArgs;
        record.desiredOutput = desiredOutput;
        this.mappings.push(record);
    }
    lookup(callArgs){
        for(let i=0;i<this.mappings.length;i++){
            if (MatchChecker.isMatch(callArgs, this.mappings[i].expectedArgs)){
                return this.mappings[i].desiredOutput;
            }
        }
        return undefined;
    }
}