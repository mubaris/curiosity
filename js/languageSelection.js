const anyLanguage = 'All';
const noLanguage = 'NoLanguage';
let languageSelected = anyLanguage;
const languagesPerPage = 100;
let minimimalNumberOfAppareances = 10;
const maxNumberOfLanguageCallsPerUser = 2;
const languages = new Map();
languages.set(anyLanguage, 0);


function getUserStarredProjectsLanguages(username, page) {
    function getLanguages(response) {
        function addLanguage(language) {
            if (language) {
                languages.set(anyLanguage, languages.get(anyLanguage) + 1);
                if (languages.get(language)) { languages.set(language, languages.get(language) + 1); } else { languages.set(language, 1); }
            }
        }

        response.data.forEach((starredProject) => {
            if (typeof starredProject !== 'undefined') {
                const projectMainLanguage = starredProject.language ? starredProject.language : 'NoLanguage';
                addLanguage(projectMainLanguage);
            }
        });
        renderLanguagesSelector();
        renderShowMoreLessLanguages();
        ++page;
        if ((response.data.length != 0) && (page < maxNumberOfLanguageCallsPerUser)) getUserStarredProjectsLanguages(username, page);
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
    const minimimalAppareancesFilter = function (appareances) {
        return (appareances >= minimimalNumberOfAppareances);
    };

    function strongFont(language) {
        return ((language == languageSelected) || ((language == anyLanguage) && (languageSelected == anyLanguage)));
    }

    let languageSelector = '';
    languages.forEach((appareances, language) => {
        if (minimimalAppareancesFilter(appareances)) {
            const languageHTMLText = strongFont(language) ? `<strong>${language}</strong>` : language;
            languageSelector += (language == anyLanguage) ? '' : ' | ';
            languageSelector += `<a class='language' href=javascript:selectLanguage('${encodeURIComponent(language.trim())}')>${languageHTMLText}</a>`;
        }
    });
    return languageSelector;
}

function renderLanguagesSelector() {
    document.getElementById('language_selector').innerHTML = generateLanguageSelector();
}

function selectLanguage(language) {
    languageSelected = language;
    content.innerHTML = '';
    reqNo = Math.floor(Math.random() * 3) + 1;
    projectsPerPage = (languageSelected == anyLanguage) ? 2 : 100;
    getData();
    renderLanguagesSelector();
}

const languageFilter = function (languageToFilter) {
    if (languageToFilter == anyLanguage) { return function (project) { return true; }; } else
        if (languageSelected == noLanguage) { return function (project) { return project.language == null; }; }
    return function (project) { return project.language == languageToFilter; };
};

function showAllLanguages() {
    minimimalNumberOfAppareances = 0;
    renderLanguagesSelector();
    renderShowMoreLessLanguages();
}

function showLessLanguages() {
    minimimalNumberOfAppareances = 10;
    renderLanguagesSelector();
    renderShowMoreLessLanguages();
}

function renderShowMoreLessLanguages() {
    const moreLessLanguagesElement = document.getElementById('showMoreLessLanguages');
    if (minimimalNumberOfAppareances == 0) { moreLessLanguagesElement.innerHTML = '  <a href=javascript:showLessLanguages()><strong>Show less languages</strong></a>'; } else { moreLessLanguagesElement.innerHTML = '<a href=javascript:showAllLanguages()><strong>Show more languages</strong></a>'; }
}
