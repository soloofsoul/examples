// Facade design pattern
CustomQueryLibrary = function(){};
CustomQueryLibrary.prototype.query = function(selector, context){
    context = context || document;
    return context.querySelectorAll(selector);
};

LibraryAdapter = function(lib){ this.lib = lib; };
LibraryAdapter.prototype.query = function(selector, context) {
    context = context || document;
    return this.lib.query(selector, context);
};

QueryFacade = function(adapter) {
    this.adapter = adapter;
};
QueryFacade.prototype.query = function(selector, context) {
    return this.adapter.query(selector, context);
};

QueryFacade.create = function(adapter, lib){
    return new adapter(lib);
};

var testObj = {
    NQObj: new CustomQueryLibrary()
};

testObj.LAobj= new QueryFacade.create(LibraryAdapter, testObj.NQObj);


var contentDivEls = testObj.NQObj.query('#content'),
    contentDivSpanEls = testObj.NQObj.query('span', contentDivEls[0]),
    contentDivEls1 = testObj.LAobj.query('#content'),
    contentDivSpanEls1 = testObj.LAobj.query('span', contentDivEls[0]);

console.log('Library - contentDivEls: %O ', contentDivEls[0]);
console.log('Library - contentDivSpanEls: %O ', contentDivSpanEls[0]);
console.log('Adapter - contentDivEls1: %O ', contentDivEls1[0]);
console.log('Adapter - contentDivSpanEls1: %O ', contentDivSpanEls1[0]);