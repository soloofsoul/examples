// Sorting - SELECTION, complexity O(N^2)
console.log('SELECTION sort');
(function(){
    var array = [3,44,38, 3, 5,47,15,36,26,27,2,46,4,19,50,48],
        sort = function(arr, isAscOrder){
            var i, j,
                length = array.length,
                min;

            console.log('Before sorting: ');
            console.log(arr);

            for(i=0;i<length;i++) {
                min = i;

                for(j=i+1;j<length;j++) {
                    if(isAscOrder ? arr[j] < arr[min] : arr[j] > arr[min])
                        min = j;
                }

                swap(arr, i, min);
            }

            console.log('After sorting (' + (isAscOrder ? 'ASC' : 'DESC') + '): ');
            console.log(arr);
            console.log('-----------------------------------');
        },
        swap = function(arr, i, min){
            var tmp;

            if(min != i) {
                tmp = arr[i];
                array[i] = arr[min];
                arr[min] = tmp;
            }
        };

    sort(array, true);
    sort(array, false);
})();