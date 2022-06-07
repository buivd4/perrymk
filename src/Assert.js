import { MatchChecker } from "./MatchChecker.js";

export class Assert{
    constructor(callLog){
        this.callLog=callLog
        this.args=undefined
    }
    withArgs(...args){
        this.args=args
        return this;
    }
    times(){
        if (this.args===undefined){
            return this.callLog.length
        }
        let count=0;
        this.callLog.forEach(element => {
            if (MatchChecker.isMatch(element,this.args)){
                count++;
            }
        });
        return count;
    }
    
}