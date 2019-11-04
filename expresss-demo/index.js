
// require express returns a function
const express = require('express');
// store the function as app, which is an object
const app = express();

// app.get();
// app.post();
// app.put();
// app.delete();

app.get('/', (req, res) => {
    res.send('Hello World!!!!');
});

app.get('/api/courses', (req, res) => {
    res.send([1, 2, 3]);
})

// I used cli command "explort PORT=5000" to set the env variable
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
})