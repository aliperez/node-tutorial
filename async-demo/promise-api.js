// playground file

// returns a promise that's already resolved
// const p = Promise.resolve({ id: 1 });
// p.then(result => console.log(result));

// return a promise that's already rejected
const p = Promise.reject(new Error('reason for rejection...'));
p.catch(error => console.log(error));

// using error object (new Error ()) includes the call stack, native error object
// try it with just a string, like this:
// const p = Promise.reject('reason for rejection...');
// p.catch(error => console.log(error));