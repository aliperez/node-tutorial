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
    const courses = await Course
        .find({ author: 'Mosh', isPublished: true })
        .limit(10)
        // ascending order: 1, descending order: -1
        .sort({ name: 1 })
        // get only the name and tag properties
        .select({ name: 1, tags: 1 });
    console.log(courses);
}

// createCourse();

getCourses();


