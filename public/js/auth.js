const login_button = document.getElementById('login_button');
const logout_button = document.getElementById('logout_button');
const loggedIn = document.getElementById('loggedIn');

axios({
    url: '/user',
    method: 'get',
    responseType: 'json',
}).then((response) => {
    console.log(response);
    if (response.data) {
        loggedIn.style.display = 'inline-block';
        document.getElementById('userName').innerText = `Hi! ${response.data.name}`;
        document.getElementById('userName').href = response.data.html_url;
        return;
    }
    login_button.style.display = 'inline-block';
}).catch((err) => {
    login_button.style.display = 'inline-block';
    console.error(err);
});

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