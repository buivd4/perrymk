import {Mock,Whenable} from './mockClass.js';
export function mock(obj){
    /*
        return new Whenable
    */
    let mock = new Mock();
    return new Whenable(mock);
}

export function times(mock,fn_name){
    return mock.__call_info__[fn_name].length
}

export function calledWith(mock,fn_name, args){
    for(let i=0;i<mock.__call_info__[fn_name].length;i++){
        let item=mock.__call_info__[fn_name][i];
        if (JSON.stringify(item) === JSON.stringify(args)){
            return true;
        }
    }
    return false;
}