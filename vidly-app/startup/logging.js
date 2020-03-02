const winston = require('winston');
require('winston-mongodb');
require('express-async-errors');

module.exports = function() {
    winston.handleExceptions(
        new winston.transports.Console({ colorize: true, prettyPrint: true }),
        new winston.transports.File({ filename: 'uncaughtExceptions.log' }));

    process.on('unhandledRejection', (ex) => {
        throw ex;
    });

    winston.add(new winston.transports.File({ filename: "logfile.log" }));
    winston.add(new winston.transports.MongoDB({ 
        db: "mongodb://localhost/vidly",
        level: 'info'
    }));

    // // Pretend this is a failed call to a db or something
    // const p = Promise.reject(new Error('Something failed miserably!'));
    // // This is an unhandled rejection bc there is no "catch"
    // p.then(() => console.log('Done'));
}