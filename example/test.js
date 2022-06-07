import {Mock,ArgumentMatcher} from 'perrymk';

let eq = ArgumentMatcher.eq;
let any = ArgumentMatcher.any;

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
let perryWatcher = new Mock(Perry);
perry = perryWatcher.when("soundWhenMeet").thenReturn("Mocking is fun, right?")
console.log("Output:",perry.soundWhenMeet("doofenshmirtz"))
console.log("Called times:", perryWatcher.verify("soundWhenMeet").times())
console.log("------------------------------------\n")


console.log("- Multiple mock --------------------")
perryWatcher = new Mock(Perry);
perry = perryWatcher.when("soundWhenMeet").withArgs(eq("phineas")).thenReturn("Oh there you are Perry!..")
perry = perryWatcher.when("soundWhenMeet").withArgs(eq("doofenshmirtz")).thenReturn("Doofenshmirtz Evil Incorporated 🎵")
perry = perryWatcher.when("soundWhenMeet").withArgs(any("string")).thenReturn("🎵")
console.log("Ouput when meet Doofenshmirtz:",perry.soundWhenMeet("doofenshmirtz"))
console.log("Ouput when meet Phineas:",perry.soundWhenMeet("phineas"))
console.log("Ouput when meet Ferb:",perry.soundWhenMeet("ferb"))
console.log("Ouput when meet Ferb:",perry.soundWhenMeet("ferb"))

console.log("Total called times:", perryWatcher.verify("soundWhenMeet").times())
console.log("Called times when meet Doofenshmirtz:", perryWatcher.verify("soundWhenMeet").withArgs(eq("doofenshmirtz")).times())
console.log("Called times when meet Phineas:", perryWatcher.verify("soundWhenMeet").withArgs(eq("phineas")).times())
console.log("Called times when meet Ferb:", perryWatcher.verify("soundWhenMeet").withArgs(eq("ferb")).times())

console.log("------------------------------------\n")