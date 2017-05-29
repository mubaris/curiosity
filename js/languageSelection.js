const ANY_LANGUAGE = 'Any';
const NO_LANGUAGE = 'NoLanguage';
let languageSelected = ANY_LANGUAGE;

const generateLanguageSelector = function generateLanguageSelector() {
    const generateOption = function generateOption(value, text) {
        const optionElement = document.createElement('option');
        optionElement.value = value;
        optionElement.text = text;
        return optionElement;
    };

    const generateSection = function generateSection(sectionName, languages) {
        const sectionElement = document.createElement('optgroup');
        sectionElement.label = sectionName;
        return sectionElement;
    };

    const languageSelectElement = document.createElement('select');
    languageSelectElement.id = 'languageSelectElement';
    languageSelectElement.add(generateOption(ANY_LANGUAGE, 'Any languages'));
    languageSelectElement.add(generateOption(NO_LANGUAGE, 'No language'));
    languageSelectElement.add(generateSection('COMMON LANGUAGES'));
    COMMON_LANGUAGES.forEach((language) => {
        languageSelectElement.add(generateOption(language, language));
    });
    languageSelectElement.add(generateSection('REST OF LANGUAGES'));
    REST_OF_LANGUAGES.forEach((language) => {
        languageSelectElement.add(generateOption(language, language));
    });
    languageSelectElement.addEventListener('change', selectLanguage, false);
    return languageSelectElement;
};

const renderLanguageSelector = function renderLanguageSelector() {
    const languageSelectorElement = document.getElementById('language_selector');
    languageSelectorElement.innerHTML = '';
    languageSelectorElement.appendChild(generateLanguageSelector());
};

const selectLanguage = function selectLanguage(event) {
    languageSelected = event.target.value;
    content.innerHTML = '';
    reqNo = Math.floor(Math.random() * 3) + 1;
    projectsPerPage = (languageSelected == ANY_LANGUAGE) ? 2 : 100;
    getData();
};

const languageFilter = function (languageToFilter) {
    if (languageToFilter == ANY_LANGUAGE) {
        return function (project) { return true; };
    } else if (languageSelected == NO_LANGUAGE) {
        return function (project) {
            return project.language == null;
        };
    }
    return function (project) { return project.language == languageToFilter; };
};
