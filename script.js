var usernames = [
  "tj",
  "addyosmani",
  "paulirish",
  "sindresorhus",
  "gaearon",
  "defunkt",
  "daimajia",
  "yyx990803",
  "kennethreitz",
  "Trinea",
  "JacksonTian",
  "substack",
  "stormzhang",
  "angusshire",
  "onevcat",
  "clowwindy",
  "getify",
  "ibireme",
  "phodal",
  "ryanb",
  "muan",
  "isaacs",
  "justjavac",
  "ChenYilong",
  "cusspvz",
  "feross"
]

function httpGetAsync(url, callback) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
      callback(xmlHttp.responseText);
  }
  xmlHttp.open("GET", url, true);
  xmlHttp.send(null);
}

for (i = 0; i < usernames.length; i++) {
  url = "https://api.github.com/users/" + usernames[i] + "/starred?access_token=fe3c190aad07d0c475b7df840d79fc75980ee932";
  httpGetAsync(url, dataCollector);
}
var content = document.getElementById("content");
var dataStorage = [];

function dataCollector(response) {
  //dataStorage.push(response);
  for (i = 0; i < 30; i++) {
    content.innerHTML += "<a href='" + JSON.parse(response)[i].html_url + "' target='_blank'>" + JSON.parse(response)[i].name + "</a>" + "<br>";
  }
}
