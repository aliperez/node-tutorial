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
        name: 'Fourth Course',
        author: 'Mosh',
        tags: ['fourth', '4th'],
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

    const pageNumber = 2;
    const pageSize = 10;
    // Real world example:
    // /api/courses?pageNumber=2&pageSize=10

    const courses = await Course
        // .find({})  
        .find({ author: 'Mosh', isPublished: true })
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
        // .find({ author: /.*Mosh.*/i })
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize) 
        // ascending order: 1, descending order: -1
        .sort({ name: 1 })
        // get only the name and tag properties
        .select({ name: 1, tags: 1 });
        // .count();
    console.log(courses);
}

async function updateCourse(id) {
    // Approach: Query first, use this method when you want to validate the change first
    // findById()
    // Modify it's properties
    // save()

    // const course = await Course.findById(id);
    // if (!course) return;
    // course.isPublished = true;
    // course.author = 'Another Author';
    // // Another equivalent approach
    // // course.set({
    // //     isPublished: true,
    // //     author: 'Another Author'
    // // })
    // const result = await course.save();
    // console.log(result);

    // Approach: Update first
    // Update directly
    // Optionally: get the updated document

    // This returns the result
    // const result = await Course.updateOne({ _id: id }, {
    //     $set: {
    //         author: 'Alicia',
    //         isPublished: false
    //     }
    // });
    // console.log(result);

    // This returns the original document
    // const course = await Course.findByIdAndUpdate(id, {
    //     $set: {
    //         author: 'Jack',
    //         isPublished: true
    //     }
    // });
    // console.log(course);

    // This returns the updated document
    const course = await Course.findByIdAndUpdate(id, {
        $set: {
            author: 'Jason',
            isPublished: false
        }
    }, {new: true});
    console.log(course);
}

async function removeCourse(id) {
    // deleteOne finds the first one and deletes it
    // const result = await Course.deleteOne({ _id: id });
    // use to delete many
    // const result = await Course.deleteMany({ _id: id });
    // if the course doesn't exist, returns null
    const course = await Course.findByIdAndRemove(id);
    console.log(course);
}
  
// createCourse();

// getCourses();

// updateCourse('5dc88c10df341a1036191c47');

removeCourse('5dc88c10df341a1036191c47');


