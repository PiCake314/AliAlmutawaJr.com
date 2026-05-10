---
title: "The Namespace Problem!"
description: "A view into a problem I encountered during the development of Pie Lang!"
---

### Introduction: Dynamic Scoping
Say you have a programming language where everything is a runtime value, including namespaces!
```pie
x = space {
    a = 1;
    b = 2;
};

print(x::a);
use x::a;
print(a);
```

I used to have this in my language [Pie](https://github.com/PiCake314/Pie), and it worked great for a while. Until I wanted to introduce lexical scoping.

Pie does variable lookup very naively. A stack of environments is used. Entering a scope would push a new environment, and exiting a scope would pop the top environment. The first environment in the stack represents the global environment.

Naturally, this means whenever an identifier is encountered, Pie would walk the stack in reverse until it finds the name. This works well since inner scopes can see variables defined in the outer scopes, but not the other way.

If you still can't see the problem with this, take a look at this program:
```pie
printX = () => print(x);
x = 1;
printX();
```
With the algorithm described above, this code will execute fine. However, if you move the call to `printX` before `x`'s definition, the program is no longer valid.
This kind of behaviour is called dynamic scoping since it dynamically looks up the name of a variable,

Some languages might prefer this behaviour, such as Python:
```py
def printX(): print(x)
x = 1
printX()
```

However, I didn't like it much since it seemed like it would introduce many unneeded errors.


### The Problem: Static Scoping
To fix this issue, at first I resorted to tagging environments in a way that makes it clear whether the environment was pushed because of a function call or just because a new scope was opened.

```pie
func () => {
    .: Function Tag
    x = 1;
};

global = 2;

{
    .: Scope Tag
    local = 3;
}
```
An environment that had a scope tag was allowed to lookup names outside of itself. An environment that had a function tag wasn't allowed to lookup names outside of itself.

This seemed like it would work on the surface, but it ended up introducing all kinds of problems, such as functions not being able to access variables defined above them since they were considered outside of it's environment.

I realized, since I wanted to add static scoping, the problem had to be fixed statically. 


### The Solution: Static Analysis

I added an extra pass prior to the interpreting phase. This pass would give every unique variable a unique ID, and mark every usage of that variable with the same ID.

```pie
x = 1; .: ID 1
{
    x = 2; .: ID 2
    print(x); .: This x will be given ID 2
}
print(x); .: This x will be given ID 1
```

This fixes the problem with the bonus that it is less convoluted to work with + it doesn't introduce weird limits like what environment-tagging did.


### So, What's The Issue With Namespaces?

Since namespaces in Pie are purely runtime values, this means they may be reassigned:

```pie
x = space { a = 1; };
y = space { a = "hello"; };

if input_int() == 1 {
    x = y;
};

use x::a;
print(a);
```
This meant that a `use` declaration cannot 100% determine what ID it should mark the newly introduced name.

### What Now?

The problem can't be fixed if namespaces are purely runtime. Something has to change where we can detect namespaces during static analysis. Namespaces shouldn't be able to change their members during runtime. Everything inside them had to be statically known. Which means, Namespaces couldn't be regular variables.

They now are their own kind of entity in the language, and to make this clear, I decided to change the syntax from this:
```pie
x = space {
    a = 1;
};
```
To this:
```pie
space x {
    a = 1;
};
```

See the difference? Removing the assignment from the declaration makes it clear to the user that a namespace isn't a regular variable, which is true! In fact, you can still have a variable with the exact same name as a namespace declared in the same scope:

```pie
space x { a = 1; };
x = 2;

print(x);
print(x::a);
```
Pie is able to distinguish between them based on their usage. In fact, other languages, like C++, do this as well!
```cpp
#include <print>

namespace x {
    int a = 1;
};

void func() {
    int x = 2;

    std::println("{}", x);
    std::println("{}", x::a);
}
```

And since this new syntax doesn't allow the user to change the content of a namespace, it is impossible to fall into the problem of reassigning a namespace. Eego, no namespace problem no more!

I myself think this solution is pretty neat and still aligns with Pie's design philosphy.

Check out The Pie Programming Language at [PieLang.org](https://pielang.org/)