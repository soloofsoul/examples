// Adapter design pattern
NativeQuery = function(){};
NativeQuery.prototype.query = function(selector, context){
    context = context || document;
    return context.querySelectorAll(selector);
};

var testObj = {
    NQObj: new NativeQuery()
};



var contentDivEls = testObj.NQObj.query('#content'),
    contentDivSpanEls = testObj.NQObj.query('span', contentDivEls[0]);

console.log('contentDivEls %O: ', contentDivEls[0]);
console.log('contentDivSpanEls %O: ', contentDivSpanEls[0]);