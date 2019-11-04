const EventEmitter = require('events');
// var url = 'some random url';

// create a class called logger that has the additional log method
// use Pascal case for classes
// don't need function keyword when inside a class
// the function is now called a method
// extends allows Logger class to have all functionality from
    // EventEmitter plus our new log function
// then change emitter.emit to this.emit
class Logger extends EventEmitter{
    log(message) {
        // Send an HTTP request
        console.log(message);
        this.emit('logging', { data: "my message here"});
    }
}

// function secondFunction(message) {
//     // Send an HTTP request
//     console.log(message);
// }

// ES6 version: export default log;
module.exports = Logger;

// module.exports.secondFunction = secondFunction;
// module.exports.url = url;
