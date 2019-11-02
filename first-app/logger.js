
var url = 'some random url';

function log(message) {
    // Send an HTTP request
    console.log(message);
}

function secondFunction(message) {
    // Send an HTTP request
    console.log(message);
}

module.exports.log = log;
module.exports.secondFunction = secondFunction;
module.exports.url = url;
