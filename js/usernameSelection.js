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
                        reject(new Error('Username cannot be null.'));
                    } else if (checkIfUsernameAlreadyExists(username)) {
                        reject(new Error('Username already exists! Please add a different username.'));
                    } else {
                        // check for valid username
                        let accessToken = localStorage.getItem('accessToken');
                        const url = `https://api.github.com/users/${username}?access_token=${accessToken}`;
                        axios({
                            url,
                            method: 'get',
                            responseType: 'json',
                        }).then((response) => {
                            resolve();
                        }).catch((err) => {
                            reject(new Error('Username not found!'));
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
    USERNAMES.push(username);
    localStorage.setItem('usernames', JSON.stringify(USERNAMES));
    content.innerHTML = '';
    getData();
    renderUsernames();
};

const inputOptions = new Promise((resolve) => {
    setTimeout(() => {
        resolve(USERNAMES);
    }, 2000);
});

const removeUsername = function removeUsername() {
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
                    reject(new Error('You need to select a username!'));
                }
            });
        },
    }).then((index) => {
        swal({
            type: 'success',
            html: `You successfully removed ${USERNAMES[index]}`,
        });
        removeUsernameAtIndex(index);
    });
};

const removeUsernameAtIndex = function removeUsernameAtIndex(index) {
    USERNAMES.splice(index, 1);
    localStorage.setItem('usernames', JSON.stringify(USERNAMES));
    content.innerHTML = '';
    getData();
    renderUsernames();
};

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
    let usernameSelector = '';
    let i = 0;
    if (showingAllUsernames || USERNAMES.length <= MAX_USERNAMES_SHOWING) {
        for (; i < USERNAMES.length - 1; i += 1) {
            usernameSelector += `<a class='selectors' href='https://github.com/${USERNAMES[i]}?tab=stars'>${USERNAMES[i]}</a>`;
            usernameSelector += ' | ';
        }
    } else {
        for (; i < MAX_USERNAMES_SHOWING - 1; i += 1) {
            usernameSelector += `<a class='selectors' href='https://github.com/${USERNAMES[i]}?tab=stars'>${USERNAMES[i]}</a>`;
            usernameSelector += ' | ';
        }
    }
    usernameSelector += `<a class='selectors' href='https://github.com/${USERNAMES[i]}?tab=stars'>${USERNAMES[i]}</a>`;
    return usernameSelector;
};

const renderUsernames = function renderUsernames() {
    document.getElementById('username_selector').innerHTML = generateUsernameSelector();
    document.getElementById('addOrRemoveUsername').innerHTML = "<a class='addOrRemoveUsername' href=javascript:addUsername()><strong>Add more username</strong></a>" +
        " | <a class='addOrRemoveUsername' href=javascript:removeUsername()><strong>Remove username</strong></a>";
    renderShowMoreLessUsernames();
};

const checkIfUsernameAlreadyExists = function checkIfUsernameAlreadyExists(username) {
    return USERNAMES.includes(username);
};
