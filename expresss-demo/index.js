
// returns a class, so uppercase first letter
const Joi = require('joi');

// require express returns a function
const express = require('express');
// store the function as app, which is an object
const app = express();

// adding middleware
app.use(express.json());

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

app.post('/api/courses', (req, res) => {
    const { error } = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message);
        
    const course = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(course);
    res.send(course);
})

// route parameters
app.get('/api/courses/:id', (req, res) => {
    const course = courses.find( c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given Id was not found.');
    res.send(course);
})

app.put('/api/courses/:id', (req, res)=> {
    // Lookup the course by id
    // If not existing, return 404 
    const course = courses.find( c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given Id was not found.');


    // Validate the course
    // If invalid, return 400 - Bad Request
    // const result = validateCourse(req.body);
    // object destructuring on next line
    const { error } = validateCourse(req.body); //result.error
    
    if (error) return res.status(400).send(error.details[0].message);

    // Update course
    course.name = req.body.name;
    // Return the updated course
    res.send(course);
})

app.delete('/api/courses/:id', (req, res) => {
    // Look up the course 
    // Not existing, return 404
    const course = courses.find( c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given Id was not found.');

    // Delete
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    // Return the same course
    res.send(course);
})

function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(course, schema);
}

// query string parameters are optional, put at end in url: ?sortBy=name
// app.get('/api/posts/:year/:month', (req, res) => {
//     // res.send(req.params);
//     res.send(req.query);
// })

// I used cli command "export PORT=5000" to set the env variable
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
})