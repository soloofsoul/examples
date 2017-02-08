// Sorting - QUICK (randomized), best-case complexity O(N log N)
console.log('QUICK (randomized) sort');
(function(){
    var array = [3,44,38,3,5,47,15,36,26,27,2,46,4,19,50,48],
        sort = function(arr, left, right, isAscOrder){
            var left = typeof left != 'number' ? 0 : left,
                right = typeof right != 'number' ? arr.length-1 : right,
                j;

            if(left<right) {
                j = partition(arr, left, right, isAscOrder);
                sort(arr, left, j-1, isAscOrder);
                sort(arr, j+1, right, isAscOrder);
            }
        },
        partition = function(arr, left, right, isAscOrder){
            var pivotInd = Math.floor(Math.random() * (right-left+1) + left),
                pivot = arr[pivotInd],
                i = left-1,
                j;

            swap(arr, pivotInd, right);

            for(j=left;j<right;j++) {
                if(isAscOrder ? arr[j] < pivot : arr[j] > pivot) {
                    i++;
                    swap(arr, i, j);
                }
            }
            swap(arr, i+1, right);
            return i+1;
        },
        swap = function(arr, ind1, ind2){
            var temp = arr[ind1];
            arr[ind1] = arr[ind2];
            arr[ind2] = temp;
        };

    console.log('Before sorting: ');
    sort(array, '', '', true);
    console.log('After sorting (ASC): ');
    console.log(array);
    console.log('-----------------------------------');

    console.log('Before sorting: ');
    sort(array, '', '', false);
    console.log('After sorting (DESC): ');
    console.log(array);
})();