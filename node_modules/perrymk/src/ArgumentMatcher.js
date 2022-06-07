export class MatchAny{
    constructor(clazz=undefined){
        this.clazz=clazz
    }
    isMatch(obj){
        if (this.clazz===undefined){
            return true;
        }
        if (typeof this.clazz === "string")
            return typeof obj === this.clazz
        return obj instanceof this.clazz;
    }
}

export class MatchEq{
    constructor(obj){
        this.obj=obj
    }
    isMatch(obj){
        return JSON.stringify(this.obj)===JSON.stringify(obj);
    }
}

export class MatchWithCondition{
    constructor(matchFunction){
        this.matchFunction=matchFunction
    }
    isMatch(obj){
        this.matchFunction(obj);
    }
}

export function eq(obj){
    return new MatchEq(obj);
}

export function any(clazz=undefined){
    return new MatchAny(clazz);
}