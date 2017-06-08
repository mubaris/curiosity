const login_button = document.getElementById('login_button');
const logout_button = document.getElementById('logout_button');
const loggedIn = document.getElementById('loggedIn');

function getUserDetails() {
    return axios({
        url: '/user',
        method: 'get',
        responseType: 'json',
    });
}


logout_button.addEventListener('click', () => {
    axios({
        url: '/user/logout',
        method: 'post',
    }).then((response) => {
        login_button.style.display = 'inline-block';
        loggedIn.style.display = 'none';
    }).catch((err) => {
        login_button.style.display = 'inline-block';
        loggedIn.style.display = 'none';
        console.error(err);
    });
});