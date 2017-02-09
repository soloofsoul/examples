// Sorting - RADIX
console.log('RADIX sort');
(function(){
    var array = [3,44,38,3,5,47,15,36,4,26,15,27,2,46,4,19,50,48],
        // One  function name so no global scope pollution.
        // lower-case as this is a function rather than an object
        // Pass the array of numbers rather than use a global.
        // Returns a new array of numbers sorted.
        sort = function(numbers) {
            var i;                  // hoist declarations
            const results = [];     // array that holds the final sorted numbers
            const buckets = [[], [], [], [], [], [], [], [], [], []];  // buckets
            const workArray = [...numbers]; // copy the numbers
            var power = 0;                  // current digit as a power of ten
            var tenPow = 1;                 // ten to the power of power
            if(numbers.length <= 1){        // if one or no items then don't sort
                return workArray;           // don't sort if there is no need.
            }
            // as numbers are sorted and moved to the result array the numbers
            while (workArray.length > 0) {
                for (i = 0; i < workArray.length; i += 1) { // for all numbers still being sorted
                    if (workArray[i] < tenPow) {            // is the number smaller than the current digit
                        results.push(workArray[i]);         //Yes it is sorted then remove a put on the result array
                    } else {
                        // add to bucket. Use Math.floor and save complexity doing it in one statement line
                        buckets[Math.floor(workArray[i] / tenPow) % 10].push(workArray[i]);
                    }
                }
                power += 1;
                tenPow = Math.pow(10, power);
                emptyBuckets(workArray, buckets);
            }

            return results;
        },
        emptyBuckets = function(wArr, buckets) {          // empties buckets and adds contents back to workArray
            wArr.length = 0;
            for (i = 0; i < 10; i += 1) {   // could have used buckets forEach but this is quicker on average
                if(buckets[i].length > 0){
                    wArr.push(...buckets[i]);
                    buckets[i].length = 0;
                }
            }
        };

    console.log('Before sorting: ');
    console.log(array);
    console.log('After sorting (ASC): ');
    console.log(sort(array));
    console.log('-----------------------------------');
})();