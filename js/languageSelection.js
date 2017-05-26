const anyLanguage = 'All';
const noLanguage = 'NoLanguage';
let languageSelected = anyLanguage;
const languagesPerPage = 100;
let minimimalNumberOfAppareances = 10;
const maxNumberOfLanguageCallsPerUser = 2;

var userLanguagesRequested = 0;

function generateLanguageSelector() {
    function generateOption(value, text) {
        var optionElement = document.createElement("option");
        optionElement.value = value;
        optionElement.text = text;
        return optionElement;
    }

    var languageSelectElement = document.createElement("select");
    languageSelectElement.id = "languageSelectElement";
    languageSelectElement.add(generateOption("All", "All languages"));
    languageSelectElement.add(generateOption("NoLanguage", "No Language"));
    languages.forEach((language) => {
        languageSelectElement.add(generateOption(language, language));
    });
    languageSelectElement.addEventListener("change", selectLanguage, false);
    return languageSelectElement;
}

function renderLanguageSelector() {
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