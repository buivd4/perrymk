# PerryMK

<img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fseeklogo.com%2Fimages%2FP%2Fperry-the-platypus-logo-BC87DE7C19-seeklogo.com.png&f=1&nofb=1" alt="perry" width="70"/>

**Yet another JS mock library**

Are you bored with ```jest```? Try ```PerryMK``` to make your life harder.

**CURRENT VERSION: 0.1.0**

# How to install

# How to use PerryMK
Let me first introduce my old friend, Perry:

```js
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
```

He is cute, right? 


## Core features
Inspired by Mockito, PerryMK is focus on easy-to-use property.

### Stub

Simple stub

```js
let perryWatcher = new Mock(Perry);
perry = perryWatcher.when("soundWhenMeet").thenReturn("Mocking is fun, right?")
```

Stub with expected arguments using ```ArgumentMatcher``` (*I said! This is a Mockito-copy-cat..*)

```js
perry = perryWatcher.when("soundWhenMeet")
                    .withArgs(eq("phineas"))
                    .thenReturn("Oh there you are Perry!..")
perry = perryWatcher.when("soundWhenMeet")
                    .withArgs(eq("doofenshmirtz"))
                    .thenReturn("Doofenshmirtz Evil Incorporated 🎵")
perry = perryWatcher.when("soundWhenMeet")
                    .withArgs(any("string"))
                    .thenReturn("🎵")
```


### Mock
Simple mock

```js
console.log("Total called times:", perryWatcher.verify("soundWhenMeet").times())
```

Mock with expected arguments

```js
console.log("Called times when meet Doofenshmirtz:", perryWatcher.verify("soundWhenMeet")
                                                                .withArgs(eq("doofenshmirtz"))
                                                                .times())
console.log("Called times when meet Phineas:", perryWatcher.verify("soundWhenMeet")
                                                            .withArgs(eq("phineas"))
                                                            .times())
console.log("Called times when meet Ferb:", perryWatcher.verify("soundWhenMeet")
                                                        .withArgs(eq("ferb"))
                                                        .times())
```

## Credit
* Mockito