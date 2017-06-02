const MAX_USERNAMES_SHOWING = 5;
let showingAllUsernames = true;

const addUsername = function addUsername() {
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
                    } else if (JSON.parse(localStorage.getItem('usernames')).indexOf(username) > -1) {
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
};

const addOneUsername = function addOneUsername(username) {
    let usernames = JSON.parse(localStorage.getItem('usernames'));
    usernames.push(username);
    localStorage.setItem('usernames', JSON.stringify(usernames));
    content.innerHTML = '';
    getData();
    renderUsernames();
};

const removeUsername = function removeUsername() {
    inputOptions = new Promise((resolve) => {
        let usernames = JSON.parse(localStorage.getItem('usernames'));
        setTimeout(() => {
            resolve(usernames);
        }, 2000);
    });
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
        let userNameToRemove = removeUsernameAtIndex(index);
        swal({
            type: 'success',
            html: `You successfully removed ${userNameToRemove}`,
        });
    });
};

function removeUsernameAtIndex(index) {
    let usernames = JSON.parse(localStorage.getItem('usernames'));
    let userNameToRemove = usernames[index];
    usernames.splice(index, 1);
    localStorage.setItem('usernames', JSON.stringify(usernames));
    content.innerHTML = '';
    getData();
    renderUsernames();
    return userNameToRemove;
}

const showAllUsernames = function showAllUsernames() {
    showingAllUsernames = true;
    renderUsernames();
};

const showLessUsernames = function showLessUsernames() {
    showingAllUsernames = false;
    renderUsernames();
};

const renderShowMoreLessUsernames = function renderShowMoreLessUsernames() {
    const moreLessUsernamesElement = document.getElementById('showMoreLessUsernames');
    if (showingAllUsernames) { moreLessUsernamesElement.innerHTML = '<a href=javascript:showLessUsernames()><strong>Show less usernames</strong></a>'; } else { moreLessUsernamesElement.innerHTML = '<a href=javascript:showAllUsernames()><strong>Show more usernames</strong></a>'; }
};

const generateUsernameSelector = function generateUsernameSelector() {
    console.log(localStorage);
    let usernameSelector = '';
    let i = 0;
    let usernames = JSON.parse(localStorage.getItem('usernames'));
    if (showingAllUsernames || usernames.length <= MAX_USERNAMES_SHOWING) {
        for (; i < usernames.length - 1; i += 1) {
            usernameSelector += `<a class='selectors' href='https://github.com/${usernames[i]}?tab=stars'>${usernames[i]}</a>`;
            usernameSelector += ' | ';
        }
    } else {
        for (; i < MAX_USERNAMES_SHOWING - 1; i += 1) {
            usernameSelector += `<a class='selectors' href='https://github.com/${usernames[i]}?tab=stars'>${usernames[i]}</a>`;
            usernameSelector += ' | ';
        }
    }
    usernameSelector += `<a class='selectors' href='https://github.com/${usernames[i]}?tab=stars'>${usernames[i]}</a>`;
    return usernameSelector;
};

const renderUsernames = function renderUsernames() {
    document.getElementById('username_selector').innerHTML = generateUsernameSelector();
    document.getElementById('addOrRemoveUsername').innerHTML = "<a class='addOrRemoveUsername' href=javascript:addUsername()><strong>Add more username</strong></a>" +
        " | <a class='addOrRemoveUsername' href=javascript:removeUsername()><strong>Remove username</strong></a>";
    renderShowMoreLessUsernames();
};
