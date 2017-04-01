var emoji = new EmojiConvertor();
var reqNo = Math.floor(Math.random() * 3) + 1;
var perPage = 2;

function httpGetAsync(url, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    };
    xmlHttp.open("GET", url, true);
    xmlHttp.send(null);
    reqNo += 1;
}

function getData(token) {
    for (i = 0; i < usernames.length; i++) {
        url = "https://api.github.com/users/" + usernames[i] + "/starred?per_page=" + perPage + "&access_token=" + token + "&page=" + reqNo + 1;
        httpGetAsync(url, dataCollector);
    }
}

function nFormatter(num) {
    if (num <= 999) {
        return num + "";
    } else if (num <= 99999) {
        return (num / 1000).toFixed(1) + "k";
    }
}

var content = document.getElementById("content");
var dataStorage = [];

function dataCollector(response) {
    //dataStorage.push(response);
    for (i = 0; i < perPage; i++) {
        if (typeof JSON.parse(response)[i] != "undefined") {
            var innerContent = "<li><span class='link'><a href='" + JSON.parse(response)[i].html_url + "' target='_blank'>" + JSON.parse(response)[i].name + "<span> - " + String(JSON.parse(response)[i].description) + "</span>" + "<br/></a></span>";
            innerContent += "<div class='additional'>" + nFormatter(JSON.parse(response)[i].stargazers_count) + " <i class='fa fa-star'></i> &emsp;" + nFormatter(JSON.parse(response)[i].forks) + "   <i class='fa fa-code-fork'></i>";
            innerContent += (JSON.parse(response)[i].language != null) ? "&emsp;" + JSON.parse(response)[i].language + "</div></li>" : "</div></li>";
            innerContent = emoji.replace_unified(innerContent);
            content.innerHTML += emoji.replace_colons(innerContent);
            emoji.img_sets.apple.path = "http://cdn.mubaris.com/emojis/";
        }
    }
}

if (window.localStorage) {
    if (!localStorage.getItem("accessToken")) {
        swal({
            title: "Submit Github Token",
            html: "Curiosity uses Github Token to access Github API. Your token will be saved in LocalStorage. So don't worry. Get new token <a target='_blank' href='https://github.com/settings/tokens/new'>here</a>.",
            input: "text",
            showCancelButton: true,
            confirmButtonText: "Submit",
            showLoaderOnConfirm: false,
            preConfirm: function(token) {
                return new Promise(function(resolve, reject) {
                    setTimeout(function() {
                        if (token == '') {
                            reject("Enter Valid Token");
                        } else {
                            localStorage.setItem("accessToken", token);
                            resolve();
                        }
                    }, 1000);
                });
            },
            allowOutsideClick: false
        }).then(function(token) {
            getData(token);
            swal({
                type: "success",
                title: "Thank You"
            })
        })
    }
} else {
    alert("Sorry! LocalStorage is not available");
}

accessToken = localStorage.getItem("accessToken");

if (localStorage.getItem("accessToken")) {
    getData(localStorage.getItem("accessToken"));
}

var options = {
    distance: 1,
    callback: function(done) {
        getData(localStorage.getItem("accessToken"));
        done();
    }
}

infiniteScroll(options);
