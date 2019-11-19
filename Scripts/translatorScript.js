//--------------------------------------------------------- TRANSLATION FUNCIONS

function toTranslate(wordToTranslate) {
    var full_translation = wordToTranslate;

    // Translate the result to another language using Google translate API
    var url = `https://www.googleapis.com/language/translate/v2/?key=${translateAPIKey}&target=${exitLang}&source=${entryLang}&q=${full_translation}`;

    loadJSON(url, gotTranslation);
}

function gotTranslation(result) {
    if (result.data.translations) {
        translatedRes = result.data.translations[0].translatedText;
    }
}