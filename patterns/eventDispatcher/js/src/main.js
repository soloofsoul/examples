function EventDispatcher(o) {
    var list = {};

    o.addEvent = function(type, listener){
        if(!list[type])
            list[type] = [];

        if(list[type].indexOf(listener) == -1)
            list[type].push(listener);
    };

    o.removeEvent = function(type, listener) {
        var listType = list[type],
            index = -1;

        if(listType) {
            index = listType.indexOf(listener);
            if(index > -1)
                listType.splice(index,1);
        }
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

var o = {},
    listener = function(e) {
        console.log('a tick just happend', e.target, e.type);
        console.log(e.target == o, e.target, o);
    };
EventDispatcher(o);
o.addEvent('tick', listener);

o.dispatchEvent({
    type: 'tick',
    target: o
});

o.removeEvent('tick', listener);

// nothing here, because event listener was removed
o.dispatchEvent({
    type: 'tick',
    target: o
});