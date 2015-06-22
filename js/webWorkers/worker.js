// worker will summarize values
onmessage = function(e) {
    var val1 = e.data[0],
        val2 = e.data[1];
    if(val2 !== undefined) {
        postMessage(parseInt(val1) + parseInt(val2));
    } else {
        postMessage('Not enough data to summarize!');
    }
}