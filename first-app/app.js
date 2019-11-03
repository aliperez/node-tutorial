
const os = require('os');

var totalMemory = os.totalmem();
var freeMemory = os.freemem();

// Old fashioned concatination 
console.log('Total Memory: ' + totalMemory);
console.log('Free Memory: ' + freeMemory);

// Template string
console.log(`Total Memory: ${totalMemory}`);
console.log(`Free Memory: ${freeMemory}`);
