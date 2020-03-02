const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  authors: [authorSchema]
}));

async function createCourse(name, authors) {
  const course = new Course({
    name, 
    authors
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course.find();
  console.log(courses);
}

// async function updateAuthor(courseId) {
//     const course = await Course.findById(courseId);
//     course.author.name = 'Mosh Hamedani';
//     course.save();
// }

// async function updateAuthor(courseId) {
//     const course = await Course.update({ _id: courseId }, {
//         $set: {
//             'author.name': 'John Smith'
//         }
//     });
// }

// async function updateAuthor(courseId) {
//     const course = await Course.update({ _id: courseId }, {
//         $unset: {
//             'author': ''
//         }
//     });
// }

async function addAuthor(courseId, author) {
    const course = await Course.findById(courseId);
    course.authors.push(author);
    course.save();
}

async function removeAuthor(courseId, authorId) {
    const course = await Course.findById(courseId);
    const author = course.authors.id(authorId);
    author.remove();
    course.save();
}

removeAuthor('5ddc5b28d7e85512f1d2b229', '5ddc5c11a89701132f66bb62');

// addAuthor('5ddc5b28d7e85512f1d2b229', new Author({ name: 'Amy' }));

// createCourse('Node Course', [
//     new Author({ name: 'Mosh' }),
//     new Author({ name: 'John' })
// ]);
 
// updateAuthor('5ddc59031b2feb11ec414d9f');