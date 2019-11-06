console.log('Before');
getUser(1, getRepos);
console.log('After');

function getRepos(user) {
    console.log('User found: ', user.gitHubUsername);
    getRepositories(user.gitHubUsername, getComms);
}

function getComms(repos) {
    console.log('Repos found: ', repos);
    getCommits(repos, displayCommits);
}

function displayCommits(commits) {
    console.log('Commits found: ', commits);
}

function getUser(id, callback) {
    setTimeout(() => {
        console.log('Reading user from databse...');
        callback({ id: id, gitHubUsername: 'mosh' });
    }, 2000);
}

function getRepositories(username, callback) {
    setTimeout(() => {
        console.log('Reading repositories from database...');
        callback(['repo1', 'repo2', 'repo3']);
    }, 2000);
}

function getCommits(repoID, callback) {
    setTimeout(() => {
        console.log('Reading commits from database...');
        callback(['commit1', 'commit2', 'commit3']);
    }, 2000);
}