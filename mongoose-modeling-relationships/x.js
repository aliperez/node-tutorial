// Trade off between query performance vs consistency
// Think about the types of queries your app will make before deciding

// Using References (Normalization) -> CONSISTENCY
// If you want to change the name of an author, only change it in one place
// However, every time you want to query a course, you need an extra query to get the author info, sometimes extra query not big deal, but certain situations want queries to run as fast as possible
let author = {
    name: 'Mosh',
    website: 'http://',
    image: 'link'
}

let course = {
    author: 'id',
    courseName: 'Node.js',
    price: 15
    // authors: [
    //     'id1',
    //     'id2'
    // ]
}

// Using Embedded Documents (Denormalization) -> PERFORMANCE
//  If you want to change the name of an author, you need to change it for each and every course one at a time
// Only one query needed for all info
let course = {
    author: {
        name: 'Mosh'
    },
    courseName: 'Node.js'
}

let course = {
    author: {
        name: 'Mosh Hamedani'
    },
    courseName: 'React.js'
}

// Hybrid
let author = {
    name: 'Mosh'
    // 50 other properties
}

let course = {
    author: {
        id: 'ref', 
        name: 'Mosh'
    }
}