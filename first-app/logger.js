
var url = 'some random url';

function log(message) {
    // Send an HTTP request
    console.log(message);
}

// function secondFunction(message) {
//     // Send an HTTP request
//     console.log(message);
// }

// ES6 version: export default log;
module.exports = log;

// module.exports.secondFunction = secondFunction;
// module.exports.url = url;
