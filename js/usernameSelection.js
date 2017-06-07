const MAX_USERNAMES_SHOWING = 5;

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
    let usernameSelector = document.getElementById("username_selector");            
    usernameSelector.style.display = usernameSelector.style.display === "none" ? "block" : "none";
};

const generateUsernameSelector = function generateUsernameSelector() {
    let usernameSelector = '';
    let i = 0;
    let usernames = JSON.parse(localStorage.getItem('usernames'));
    for (; i < usernames.length - 1; i += 1) {
        usernameSelector += `<a class='selectors' href='https://github.com/${usernames[i]}?tab=stars'>${usernames[i]}</a>`;
        usernameSelector += ' | ';
    }        
    usernameSelector += `<a class='selectors' href='https://github.com/${usernames[i]}?tab=stars'>${usernames[i]}</a>`;
    return usernameSelector;
};

const renderUsernames = function renderUsernames() {
    document.getElementById("username_selector").innerHTML = generateUsernameSelector();
    document.getElementById("addUsername").setAttribute("href", "javascript:addUsername()");     
    document.getElementById("removeUsername").setAttribute("href", "javascript:removeUsername()"); 
    document.getElementById("showUsernames").setAttribute("href", "javascript:showAllUsernames()"); 

    document.getElementById("settings").onclick = function() {
        var settings = document.getElementById("dropdown_content");
        settings.style.display = settings.style.display == (null || "none") ? "block" : "none";
    };
};
