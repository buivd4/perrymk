import {mock,times,calledWith} from './src/builder.js';

class Perry{
    constructor(cloth){
        this.cloth=cloth;
    }
    soundWhenMeet(charactor){
        switch(charactor){
            case "doofenshmirtz":
                return "Perry the Platypus!!"
            case "phineas":
                return "There you are Perry"
            case "ferb":
                return "kakkkk kakkkk"
        }
    }
}

let perry=new Perry()
console.log(perry.soundWhenMeet("doofenshmirtz"))


let mockedPerry=mock(perry).when("soundWhenMeet").thenReturn("Mocking is fun");
console.log(mockedPerry.soundWhenMeet("doofenshmirtz"))

let mockedPerryWithArgs = mock(perry).whenWithArgs("soundWhenMeet",["doofenshmirtz"]).thenReturn("Peerryyy..")
console.log(mockedPerryWithArgs.soundWhenMeet("doofenshmirtz"))


let mockedPerryM=mock(perry);
mockedPerryM.whenWithArgs("soundWhenMeet",["doofenshmirtz"]).thenReturn("Mock1..")
mockedPerryM.whenWithArgs("soundWhenMeet",["phineas"]).thenReturn("Mock2..")
let mockedMultiCase= mockedPerryM.mock;
console.log(mockedMultiCase.soundWhenMeet("doofenshmirtz"))
console.log(mockedMultiCase.soundWhenMeet("phineas"))
console.log(times(mockedMultiCase,"soundWhenMeet"))
console.log(calledWith(mockedMultiCase,"soundWhenMeet",['phineas']))
console.log(calledWith(mockedMultiCase,"soundWhenMeet",['ferb']))
