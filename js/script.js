const pageElements = {
  topBar: document.querySelector(".top-bar"),
  languageSelect: document.getElementById("languageSelect"),
  specialtyInput: document.getElementById("specialty"),
  insuranceInput: document.getElementById("insurance"),
  checkReferralButton: document.getElementById("checkReferralBtn"),
};

const customDropdowns = Array.from(document.querySelectorAll("[data-dropdown]")).map(
  createDropdownConfig
);

function createDropdownConfig(dropdownElement) {
  return {
    root: dropdownElement,
    trigger: dropdownElement.querySelector(".dropdown-trigger"),
    triggerText: dropdownElement.querySelector(".dropdown-trigger-text"),
    panel: dropdownElement.querySelector(".dropdown-panel"),
    input: dropdownElement.querySelector('input[type="hidden"]'),
    options: Array.from(dropdownElement.querySelectorAll(".dropdown-option")),
    placeholderKey: dropdownElement.dataset.placeholderI18n,
  };
}

function getCurrentPageText() {
  return appI18n.getTranslations(appI18n.getLanguage());
}

function applyLanguageToPage(language) {
  const savedLanguage = appI18n.saveLanguage(language);

  appI18n.syncLanguageSelect(pageElements.languageSelect, savedLanguage);
  appI18n.applyTranslations(savedLanguage);
  updateAllDropdownLabels();
}

function getReferralFormValues() {
  return {
    specialty: pageElements.specialtyInput.value,
    insurance: pageElements.insuranceInput.value,
  };
}

function showMissingSelectionAlert() {
  alert(getCurrentPageText().chooseSpecialtyAndInsuranceAlert);
}

function saveReferralFormValues(referralFormValues) {
  localStorage.setItem("specialty", referralFormValues.specialty);
  localStorage.setItem("insurance", referralFormValues.insurance);
}

function getSelectedDropdownOption(dropdown) {
  return dropdown.options.find((option) => option.dataset.value === dropdown.input.value) || null;
}

function getDropdownPlaceholderText(dropdown) {
  return getCurrentPageText()[dropdown.placeholderKey] || "";
}

function updateDropdownLabel(dropdown) {
  const selectedOption = getSelectedDropdownOption(dropdown);

  if (selectedOption) {
    dropdown.triggerText.textContent = selectedOption.textContent.trim();
    dropdown.trigger.classList.remove("is-placeholder");
    return;
  }

  dropdown.triggerText.textContent = getDropdownPlaceholderText(dropdown);
  dropdown.trigger.classList.add("is-placeholder");
}

function updateDropdownSelectionState(dropdown) {
  dropdown.options.forEach((option) => {
    const isSelected = option.dataset.value === dropdown.input.value;

    option.classList.toggle("is-selected", isSelected);
    option.setAttribute("aria-selected", String(isSelected));
  });
}

function syncDropdownUI(dropdown) {
  updateDropdownSelectionState(dropdown);
  updateDropdownLabel(dropdown);
}

function updateAllDropdownLabels() {
  customDropdowns.forEach(syncDropdownUI);
}

function closeDropdown(dropdown) {
  dropdown.root.classList.remove("open");
  dropdown.trigger.setAttribute("aria-expanded", "false");
  dropdown.panel.hidden = true;
}

function closeAllDropdowns(exceptDropdown = null) {
  customDropdowns.forEach((dropdown) => {
    if (dropdown !== exceptDropdown) {
      closeDropdown(dropdown);
    }
  });
}

function focusDropdownOption(dropdown, optionIndex) {
  if (dropdown.options[optionIndex]) {
    dropdown.options[optionIndex].focus();
  }
}

function focusSelectedOrFirstOption(dropdown) {
  const selectedIndex = dropdown.options.findIndex(
    (option) => option.dataset.value === dropdown.input.value
  );

  focusDropdownOption(dropdown, selectedIndex >= 0 ? selectedIndex : 0);
}

function openDropdown(dropdown) {
  closeAllDropdowns(dropdown);
  dropdown.root.classList.add("open");
  dropdown.trigger.setAttribute("aria-expanded", "true");
  dropdown.panel.hidden = false;
}

function toggleDropdown(dropdown) {
  const isOpen = dropdown.root.classList.contains("open");

  if (isOpen) {
    closeDropdown(dropdown);
    return;
  }

  openDropdown(dropdown);
}

function selectDropdownOption(dropdown, option) {
  dropdown.input.value = option.dataset.value;
  syncDropdownUI(dropdown);
  closeDropdown(dropdown);
  dropdown.trigger.focus();
}

function handleTriggerKeydown(event, dropdown) {
  if (event.key === "ArrowDown" || event.key === "ArrowUp") {
    event.preventDefault();
    openDropdown(dropdown);
    focusSelectedOrFirstOption(dropdown);
  }

  if (event.key === "Escape") {
    closeDropdown(dropdown);
  }
}

function handleOptionKeydown(event, dropdown, optionIndex) {
  if (event.key === "ArrowDown") {
    event.preventDefault();
    focusDropdownOption(dropdown, Math.min(optionIndex + 1, dropdown.options.length - 1));
  }

  if (event.key === "ArrowUp") {
    event.preventDefault();
    focusDropdownOption(dropdown, Math.max(optionIndex - 1, 0));
  }

  if (event.key === "Home") {
    event.preventDefault();
    focusDropdownOption(dropdown, 0);
  }

  if (event.key === "End") {
    event.preventDefault();
    focusDropdownOption(dropdown, dropdown.options.length - 1);
  }

  if (event.key === "Escape") {
    closeDropdown(dropdown);
    dropdown.trigger.focus();
  }

  if (event.key === "Tab") {
    closeDropdown(dropdown);
  }
}

function setupDropdown(dropdown) {
  dropdown.trigger.addEventListener("click", function () {
    toggleDropdown(dropdown);
  });

  dropdown.trigger.addEventListener("keydown", function (event) {
    handleTriggerKeydown(event, dropdown);
  });

  dropdown.options.forEach((option, optionIndex) => {
    option.addEventListener("click", function () {
      selectDropdownOption(dropdown, option);
    });

    option.addEventListener("keydown", function (event) {
      handleOptionKeydown(event, dropdown, optionIndex);
    });
  });

  dropdown.root.addEventListener("focusout", function (event) {
    if (!dropdown.root.contains(event.relatedTarget)) {
      closeDropdown(dropdown);
    }
  });

  syncDropdownUI(dropdown);
}

function closeDropdownsOnOutsideClick(event) {
  customDropdowns.forEach((dropdown) => {
    if (!dropdown.root.contains(event.target)) {
      closeDropdown(dropdown);
    }
  });
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

function updateTopBarOnScroll() {
  const hasScrolled = window.scrollY > 12;
  const maxScrollForFade = 260;
  const scrollRatio = Math.min(window.scrollY / maxScrollForFade, 1);
  const topBarOpacity = 0.94 - scrollRatio * 0.22;

  pageElements.topBar.classList.toggle("scrolled", hasScrolled);
  pageElements.topBar.style.setProperty("--top-bar-opacity", topBarOpacity.toFixed(2));
}

function initializeLandingPage() {
  customDropdowns.forEach(setupDropdown);
  applyLanguageToPage(appI18n.getLanguage());
  updateTopBarOnScroll();

  pageElements.languageSelect.addEventListener("change", handleLanguageChange);
  pageElements.checkReferralButton.addEventListener("click", handleCheckReferral);
  document.addEventListener("click", closeDropdownsOnOutsideClick);
  window.addEventListener("scroll", updateTopBarOnScroll, { passive: true });
}

initializeLandingPage();
