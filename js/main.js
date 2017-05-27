const MIN_PROJECTS_PER_CALL = 5;
const MAX_PROJECTS_PER_USER = 2;
const CONTENT = document.getElementById('content');
const EMOJI = new EmojiConvertor();
let projectsCurrentCall = 0;
let usersCurrentCall = 0;
let callInProgress = true;
let reqNo = Math.floor(Math.random() * 3) + 1;
let projectsPerPage = 2;
let accessToken;

const allUsersChecked = function allUsersChecked() {
    return usersCurrentCall === USERNAMES.length;
};

const moreDataNeeded = function moreDataNeeded() {
    return ((allUsersChecked()) && (projectsCurrentCall < MIN_PROJECTS_PER_CALL));
};

const userFormatter = function userFormatter(username) {
    return `<a href='https://github.com/${username}?tab=stars'>${username}</a>`;
};

const nFormatter = function nFormatter(num) {
    if (num <= 999) {
        return `${num}`;
    } else if (num <= 99999) {
        return `${(num / 1000).toFixed(1)}k`;
    }
    return `${num}`;
};

const dataCollector = function dataCollector(response, username) {
    usersCurrentCall += 1;
    const filterFunction = languageFilter(languageSelected);
    response.data.filter(filterFunction).slice(0, MAX_PROJECTS_PER_USER).forEach((entry) => {
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
            innerContent = EMOJI.replace_unified(innerContent);
            CONTENT.innerHTML += EMOJI.replace_colons(innerContent);
            EMOJI.img_sets.apple.path = 'http://cdn.mubaris.com/emojis/';
        }
    });
    if (moreDataNeeded()) {
        getData(localStorage.getItem('accessToken'));
    } else if (allUsersChecked()) {
        projectsCurrentCall = 0;
        callInProgress = false;
        document.getElementById('searching').innerHTML = '';
    }
};

const getData = function getData() {
    document.getElementById('searching').innerHTML = '<br/>Fetching projects...';
    usersCurrentCall = 0;
    callInProgress = true;
    reqNo += 1;
    USERNAMES.forEach((username) => {
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
    });
};

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

const OPTIONS = {
    distance: 1,
    callback(done) {
        if (!callInProgress) getData();
        done();
    },
};

infiniteScroll(OPTIONS);