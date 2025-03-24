# : ...

We'll showcase every usecase of dots, colons, and ellipses in C++. We'll start with tokens contain a single dot, then 2 dots, 3, and so on.

## Single Dot


### floats and doubles:
```cpp
float f = 3.14f; // Float literal
double d = 3.14; // Double literal
```


### Member Access:
```cpp
struct { int x; } s;
s.x; // Accessing member 'x'
```

### Pointer-to-Member Access:
```cpp
struct S { int x; } s;
int S::* member = &S::x;
s.*member; // Accessing member 'x'
```


## Double Dots

### labels:
```cpp
label:
```

### Inheritance:
```cpp
struct Base {};
struct Derived : Base {}; // Derived class inherits from Base
```


### Range-based for loop:
```cpp
for (int i : {1, 2, 3});
```

