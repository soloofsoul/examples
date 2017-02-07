// Sorting - INSERTION, best-case complexity O(N)
//
console.log('INSERTION sort');
(function(){
    var array = [3,44,38, 3, 5,47,15,36,26,27,2,46,4,19,50,48],
        sort = function(arr, isAscOrder){
            var i, j,
                value,
                length = arr.length;

            console.log('Before sorting: ');
            console.log(arr);

            for(i=0;i<length;i++) {
                value = arr[i];

                for(j=i-1;j>-1 && (isAscOrder ? arr[j] > value : arr[j] < value);j--) {
                    arr[j+1] = arr[j];
                }

                arr[j+1] = value;
            }

            console.log('After sorting (' + (isAscOrder ? 'ASC' : 'DESC') + '): ');
            console.log(arr);
            console.log('-----------------------------------');
        };

    sort(array, true);
    sort(array, false);
})();