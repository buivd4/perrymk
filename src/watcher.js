import { Matcher } from "./matcher.js";
import { Any } from './type.js';

function call_logging(watcher, fnName, fnArgs){
    if (watcher.callLog[fnName]===undefined){
        watcher.callLog[fnName]=new Array();
    }
    watcher.callLog[fnName].push(fnArgs);
}

export class Watcher{
    constructor(clazz){
        this.clazz = clazz;
        this.callLog = new Object();
        this.mock = new Object();
        this.matchers = new Object();
        this.whenPointers= new Object();
    }
    inject(fnName){
        this.matchers[fnName]=new Matcher();
        this.mock[fnName]=(...args)=>{
            call_logging(this, fnName, args);
            return this.matchers[fnName].lookup(args);
        }
    }
    when(fnName){
        if (!Object.keys(this.whenPointers).includes(fnName)){
            this.inject(fnName)
            this.whenPointers[fnName]=new WhenPointer(this.matchers, this.mock, fnName);
        }
        return this.whenPointers[fnName];
    }
    watch(fnName){
        return new Assertion(this.callLog[fnName]);
    }
    times(fnName){
        return this.watch(fnName).times();
    }
}

class Assertion{
    constructor(callLog){
        this.callLog=callLog
    }
    times(...args){
        if (args.length===0){
            return this.callLog.length
        }
        let count=0
        for(let i=0;i<this.callLog.length;i++){
            if (Matcher.isMatch(args, this.callLog[i])){
                count++;
            }
        }
        return count;
    }
}

class WhenPointer{
    constructor(matchers, mock,fnName){
        this.matchers=matchers;
        this.mock=mock;
        this.fnName=fnName;
        this.fnArgs=new Any();
    }
    withArgs(...args){
        this.fnArgs=args;
        return this;
    }
    thenReturn(desiredOutput){
        this.matchers[this.fnName].register(this.fnArgs, desiredOutput);
        return this.mock;
    }
}