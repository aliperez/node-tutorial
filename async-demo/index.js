console.log('Before');
getUser(1, function(user) {
    // console.log('User', user)
    getRepositories(user.gitHubUsername, function(repos) {
        console.log('Repositories: ', repos);
    } )
});
console.log('After');

function getUser(id, callback) {
    setTimeout(() => {
        console.log('Reading user from databse...');
        callback({ id: id, gitHubUsername: 'mosh' });
    }, 2000);
}

function getRepositories(username, callback) {
    setTimeout(() => {
        console.log('Reading repositories from database for user: ', username);
        callback(['repo1', 'repo2', 'repo3']);
    }, 2000);
}