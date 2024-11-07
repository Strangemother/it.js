/* This version two should be much nicer.

+ Auto instance,
+ proxy function
+ expanded testing
+ Multi api.

    it(10).is('number')
    it(10).is(Number)
    it(10).number

    it.is('number', 10)


Extended
    it(10).is.number()

---

Existing:

    it.is('number', 2);
    IT.g(10).is('number');


---

+ Therefore "it" is the proxy object of a function, with a caller and
an _is_.
+ `is` instance as the tester functions, through the Is class.

+ A globlal name is required.
    the `IT` global should be configurable global name.

---

Simple type checking in a easy to ready.
returns boolean for type check.

it(1).is(Number)
it(1).is('Number')
it(1).is('number')

it.is('number', 1)

 */

(function(){

var instance;
var itInstance;

const setup = function() {
    itInstance = new IT()
    const instance = new Proxy(itCaller, proxyHandler);
    window[instance.globalName] = instance
    return instance
}


class IS {

    _null(a) {
        return ( a === null );
    }

    _undefined(a) {
        return ( this._null( a ) || typeof a == 'undefined' || a === 'undefined' );
    }

    _string(a) {
        return (
            ( a instanceof String || typeof a == 'string' )
                && !this._undefined( a ) && !this._true( a )
                && !this._false( a )
            );
    }

    _number(a) {
        return (
            ( a instanceof Number || typeof a == 'number' )
                && !isNaN( a )
            );
    }

    _boolean(a) {
        return (
            a instanceof Boolean || typeof a == 'boolean' || this._true( a ) || this._false( a )
            );
    }

    _object(a) {
        return (
            ( a instanceof Object || typeof a == 'object' )
                && !this._null(a)
                && !this._jquery(a)
                && !this._array(a)
            );
    }

    _array(a) {
        return ( a instanceof Array );
    }

    _function(a) {
        return ( a instanceof Function || typeof a == 'function' );
    }

    _jquery(a) {
        return ( typeof jQuery != 'undefined'
                && a instanceof jQuery );
    }

    _true(a){
        return ( a === true || a === 'true' );
    }

    _false(a) {
        return ( a === false || a === 'false' );
    }

    _percentage(a) {
        return ( this._string( a ) && a.slice( -1 ) == '%'
                && this._number( parseInt( a.slice( 0, -1 ), 10 ) )
            );
    }

    alertUnknown(name, prop, args) {
        throw new Error(`IT::IS property does not exist ${name}`)
    }
}


const itCaller = function IT(things){
    /* Exposed as the caller to the proxy handler. */
    console.error('itCaller stub head called', arguments)
    return itInstance
}

const BLANK = {}


class IT {

    globalName = 'IT'

    constructor() {
        this._value = arguments[0]
        // this._value = Array.from(arguments)
    }


    get is() {
        /* the _is_ function.

            IT(10).is('number')
            IT.is(Number, 10)
            IT.is(IT.NUMBER, 10)

            IT.is('number', 10)

            IT.is.number(10)
            IT.is.number(10)
            IT(10).is.number()

            IT(10).is(10)
        */
        // console.log('IT::[get is]')
        return this.getIsInstance()
    }

    getValue(){
        return this._value
    }


    getIsInstance() {

        if(this._isProxy) {
            return this._isProxy
        }

        // create a new functional sink for the IS unit.
        const isCaller = function() {
            console.error('isCaller function call. with', arguments)
        }

        this._is = new IS()
        const _isProxyHandler = {
            parentIt: this
            , construct(target, args) {
                /* Upon new IT() instance.

                    new IT.is()

                return a bound IT object, complete with the IS caller.
                */
                console.log(`Creating an _is_ construct: ${target.name}`);
            }

            , runTest(prop, args) {
                let [p,a] = this.resolveValues(prop,args)
                let name = `_${p}`
                let _is = this.parentIt._is
                let method = _is[name]
                if(!method) {
                    return _is.alertUnknown(name, prop, args)

                }

                let boundIsMethod = method.bind(_is)
                return boundIsMethod(a)
            }

            , resolveValues(prop=BLANK, args){
                let v = this.getParentValue()
                let l = args.length
                console.log('--- it.is.test', prop, '|', v, '|', args)

                if(prop === BLANK) {
                    // a blank prop required a prop in the first  arg.
                    prop = args[0]

                    if(args.length > 1) {
                        v = args[1]
                    }

                    let res = [prop, v]
                    console.log('--- it.is.test', res)
                    return res
                }

                // The prop exists, we only need arg.
                if(args.length > 0) {
                    v = args[0]
                }

                let res = [prop, v]
                console.log('--- it.is.test', res)
                return res
            }

            , apply(target, thisArg, args) {
                /* Upon IT.is(value) call. */
                // console.log(`_is_ method call with: ${args}`);
                return this.runTest(undefined, args)
            }

            , getParentValue() {
                return this.parentIt.getValue()
            }

            , get(isCallerRef, prop) {
                /* A get upon the upper most IT object:

                    IT.is.number
                    IT.is.string
                */

                console.log(`_is_ get prop ${prop}`);
                let v = function() {
                    /* caller for this prop*/
                    let args = Array.from(arguments)
                    return this.is.runTest(this.prop, args)
                }.bind({ is: this, prop})

                return v
                //return Reflect.get(...arguments)
            }
        };


        const instance = new Proxy(isCaller, _isProxyHandler);

        this._isProxy = instance;
        return instance;

    }

    functionCall(boundScope, args) {
        /*
            Called by the _apply_ trap.

            IT(100)...
        */
        // let args = Array.from(arguments)
        // console.log(`IT::functionCall::${args}`);
        // should return a bound instance of IT.
        return new IT(...args)
    }
}


const proxyHandler = {
    construct(target, args) {
        /* Upon new IT() instance.

            new IT()
            new IT(100)

        return a bound IT object, complete with the IS caller.
        */
        console.log(`IT (proxy)::construct - Creating new ${target.name} with: ${args}`);
        return new IT(...args);
    },

    apply(target, thisArg, args) {
        /* Upon IT() call. */
        console.log(`IT (proxy)::apply - with: ${args}`);
        return itInstance.functionCall(thisArg, args)
    },

    get(itCallerRef, prop) {
        /* A get upon the upper most IT object:

            IT.foo
            IT.foo()
        */
        if(itInstance[prop]) {
            console.log('IT; Good prop:' , prop)
            return itInstance[prop]
        }

        console.log('?' , prop)
        return Reflect.get(...arguments)
    }
};


/* Return a new instance of the proxy*/
instance = setup();


})();
