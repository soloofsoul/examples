// Adapter design pattern
CustomQueryLibrary = function(){};
CustomQueryLibrary.prototype.doSomething = function(){
    console.log('NativeQuery.doSomething method');
};
CustomQueryLibrary.prototype.query = function(selector, context){
    context = context || document;
    return context.querySelectorAll(selector);
};

LibraryAdapter = function(lib){ this.lib = lib; };
LibraryAdapter.prototype.query = function(selector, context) {
    context = context || document;
    return this.lib.query(selector, context);
};

var testObj = {
    NQObj: new CustomQueryLibrary()
};

testObj.LAobj= new LibraryAdapter(testObj.NQObj);


var contentDivEls = testObj.NQObj.query('#content'),
    contentDivSpanEls = testObj.NQObj.query('span', contentDivEls[0]),
    contentDivEls1 = testObj.LAobj.query('#content'),
    contentDivSpanEls1 = testObj.LAobj.query('span', contentDivEls[0]);

console.log('contentDivEls %O: ', contentDivEls[0]);
console.log('contentDivSpanEls %O: ', contentDivSpanEls[0]);
console.log('contentDivEls1 %O: ', contentDivEls1[0]);
console.log('contentDivSpanEls1 %O: ', contentDivSpanEls1[0]);