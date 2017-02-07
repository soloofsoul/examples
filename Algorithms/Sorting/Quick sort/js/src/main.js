// Sorting - QUICK, best-case complexity O(N log N)
console.log('QUICK sort');
(function(){
    var array = [3,44,38, 3, 5,47,15,36,26,27,2,46,4,19,50,48],
        sort = function(arr, left, right, isAscOrder){
        var index;

            if(arr.length > 1) {
                left = typeof left != 'number' ? 0 : left;
                right = typeof right != 'number' ? arr.length - 1: right;

                index = partition(arr, left, right, isAscOrder);

                if(left < index -1) {
                    sort(arr, left, index-1, isAscOrder);
                }

                if(index < right) {
                    sort(arr, index, right, isAscOrder);
                }
            }

            return arr;
        },
        swap = function(items, firstIndex, secondIndex) {
            var temp = items[firstIndex];
            items[firstIndex] = items[secondIndex];
            items[secondIndex] = temp;
        },
        partition = function(items, left, right, isAscOrder) {
            var pivot = items[Math.floor((left+right) / 2)],
                i = left,
                j = right;

            while (i <= j) {
                while (isAscOrder ? items[i] < pivot : items[i] > pivot) {
                    i++;
                }
                while (isAscOrder ? items[j] > pivot : items[j] < pivot) {
                    j--;
                }

                if(i <= j) {
                    swap(items, i, j);
                    i++;
                    j--;
                }
            }

            return i;
        };

    console.log('Before sorting: ');
    console.log(array);
    var result = sort(array, '', '', true);
    console.log('After sorting (ASC): ');
    console.log(result);
    console.log('-----------------------------------');

    console.log('Before sorting: ');
    console.log(array);
    var result = sort(array, '', '', false);
    console.log('After sorting (DESC): ');
    console.log(result);
})();