var Singleton = (function(){
    var instance;

    function create() {
        // props
        // methods
        function method(){

        }

        return {
            method: method
        };
    }

    return {
        getInstance: function(){
            if(!instance) {
                console.log('creating instance');
                instance = create();
            }
            console.log('returning instance');
            return instance;
        }
    }
})();

Singleton.getInstance();
Singleton.getInstance();
