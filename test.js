import {Watcher} from './src/watcher.js';

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
console.log("Output:",perry.soundWhenMeet("doofenshmirtz"))

console.log("- Single mock ----------------------")
let perryWatcher = new Watcher(Perry);
perry = perryWatcher.when("soundWhenMeet").thenReturn("Mocking is fun, right?")
console.log("Ouput:",perry.soundWhenMeet("doofenshmirtz"))
console.log("Called times:", perryWatcher.times("soundWhenMeet"))
console.log("------------------------------------\n")


console.log("- Multiple mock --------------------")
perryWatcher = new Watcher(Perry);
perry = perryWatcher.when("soundWhenMeet").withArgs("phineas").thenReturn("Oh there you are Perry!..")
perry = perryWatcher.when("soundWhenMeet").withArgs("doofenshmirtz").thenReturn("Doofenshmirtz Evil Incorporated 🎵")
console.log("Ouput when meet Doofenshmirtz:",perry.soundWhenMeet("doofenshmirtz"))
console.log("Ouput when meet Phineas:",perry.soundWhenMeet("phineas"))
console.log("Ouput when meet Ferb:",perry.soundWhenMeet("ferb"))
console.log("Ouput when meet Ferb:",perry.soundWhenMeet("ferb"))

console.log("Total called times:", perryWatcher.times("soundWhenMeet"))
console.log("Called times when meet Doofenshmirtz:", perryWatcher.watch("soundWhenMeet").times("doofenshmirtz"))
console.log("Called times when meet Phineas:", perryWatcher.watch("soundWhenMeet").times("phineas"))
console.log("Called times when meet Ferb:", perryWatcher.watch("soundWhenMeet").times("ferb"))

console.log("------------------------------------\n")