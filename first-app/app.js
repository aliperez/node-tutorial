
// Convention first letter of every word uppercase bc it's a class
// Class is a container for properties and functions (methods)
const EventEmitter = require('events');

// change to uppercase Logger bc its a class now
const Logger = require('./logger');
// create an instance of the class
const logger = new Logger();


// this emitter is an object
// example: human is a class, John is an object
// const emitter = new EventEmitter();

// Order matters, must emit after listener 

// Register a listener
// addListener same as on
// emitter.on('messageLogged', (arg) => { //e, eventArg
//     console.log('Listener called', arg);
// })

// Raised an event
// object is referred to as the event argument
// emitter.emit('messageLogged', { id: 1, url: 'http://'});

// lisener for emitter in logger.js
logger.on('logging', (arg) => { //e, eventArg
    console.log('Listener called', arg);
})

// call the log function from within the class instance
logger.log('my message input from app.js');


