import {Any} from './type.js';
export class Mock{
    constructor(){
        this.__call_info__=new Object();
    }
    __precall__(fn_name, args){
        if (this.__call_info__[fn_name]===undefined){
            this.__call_info__[fn_name]=new Array;
        }
        this.__call_info__[fn_name].push(args);
    }
}

export class Whenable{
    constructor(mock){
        this.mock = mock;
        this.aom=new ArgsOutputMapping();
    }
    inject(fn_name){
        this.mock[fn_name]=(...args)=>{
            this.mock.__precall__(fn_name,args);
            return this.aom.lookForOuput(args);
        }
    }
    when(fn_name){
        this.inject(fn_name);
        return new Returnable(new Any(), this.aom, this.mock);
    }
    whenWithArgs(fn_name,args){
        this.inject(fn_name)
        return new Returnable(args, this.aom, this.mock);
    }
}

class Returnable{
    constructor(args,aom,mock){
        this.args=args;
        this.aom = aom;
        this.mock=mock;
    }
    thenReturn(output){
        this.aom.register(this.args,output);
        return this.mock;
    }
}

class ArgsOutputMapping{
    constructor(){
        this.argsList=new Array();
    }
    register(args,output){
        this.argsList.push({
            'args':args,
            'output':output})
    }
    lookForOuput(args){
        for(let i=0;i<this.argsList.length;i++){
            let item=this.argsList[i];
            if (JSON.stringify(item.args) === JSON.stringify(args) || item.args instanceof Any){
                return item.output;
            }
        }
        return undefined;
    }
}


