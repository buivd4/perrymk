
js test:
``` js
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
```


output:
``` bash
❯ node test.js
Output: Perry the Platypus!!
- Single mock ----------------------
Ouput: Mocking is fun, right?
Called times: 1
------------------------------------

- Multiple mock --------------------
Ouput when meet Doofenshmirtz: Doofenshmirtz Evil Incorporated 🎵
Ouput when meet Phineas: Oh there you are Perry!..
Ouput when meet Ferb: undefined
Ouput when meet Ferb: undefined
Total called times: 4
Called times when meet Doofenshmirtz: 1
Called times when meet Phineas: 1
Called times when meet Ferb: 2
------------------------------------
```