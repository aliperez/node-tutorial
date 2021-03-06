const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

const courseSchema = new mongoose.Schema({
    //  This validation happens through mongoose only, mongo doesn't care about validation
    // Joi is another npm package for validation, but use both, they compliment eachother, use Joi to validate the data from client
    // Mongoose check programming errors
    name: { 
        type: String, 
        required: true,
        minlength: 5,
        maxlength: 255
        // match: /pattern/
    },
    category: {
        type: String,
        required: true,
        enum: ['web', 'mobile', 'network'],
        lowercase: true,
        // uppercase: true,
        trim: true
    },
    author: String,
    tags: {
        type: Array,
        validate: {
            isAsync: true,
            validator: function(v, callback) {
                setTimeout(() => {
                    // Do some async work
                    const result = v && v.length > 0;
                    callback(result);
                }, 4000)
            },
            message: 'A course should have at least one tag.'
        }
    },
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: {
        type: Number,
        // cannot use arrow function in this situation bc arrow  functions do not have their own "this" they use the "this" value of the enclosing execution context 
        required: function() { return this.isPublished; },
        min: 10,
        max: 200,
        get: v => Math.round(v),
        set: v => Math.round(v)
    }
});

// pascal naming convention bc Course is a class not an object
const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    // camel case bc course is an object 
    const course = new Course({
        name: 'Brand New Course',
        category: 'Web',
        author: 'Mosh',
        tags: ['frontend'],
        isPublished: true,
        price: 15.8
    });
    
    // this assumes success
    // const result = await course.save();
    // console.log(result);

    // use try catch instead
    try {
        // manually trigger validation, returns a promise of void, design flaw of Mongoose
        // const isValid = await course.validate();
        // console.log(isValid);
        // original code:
        const result = await course.save();
        console.log(result);
    }
    catch (ex) {
        // console.log(ex.message);
        for (field in ex.errors)
            console.log(ex.errors[field].message);
    }
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
        .find({ _id: '5dd317a4e197ef50691e5c5b' })
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
        // .skip((pageNumber - 1) * pageSize)
        // .limit(pageSize) 
        // ascending order: 1, descending order: -1
        .sort({ name: 1 })
        // get only the name and tag properties
        .select({ name: 1, tags: 1, price: 1 });
        // .count();
    console.log(courses[0].price);
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

getCourses();

// updateCourse('5dc88c10df341a1036191c47');

// removeCourse('5dc88c10df341a1036191c47');


