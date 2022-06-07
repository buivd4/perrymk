import { MatchChecker } from "./MatchChecker.js";
import {Assert} from "./Assert.js";
function call_logging(watcher, fnName, fnArgs){
    if (watcher.callLog[fnName]===undefined){
        watcher.callLog[fnName]=new Array();
    }
    watcher.callLog[fnName].push(fnArgs);
}

export class Mock{
    constructor(clazz){
        this.clazz = clazz;
        this.callLog = new Object();
        this.mock = new Object();
        this.matchers = new Object();
        this.whenPointers= new Object();
    }
    inject(fnName){
        this.matchers[fnName]=new MatchChecker();
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
    verify(fnName){
        return new Assert(this.callLog[fnName]);
    }
}

class WhenPointer{
    constructor(matchers, mock,fnName){
        this.matchers=matchers;
        this.mock=mock;
        this.fnName=fnName;
        this.fnArgs=undefined;
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