function EventDispatcher(o) {
    var list = {};

    o.addEvent = function(type, listener){
        if(!list[type])
            list[type] = [];

        if(list[type].indexOf(listener) == -1)
            list[type].push(listener);
    };

    o.dispatchEvent = function(e){
        var a = list[e.type];
        if(a) {
            if(!e.target) e.target = this;
            for(var index in a) {
                a[index](e);
            }
        }
    }
}

var o = {};
EventDispatcher(o);
o.addEvent('tick', function(e){
    console.log('a tick just happend', e.target, e.type);
    console.log(e.target == o, e.target, o);
});
o.dispatchEvent({
    type: 'tick',
    target: o
});