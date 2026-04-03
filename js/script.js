const checkReferralBtn = document.getElementById("checkReferralBtn");
const languageSelect = document.getElementById("languageSelect");
const specialtySelect = document.getElementById("specialty");
const insuranceSelect = document.getElementById("insurance");

const LANGUAGE_STORAGE_KEY = "selectedLanguage";
const DEFAULT_LANGUAGE = "en";

function getSavedLanguage() {
  const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);

  if (savedLanguage && translations[savedLanguage]) {
    return savedLanguage;
  }

  return DEFAULT_LANGUAGE;
}

function getCurrentTranslations(language) {
  return translations[language] || translations[DEFAULT_LANGUAGE];
}

function applyTranslations(language) {
  const currentTranslations = getCurrentTranslations(language);
  const translatableElements = document.querySelectorAll("[data-i18n]");

  document.documentElement.lang = language;

  translatableElements.forEach((element) => {
    const translationKey = element.dataset.i18n;
    const translatedText = currentTranslations[translationKey];

    if (translatedText) {
      element.textContent = translatedText;
    }
  });
}

function setLanguage(language) {
  const nextLanguage = translations[language] ? language : DEFAULT_LANGUAGE;

  localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLanguage);
  languageSelect.value = nextLanguage;
  applyTranslations(nextLanguage);
}

setLanguage(getSavedLanguage());

languageSelect.addEventListener("change", function () {
  setLanguage(languageSelect.value);
});

checkReferralBtn.addEventListener("click", function () {
  const selectedSpecialty = specialtySelect.value;
  const selectedInsurance = insuranceSelect.value;

  if (selectedSpecialty === "" || selectedInsurance === "") {
    alert("Please choose a specialty and insurance.");
    return;
  }

  localStorage.setItem("specialty", selectedSpecialty);
  localStorage.setItem("insurance", selectedInsurance);

  window.location.href = "results.html";
});
