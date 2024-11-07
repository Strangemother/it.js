/*
Basic tests
 */


const runItTests = function(type, value) {

    // IT is a proxy
    let fs = [
        ()=> IT.is(type, value),
        ()=> IT().is(type, value),
        ()=> IT(value).is(type),
        ()=> IT(value).is[type](),
        ()=> (new IT(value)).is(type),
        ()=> (new IT).is(type, value),
        ()=> new IT(value).is(type)
    ]

    fs.forEach(function(e,i,a){
        console.log('============= Running', i+1)
        let v = e()
        if(v == undefined || v === false) {
            console.warn('undefined...', e)
        }
        console.log('= result for', i+1, '==', v)
    })

}

;runItTests('number', 10);