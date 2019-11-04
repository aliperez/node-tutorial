
const http = require('http');

// this server is an event emitter
// in real world not going to use http module to build backend service
// because as we add more routes this code becomes more complex
// instead use a framework called express
// express is built on top of the http module in node 
// const server = http.createServer((req, res) => {
//     if (req.url === '/') {
//         res.write('Hello world');
//         res.end();
//     }

//     if (req.url === '/api/courses') {
//         res.write(JSON.stringify([1, 2, 3]));
//         res.end();
//     }
// });

// connection is the name of the event in the documentation
// in real world you wouldn't respond to the connection event
    // to build an http service, this is low level 
// server.on('connection', (socket) => {
//     console.log('New connection...');
// })

server.listen(3000);

console.log('Listening on port 3000...');