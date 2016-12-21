// this function is used for converting number from one system to another
function numFromTo(num, from, to){ return parseInt(num, from).toString(to) }

// this is converter of Grey binary code to it's binary number
function grayToBin(grey) {
    var i, len = grey.length, res = grey[0];

    for(i=1;i<len;i++) {
        res += res[i-1] ^ grey[i];
    }

    return res;
}

var hex1 = '0x88',
    hex2 = '0x89',
    hex3 = '0x99',
	// here I'm converting hex number to binary and this binary is Grey code
    hex1BinAsGrey = numFromTo(hex1, 16, 2),
    hex2BinAsGrey = numFromTo(hex2, 16, 2),
    hex3BinAsGrey = numFromTo(hex3, 16, 2),
	
	// here I'm converting binary Grey code to binary bumber from which code was created
    hex1BinAsGrey2Bin = grayToBin(hex1BinAsGrey),
    hex2BinAsGrey2Bin = grayToBin(hex2BinAsGrey),
    hex3BinAsGrey2Bin = grayToBin(hex3BinAsGrey),
	
	// here I'm converting binary number to decimal
    hex1BinAsGrey2Bin2Dec = numFromTo(hex1BinAsGrey2Bin, 2, 10),
    hex2BinAsGrey2Bin2Dec = numFromTo(hex2BinAsGrey2Bin, 2, 10),
    hex3BinAsGrey2Bin2Dec = numFromTo(hex3BinAsGrey2Bin, 2, 10);

console.log('Comparing of two hex numbers: "' + hex1 + '" and "' + hex2 + '"');
console.log('In binary form: "' + hex1BinAsGrey + '" and "' + hex2BinAsGrey + '"');
// if decimal numbers are near each other (there difference are equal to one)
// for example 5 is near 6, and their difference is 6-5=1 or the same |5-6|=1 (for case if 1st decimal is less than second)
console.log('Are consecutive in gray code: ', Math.abs(hex1BinAsGrey2Bin2Dec-hex2BinAsGrey2Bin2Dec) === 1);
console.log(' ');
console.log('Comparing of two hex numbers: "' + hex1 + '" and "' + hex3 + '"');
console.log('In binary form: "' + hex1BinAsGrey + '" and "' + hex3BinAsGrey + '"');
console.log('Are consecutive in gray code: ', Math.abs(hex1BinAsGrey2Bin2Dec-hex3BinAsGrey2Bin2Dec) === 1);

console.log('-----------------------------------------');
//---------------------------------------------------