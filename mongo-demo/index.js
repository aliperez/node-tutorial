const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    date: { type: Date, default: Date.now },
    isPublished: Boolean
});

// pascal naming convention bc Course is a class not an object
const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    // camel case bc course is an object 
    const course = new Course({
        name: 'Angular Course',
        author: 'Mosh',
        tags: ['angular', 'frontend'],
        isPublished: true
    });
    
    const result = await course.save();
    console.log(result);
}

async function getCourses() {
    // comparison operators
    // eq: equal
    // ne: not equal
    // gt: greater than, lt
    // gte: greater than or equal to, lte
    // in: in
    // nin: not in
    // use $ to indicate operator, see example below

    // logical operators
    // or
    // and

    // regular expressions: more control over filtering strings
    // ^ means string that starts with
    // $ means end of a string
    // append i for not case sensitive
    // .* means any number of characters before or after

    const courses = await Course
        // .find({ author: 'Mosh', isPubslished: true })
        // .find({ price: { $gte: 10, $lte: 20 } })
        // .find({ price: { $in: [10, 15, 20] } })
        // .find()
        // .or([ {author: 'Mosh' }, { isPublished: true } ])
        // .and([ {author: 'Mosh' }, { isPublished: true } ])
        // starts with mosh
        // .find( { author: /^Mosh/})
        // ends with Hamedani
        // .find({ author: /Hamedani$/i })
        // contains Mosh
        .find({ author: /.*Mosh.*/i })
        .limit(10) 
        // ascending order: 1, descending order: -1
        .sort({ name: 1 })
        // get only the name and tag properties
        .select({ name: 1, tags: 1 });
    console.log(courses);
}

// createCourse();

getCourses();


