const minimumProjectsPerCall = 5;
const maximumProjectsPerUser = 2;
let projectsCurrentCall = 0;
let usersCurrentCall = 0;
let callInProgress = true;
const content = document.getElementById('content');

function allUsersChecked() { return usersCurrentCall === usernames.length; }

function moreDataNeeded() {
    return ((allUsersChecked()) && (projectsCurrentCall < minimumProjectsPerCall));
}

function userFormatter(username) {
    return `<a href='https://github.com/${username}?tab=stars'>${username}</a>`;
}


const emoji = new EmojiConvertor();
let reqNo = Math.floor(Math.random() * 3) + 1;
var projectsPerPage = 2;

function nFormatter(num) {
    if (num <= 999) {
        return `${num}`;
    } else if (num <= 99999) {
        return `${(num / 1000).toFixed(1)}k`;
    }
    return `${num}`;
}

function dataCollector(response, username) {
    usersCurrentCall += 1;
    const filterFunction = languageFilter(languageSelected);
    response.data.filter(filterFunction).slice(0, maximumProjectsPerUser).forEach((entry) => {
        if (typeof entry !== 'undefined') {
            projectsCurrentCall += 1;
            if (!entry.description) entry.description = '';
            let innerContent = `<li><span class='link'><a href='${entry.html_url}' target='_blank'>${entry.name}<span> - ${String(entry.description)}</span><br/></a></span>`;
            innerContent += "<div class='additional'>";
            innerContent += `${nFormatter(entry.stargazers_count)} <i class='fa fa-star'></i>`;
            innerContent += `&emsp;${nFormatter(entry.forks)} <i class='fa fa-code-fork'></i>`;
            innerContent += (entry.language != null) ? `&emsp;${entry.language}` : '';
            innerContent += `&emsp;(from ${userFormatter(username)})`;
            innerContent += '</div></li>';
            innerContent = emoji.replace_unified(innerContent);
            content.innerHTML += emoji.replace_colons(innerContent);
            emoji.img_sets.apple.path = 'http://cdn.mubaris.com/emojis/';
        }
    });
    if (moreDataNeeded()) {
        getData(localStorage.getItem('accessToken'));
    } else if (allUsersChecked()) {
        projectsCurrentCall = 0;
        callInProgress = false;
        document.getElementById('searching').innerHTML = '';
    }
}

function getData() {
    document.getElementById('searching').innerHTML = '<br/>Fetching projects...';
    usersCurrentCall = 0;
    callInProgress = true;
    reqNo += 1;
    for (let i = 0; i < usernames.length; i += 1) {
        const username = usernames[i];
        const url = `https://api.github.com/users/${username}/starred?per_page=${projectsPerPage}&access_token=${accessToken}&page=${reqNo}`;
        axios({
            url,
            method: 'get',
            responseType: 'json',
        }).then((response) => {
            dataCollector(response, username);
        }).catch((err) => {
            console.error(err);
        });
    }
}

let accessToken;

if (window.localStorage) {
    if (!localStorage.getItem('accessToken')) {
        swal({
            title: 'Submit Github Token',
            html: "Curiosity requires a Github Token to access Github API. Your token will be saved in LocalStorage. So don't worry. Get new token <a target='_blank' href='https://github.com/settings/tokens/new?description=Curiosity'>here</a>.",
            input: 'text',
            showCancelButton: true,
            confirmButtonText: 'Submit',
            showLoaderOnConfirm: false,
            preConfirm(token) {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        if (token === '') {
                            reject('Enter Valid Token');
                        } else {
                            localStorage.setItem('accessToken', token);
                            resolve();
                        }
                    }, 1000);
                });
            },
            allowOutsideClick: false,
        }).then((token) => {
            accessToken = token;
            getData();
            renderLanguageSelector();
            renderUsernames();
            swal({
                type: 'success',
                title: 'Thank You',
            });
        });
    }
} else {
    alert('Sorry! LocalStorage is not available');
}

accessToken = localStorage.getItem('accessToken');

if (accessToken) {
    getData();
    renderLanguageSelector();
    renderUsernames();
}

const options = {
    distance: 1,
    callback(done) {
        if (!callInProgress) getData();
        done();
    },
};

infiniteScroll(options);