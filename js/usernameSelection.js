let showingAllUsernames = true;
const maxUsernamesShowing = 5;

function addUsername() {
    swal({
        title: 'Submit Github Username',
        html: 'Who do you want to add?',
        input: 'text',
        showCancelButton: true,
        confirmButtonText: 'Submit',
        showLoaderOnConfirm: false,
        preConfirm(username) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (username == '') {
                        reject('Username cannot be null.');
                    } else if (usernames.indexOf(username) > -1) {
                        reject('Username already exists! Please add a different username.');
                    } else {
                        // check for valid username
                        const url = `https://api.github.com/users/${username}`;
                        axios({
                            url,
                            method: 'get',
                            responseType: 'json',
                        }).then((response) => {
                            resolve();
                        }).catch((err) => {
                            reject('Username not found!');
                        });
                    }
                }, 1000);
            });
        },
        allowOutsideClick: false,
    }).then((username) => {
        addOneUsername(username);
        swal({
            type: 'success',
            title: `Username ${username} added!`,
        });
    });
}

function addOneUsername(username) {
    usernames.push(username);
    content.innerHTML = '';
    getData();
    renderUsernames();
}

const inputOptions = new Promise((resolve) => {
    setTimeout(() => {
        resolve(usernames);
    }, 2000);
});

function removeUsername() {
    swal({
    	title: 'Select username to remove',
    	input: 'radio',
    	showCancelButton: true,
    	confirmButtonText: 'Remove',
    	inputOptions,
    	inputValidator(index) {
        	return new Promise((resolve, reject) => {
            if (index) {
                resolve();
            } else {
                reject('You need to select a username!');
            }
        	});
    	},
    }).then((index) => {
        swal({
            type: 'success',
            html: `You successfully removed ${usernames[index]}`,
        });
        removeUsernameAtIndex(index);
    });
}

function removeUsernameAtIndex(index) {
    usernames.splice(index, 1);
    content.innerHTML = '';
    getData();
    renderUsernames();
}

function showAllUsernames() {
    showingAllUsernames = true;
    renderUsernames();
}

function showLessUsernames() {
    showingAllUsernames = false;
    renderUsernames();
}


function renderShowMoreLessUsernames() {
    const moreLessUsernamesElement = document.getElementById('showMoreLessUsernames');
    if (showingAllUsernames) { moreLessUsernamesElement.innerHTML = '<a href=javascript:showLessUsernames()><strong>Show less usernames</strong></a>'; } else { moreLessUsernamesElement.innerHTML = '<a href=javascript:showAllUsernames()><strong>Show more usernames</strong></a>'; }
}

function generateUsernameSelector() {
    let usernameSelector = '';
    let i = 0;
    if (showingAllUsernames || usernames.length <= maxUsernamesShowing) {
        for (; i < usernames.length - 1; i++) {
            usernameSelector += `<a class='username' href='https://github.com/${usernames[i]}?tab=stars'>${usernames[i]}</a>`;
            usernameSelector += ' | ';
        }
    } else {
        for (; i < maxUsernamesShowing - 1; i++) {
            usernameSelector += `<a class='username' href='https://github.com/${usernames[i]}?tab=stars'>${usernames[i]}</a>`;
            usernameSelector += ' | ';
        }
    }
    usernameSelector += `<a class='username' href='https://github.com/${usernames[i]}?tab=stars'>${usernames[i]}</a>`;
    return usernameSelector;
}

function renderUsernames() {
    document.getElementById('username_selector').innerHTML = generateUsernameSelector();
    document.getElementById('addOrRemoveUsername').innerHTML = '<a href=javascript:addUsername()><strong>Add more username</strong></a>'
    + ' | ' + '<a href=javascript:removeUsername()><strong>Remove username</strong></a>';
    renderShowMoreLessUsernames();
}
