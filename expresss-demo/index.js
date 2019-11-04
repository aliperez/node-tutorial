
// require express returns a function
const express = require('express');
// store the function as app, which is an object
const app = express();

// app.get();
// app.post();
// app.put();
// app.delete();

const courses = [
    {id: 1, name: 'course1'},
    {id: 2, name: 'course2'},
    {id: 3, name: 'course3'}
];

app.get('/', (req, res) => {
    res.send('Hello World!!!!');
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
})

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find( c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send('The course with the given Id was not found.');
    res.send(course);
})

// app.get('/api/posts/:year/:month', (req, res) => {
//     // res.send(req.params);
//     res.send(req.query);
// })

// I used cli command "explort PORT=5000" to set the env variable
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
})