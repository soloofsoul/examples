// Sorting - MERGE, best-case complexity O(N log N)
//
console.log('MERGE sort');
(function(){
    var array = [3,44,38, 3, 5,47,15,36,26,27,2,46,4,19,50,48],
        sort = function(arr, isAscOrder){
            var middle, left, right;

            if(arr.length < 2) {
                return arr;
            }

            middle = Math.floor(arr.length/2);
            left = arr.slice(0, middle);
            right = arr.slice(middle);

            return merge(sort(left, isAscOrder), sort(right, isAscOrder), isAscOrder);
        },
        merge = function(left, right, isAscOrder){
            var result = [],
                il = 0,
                ir = 0;

            while(il < left.length && ir < right.length) {
                if(isAscOrder ? left[il] < right[ir] : left[il] > right[ir]) {
                    result.push(left[il++]);
                } else {
                    result.push(right[ir++]);
                }
            }

            return result.concat(left.slice(il)).concat(right.slice(ir));
        };

    console.log('Before sorting: ');
    console.log(array);
    var result = sort(array, true);
    console.log('After sorting (ASC): ');
    console.log(result);
    console.log('-----------------------------------');

    console.log('Before sorting: ');
    console.log(array);
    var result = sort(array, false);
    console.log('After sorting (DESC): ');
    console.log(result);
})();