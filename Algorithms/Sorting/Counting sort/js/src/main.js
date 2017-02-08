// Sorting - COUNTING
console.log('COUNTING sort');
(function(){
    var array = [3,44,38,3,5,47,15,36,4,26,15,27,2,46,4,19,50,48],
        sort = function(arr, min, max, isAscending){
            var i, z=0, count = [];

            for(i=min;i<=max;i++) {
                count[i] = 0;
            }

            for(i=0;i<arr.length;i++) {
                count[arr[i]]++;
            }

            if(isAscending) {
                for(i=min;i<=max;i++) {
                    while (count[i]-- > 0) {
                        arr[z++] = i;
                    }
                }
            } else {
                for(i=max;i>=min;i--) {
                    while (count[i]-- > 0) {
                        arr[z++] = i;
                    }
                }
            }

            return arr;
        };

    console.log('Before sorting: ');
    console.log(array);
    console.log('After sorting (ASC): ');
    console.log(sort(array, 2, 50, true));
    console.log('-----------------------------------');

    console.log('Before sorting: ');
    console.log(array);
    console.log('After sorting (DESC): ');
    console.log(sort(array, 2, 50, false));
})();