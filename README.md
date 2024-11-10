<div align="center">

# IT.js

Simple type testing in JS using a simple `IT.is()` unit.

`it.js`, a minimalist testing library designed to simplify the often complex task of type checking in JavaScript.

</div>

---

`it` offers a suite of type-checking functions, all accessible through a single method: `it.is`. Whether you're checking numbers, strings, objects, arrays, or functions, it.js provides a quick and intuitive way to validate your data types.


<table>

<tbody><tr valign="top"><td>

```js
IT(100).is.number()
// true

class MyClass {}

IT(MyClass).is.class()
// true
```

</td><td>


```js
IT('Easy').is(String)
// true

IT.is.undefined(undefined)
IT(undefined).is(undefined)
// true

IT(true).is(IT.BOOLEAN)
// true
```


</td><td>


```js
IT([]).is(Array)
// true
IT.is(Number, 202.2)
// true
IT(202.2).is.float()
// true
```


</td></tbody></table>


[Head To the function list](#Functions)


# Installation

To get started, install the file `IT.js`

```jinja
<script src="IT.js"></script>
```


## Basic Usage

Once installed the `IT` unit is ready to use. There are [many methods](#Signatures) to call the library, here's a couple:

```js

let editData = undefined;

/* Test if the value is undefined, two args method */
if( IT.is(undefined, editData) ) {
    editData = {}
}

/* Check if it is an object, method manner */
if( IT(editData).is.object() ){

    /* Check if a function exists, stringly checking */
    const isFunc = IT(editData.goFunction).is('function')

    if(isFunc) { editData.goFunction() }
}
```

> [!TIP]
> When calling upon `IT.is` we access the _Proxy_ of the `IS` instance, providing the `IT.is.tester()` methods, or a `IT.is()` caller.

## Syntax

The `IT` component provides an entry point for the testing functionality. The `IT` unit is designed to be a lightweight capture of a _value_ or the access for the `is()` function.
The `IS` component; `IT.is` provides the testing functions for the library. This is a plain class type, hosting many test functions.


### Signatures

`it.js` provides multiple methods of entry, allowing you to perform various type checks with ease.

They primarily exist to be intuitive without effort

```js
// function caller of all types
IT(value).is.string()

// Imperative format alternative.
IT(value).is('string')

// generic objects.
IT(value).is(String)

// Const
IT(value).is(IT.STRING)

// Also accessible through item definitions.
IT(value).is['string']()


// ----------- Switch it up ----------- //

// Or use the global
IT.is('string', value)

// Define new instances when required
IT().is('string', value)

// Same applies with _new_ instances.
(new IT(value)).is('string')

// With the two entry options.
(new IT).is('string', value)

// But also don't worry about scoping.
new IT(value).is('string')
```

### Value

We can provide a `value` (the thing to test) though:

```js
IT(value).is(type)
```

Or the second arument to the `is()` function:

```js
IT.is(type, value)
```

Or as the argument for the `IT.is[tester](value)` caller method. `tester` is any avaiable type, such as `"string"` or `"number"`:


```js
IT.is.number(value)
// is the same as:
IT.is[type](value)
```

### Type

The `type` is the expected evaluation type, such as `"string"`. The type methods are  accessible through the `IS` instance:

Available Types:

+ `object`, `array`, `function`
+ `string`, `blank`
+ `number`, `integer`, `float`
+ `boolean`, `true`, `false`
+ `null`, `undefined`
+ `class`, `jquery`, `percentage`

In all cases we can use a string, a constant, or the function for any type:

```js
IT(value).is('number')
IT(value).is(IT.NUMBER)
IT(value).is.number()
```

Same as above, When applying the `value` to IT, the first argument for the `is()` caller should be the `type`. The _type_ is always the first argument for the `is()` method:

```js
IT(value) .is(type)
IT        .is(type, value)
```

The _type_ can be a function call.

```js
IT.is.string("Juice Futterman")
// true
```

> [!TIP]
> To simplify the documentation, a _type_ function extending the `IT.is...` may be defined as the `tester` method. For example the _type_ `"string"` is also the _tester_ `is.string()`.


This works for unique types:

```js
IT.is.undefined(window.nonExistentValue)
// true

IT.is.class(class Example {})
// true
```

### Instances

The global `IT` instance is readily available to access the `.is()` method and testers.

```js
IT.is.number(42)
// true
```

The `IT` can be given a value and validated using many tests. When called as a function, we receive a new `IT` Instance from the global proxy:

An `IT` instance with a value is defined as a _bound instance_, as it has the value already applied:

```js
console.log(IT)      // Proxy of IT global

// Bound instance
const _it = IT(1001) // Instance of <IT {globalName: 'IT', _value: 1001}>

_it.is.string()
// false

_it.is.array()
// false

_it.is.number()
// true
```


To bypass the proxy manager and do more advanced things with the unit we can use `new IT`.
The _new_ instance has the same `_it.is...` accessor and testers:

```js
// Bound instance
const _it = new IT // Instance of <IT {_value: undefined}>
const _it = new IT(9001) // Instance of <IT {_value: 9001}>

_it.is.number()
// true
```


### Functions

There are a range of tester methods we can use:

+ [null](#null)
+ [undefined](#undefined)
+ [string](#string)
+ [number](#number)
+ [boolean](#boolean)
+ [object](#object)
+ [array](#array)
+ [function](#function)
+ [jquery](#jquery)
+ [true](#true)
+ [false](#false)
+ [percentage](#percentage)


#### null

Assert the given value is `null`:

```js
IT.is.null()
```

#### undefined

Assert the given value is `undefined`:

```js
IT.is.undefined()
```

#### string

Assert the given value is a `string`:

```js
IT.is.string(value)
IT(value).is(String)
IT.is("string", value)
IT(value).is.string()
```

#### number

Assert the given value is a `number`:

```js
IT.is.number(value)
IT(value).is(Number)
IT.is("number", value)
IT(value).is.number()
```

#### boolean

Assert the given value is a `boolean`:

```js
IT.is.boolean(value)
IT(value).is(Boolean)
IT.is("boolean", value)
IT(value).is.boolean()
```

#### object

Assert the given value is an `object`:

```js
IT.is.object(value)
IT(value).is(Object)
IT.is("object", value)
IT(value).is.object()
```

#### array

Assert the given value is an `array`:

```js
IT.is.array(value)
IT(value).is(Array)
IT.is("array", value)
IT(value).is.array()
```

#### function

Assert the given value is a `function`:

```js
IT.is.function(value)
IT(value).is(Function)
IT.is("function", value)
IT(value).is.function()
```

#### jquery

Assert the given value is `jquery`:

```js
IT.is.jquery(value)
IT.is("jquery", value)
IT(value).is.jquery()
```

#### true

Assert the given value is `true`:

```js
IT.is.true()
IT(value).is(true)
IT(value).is.true(value)
IT(value).is("true", value)
```

#### false

Assert the given value is `false`:

```js
IT.is.false(value)
IT.is("false", value)
IT(value).is.false()
```

#### percentage

Assert the given value is `percentage` string or number:

```js
IT.is.percentage(value)
IT(value).is(false)
IT.is("percentage", value)
IT(value).is.percentage()
```



```js
IT.is(type, value)
IT().is(type, value)
IT(value).is(type)
IT(value).is[type]()
(new IT(value)).is(type)
(new IT).is(type, value)
new IT(value).is(type)
```
