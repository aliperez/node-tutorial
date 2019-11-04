const EventEmit = require('events');

const emit = new EventEmit();
// var url = 'some random url';

function log(message) {
    emit.emit('logging', { data: "my message here"});

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
