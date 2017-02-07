// Sorting - BUBBLE
console.log('BUBBLE sort');
(function(){
    var array = [3,44,38,5,47,15,36,26,27,2,46,4,19,50,48], 
        swapped,
        sort = function(arr, isAscOrder){

            console.log('Before sorting: ');
            console.log(arr);

            do {
                swapped = false;
                swapped = compare(arr, isAscOrder);
            } while (swapped);

            console.log('After sorting (' + (isAscOrder ? 'ASC' : 'DESC') + '): ');
            console.log(arr);
            console.log('-----------------------------------');
        },
        compare = function(arr, isAscOrder){
            var i, temp, count = arr.length;
            for(i=0;i<count;i++) {
                // changing the sign to opposite here - will change direction of sorting
                if(isAscOrder ? arr[i] > arr[i+1] : arr[i] < arr[i+1]) {
                    temp = arr[i];
                    arr[i] = arr[i+1];
                    arr[i+1] = temp;
                    return true;
                }
            }
        };

    sort(array, true);
    sort(array, false);
})();