const anyLanguage = 'All';
const noLanguage = 'NoLanguage';
let languageSelected = anyLanguage;
const languagesPerPage = 100;
let minimimalNumberOfAppareances = 10;
const maxNumberOfLanguageCallsPerUser = 2;
const languages = new Map();
languages.set(anyLanguage, 0);

var userLanguagesRequested = 0;

function getUserStarredProjectsLanguages(username, page) {
    function getLanguages(response) {
        function addLanguage(language) {
            if (language) {
                languages.set(anyLanguage, languages.get(anyLanguage) + 1);
                if (languages.get(language)) {
                    languages.set(language, languages.get(language) + 1);
                } else { languages.set(language, 1); }
            }
        }

        response.data.forEach((starredProject) => {
            if (typeof starredProject !== 'undefined') {
                const projectMainLanguage = starredProject.language ? starredProject.language : 'NoLanguage';
                addLanguage(projectMainLanguage);
            }
        });
        
        page += 1;
        if ((response.data.length != 0) && (page < maxNumberOfLanguageCallsPerUser)) {
            getUserStarredProjectsLanguages(username, page);
        }

        ++userLanguagesRequested;
        if (userLanguagesRequested == usernames.length)  {
            renderLanguagesSelector();        
            document.getElementById("languageSelectElement").addEventListener('change', selectLanguage, false);
        }
    }

    const url = `https://api.github.com/users/${username}/starred?&access_token=${accessToken}&per_page=${languagesPerPage}&page=${page}`;
    axios({
        url,
        method: 'get',
        responseType: 'json',
    }).then((response) => {
        getLanguages(response);
    }).catch((err) => {
        console.log(err);
    });
}

function getLanguagesToShow() {
    usernames.forEach((username) => {
        getUserStarredProjectsLanguages(username, 1);
        
    });
}

function generateLanguageSelector() {
    var languageSelectElement = document.createElement("select");
    languageSelectElement.id = "languageSelectElement";
    languages.forEach((appareances, language) => {
        var option = document.createElement("option");
        option.text = language;
        option.value = language;
        languageSelectElement.add(option);
    });
    return languageSelectElement;
}

function renderLanguagesSelector() {
    var languageSelectorElement = document.getElementById('language_selector');
    languageSelectorElement.innerHTML = "";
    languageSelectorElement.appendChild(generateLanguageSelector());
}

function selectLanguage(event) {
    languageSelected = event.target.value;
    content.innerHTML = '';
    reqNo = Math.floor(Math.random() * 3) + 1;
    projectsPerPage = (languageSelected == anyLanguage) ? 2 : 100;
    getData();
}

const languageFilter = function (languageToFilter) {
    if (languageToFilter == anyLanguage) {
        return function (project) { return true; };
    } else if (languageSelected == noLanguage) {
        return function (project) {
            return project.language == null;
        };
    }
    return function (project) { return project.language == languageToFilter; };
};