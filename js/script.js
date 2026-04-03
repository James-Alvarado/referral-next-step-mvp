const pageElements = {
  languageSelect: document.getElementById("languageSelect"),
  specialtySelect: document.getElementById("specialty"),
  insuranceSelect: document.getElementById("insurance"),
  checkReferralButton: document.getElementById("checkReferralBtn"),
};

function applyLanguageToPage(language) {
  const savedLanguage = appI18n.saveLanguage(language);

  appI18n.syncLanguageSelect(pageElements.languageSelect, savedLanguage);
  appI18n.applyTranslations(savedLanguage);
}

function getReferralFormValues() {
  return {
    specialty: pageElements.specialtySelect.value,
    insurance: pageElements.insuranceSelect.value,
  };
}

function showMissingSelectionAlert() {
  const currentLanguage = appI18n.getLanguage();
  const pageText = appI18n.getTranslations(currentLanguage);

  alert(pageText.chooseSpecialtyAndInsuranceAlert);
}

function saveReferralFormValues(referralFormValues) {
  localStorage.setItem("specialty", referralFormValues.specialty);
  localStorage.setItem("insurance", referralFormValues.insurance);
}

function handleLanguageChange() {
  applyLanguageToPage(pageElements.languageSelect.value);
}

function handleCheckReferral() {
  const referralFormValues = getReferralFormValues();

  if (!referralFormValues.specialty || !referralFormValues.insurance) {
    showMissingSelectionAlert();
    return;
  }

  saveReferralFormValues(referralFormValues);
  window.location.href = "results.html";
}

function initializeLandingPage() {
  applyLanguageToPage(appI18n.getLanguage());

  pageElements.languageSelect.addEventListener("change", handleLanguageChange);
  pageElements.checkReferralButton.addEventListener("click", handleCheckReferral);
}

initializeLandingPage();
