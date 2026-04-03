const languageSelect = document.getElementById("languageSelect");
const resultInfo = document.getElementById("resultInfo");
const providerList = document.getElementById("providerList");
const calendarGrid = document.getElementById("calendarGrid");
const timeSlots = document.getElementById("timeSlots");
const bookAppointmentBtn = document.getElementById("bookAppointmentBtn");
const calendarSection = document.querySelector(".calendar-section");
const timesSection = document.querySelector(".times-section");
const bookingSection = document.querySelector(".booking-section");

const bookingModal = document.getElementById("bookingModal");
const closeModalBtn = document.getElementById("closeModalBtn");

const modalSpecialty = document.getElementById("modalSpecialty");
const modalDoctor = document.getElementById("modalDoctor");
const modalDate = document.getElementById("modalDate");
const modalTime = document.getElementById("modalTime");

const specialty = localStorage.getItem("specialty");
const insurance = localStorage.getItem("insurance");

const LANGUAGE_STORAGE_KEY = "selectedLanguage";
const DEFAULT_LANGUAGE = "en";

let currentLanguage = DEFAULT_LANGUAGE;

bookingModal.classList.add("hidden");
bookAppointmentBtn.classList.add("hidden");

const specialtyTranslationKeys = {
  cardiology: "cardiologyName",
  dermatology: "dermatologyName",
  gynecology: "gynecologyName",
  "infectious-disease": "infectiousDiseaseName",
  endocrinology: "endocrinologyName"
};

const insuranceLabels = {
  metroplus: "MetroPlus",
  aetna: "Aetna",
  medicaid: "Medicaid"
};

const providerData = {
  cardiology: {
    metroplus: [
      { name: "Dr. Ana Rivera", location: "Harlem, Manhattan" },
      { name: "Dr. James Carter", location: "Bushwick, Brooklyn" },
      { name: "Dr. Sofia Morales", location: "Chelsea, Manhattan" }
    ],
    aetna: [
      { name: "Dr. Kevin Brooks", location: "Astoria, Queens" },
      { name: "Dr. Laura Chen", location: "Washington Heights, Manhattan" },
      { name: "Dr. Miguel Santos", location: "Downtown Brooklyn, Brooklyn" }
    ],
    medicaid: [
      { name: "Dr. Tiana Lewis", location: "South Bronx, Bronx" },
      { name: "Dr. Eric Hall", location: "Jamaica, Queens" },
      { name: "Dr. Daniela Ruiz", location: "Sunset Park, Brooklyn" }
    ]
  },
  dermatology: {
    metroplus: [
      { name: "Dr. Emily Torres", location: "Harlem, Manhattan" },
      { name: "Dr. Rachel Kim", location: "Bushwick, Brooklyn" },
      { name: "Dr. Daniel Flores", location: "Chelsea, Manhattan" }
    ],
    aetna: [
      { name: "Dr. Nina Patel", location: "Astoria, Queens" },
      { name: "Dr. Marcus Green", location: "Upper East Side, Manhattan" },
      { name: "Dr. Elena Cruz", location: "Williamsburg, Brooklyn" }
    ],
    medicaid: [
      { name: "Dr. Olivia Reed", location: "South Bronx, Bronx" },
      { name: "Dr. Jason Perez", location: "Corona, Queens" },
      { name: "Dr. Lucia Gomez", location: "Flatbush, Brooklyn" }
    ]
  },
  gynecology: {
    metroplus: [
      { name: "Dr. Isabel Vega", location: "Harlem, Manhattan" },
      { name: "Dr. Karen White", location: "Bushwick, Brooklyn" },
      { name: "Dr. Monica Reyes", location: "Chelsea, Manhattan" }
    ],
    aetna: [
      { name: "Dr. Priya Shah", location: "Astoria, Queens" },
      { name: "Dr. Amanda Scott", location: "Midtown, Manhattan" },
      { name: "Dr. Paula Jimenez", location: "Park Slope, Brooklyn" }
    ],
    medicaid: [
      { name: "Dr. Selena Ortiz", location: "South Bronx, Bronx" },
      { name: "Dr. Brittany Cole", location: "Jamaica, Queens" },
      { name: "Dr. Marisol Peña", location: "Bay Ridge, Brooklyn" }
    ]
  },
  "infectious-disease": {
    metroplus: [
      { name: "Dr. Victor Alvarez", location: "Harlem, Manhattan" },
      { name: "Dr. Hannah Lee", location: "Bushwick, Brooklyn" },
      { name: "Dr. Camila Soto", location: "Chelsea, Manhattan" }
    ],
    aetna: [
      { name: "Dr. Steven Park", location: "Astoria, Queens" },
      { name: "Dr. Melissa Grant", location: "Upper West Side, Manhattan" },
      { name: "Dr. José Ramirez", location: "Downtown Brooklyn, Brooklyn" }
    ],
    medicaid: [
      { name: "Dr. Natalie Young", location: "South Bronx, Bronx" },
      { name: "Dr. Kevin Martinez", location: "Elmhurst, Queens" },
      { name: "Dr. Rosa Delgado", location: "Crown Heights, Brooklyn" }
    ]
  },
  endocrinology: {
    metroplus: [
      { name: "Dr. Teresa Hill", location: "Harlem, Manhattan" },
      { name: "Dr. Bianca Lopez", location: "Bushwick, Brooklyn" },
      { name: "Dr. Adrian Romero", location: "Chelsea, Manhattan" }
    ],
    aetna: [
      { name: "Dr. Helen Wright", location: "Astoria, Queens" },
      { name: "Dr. Omar Hassan", location: "Midtown East, Manhattan" },
      { name: "Dr. Carolina Diaz", location: "Fort Greene, Brooklyn" }
    ],
    medicaid: [
      { name: "Dr. Jasmine Foster", location: "South Bronx, Bronx" },
      { name: "Dr. Leo Torres", location: "Jackson Heights, Queens" },
      { name: "Dr. Andrea Castillo", location: "East Flatbush, Brooklyn" }
    ]
  }
};

const availableAppointments = [
  "2026-04-08",
  "2026-04-10",
  "2026-04-12",
  "2026-04-15",
  "2026-04-18"
];

const timeData = {
  "2026-04-08": ["9:00 AM", "11:00 AM", "2:00 PM"],
  "2026-04-10": ["10:00 AM", "1:00 PM", "3:30 PM"],
  "2026-04-12": ["8:30 AM", "12:00 PM", "4:00 PM"],
  "2026-04-15": ["9:30 AM", "1:30 PM", "5:00 PM"],
  "2026-04-18": ["10:30 AM", "2:30 PM", "4:30 PM"]
};

let selectedDate = "";
let selectedTime = "";
let selectedDoctor = "";

function clearStoredAppointment() {
  localStorage.removeItem("appointmentDate");
  localStorage.removeItem("appointmentTime");
  localStorage.removeItem("appointmentDoctor");
}

function scrollSectionIntoCenter(section) {
  if (!section) {
    return;
  }

  const sectionRect = section.getBoundingClientRect();
  const targetTop =
    window.scrollY + sectionRect.top - (window.innerHeight - sectionRect.height) / 2;

  window.scrollTo({
    top: Math.max(0, targetTop),
    behavior: "smooth"
  });
}

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
  const ariaLabelElements = document.querySelectorAll("[data-i18n-aria-label]");

  document.documentElement.lang = language;

  translatableElements.forEach((element) => {
    const translationKey = element.dataset.i18n;
    const translatedText = currentTranslations[translationKey];

    if (translatedText) {
      element.textContent = translatedText;
    }
  });

  ariaLabelElements.forEach((element) => {
    const translationKey = element.dataset.i18nAriaLabel;
    const translatedText = currentTranslations[translationKey];

    if (translatedText) {
      element.setAttribute("aria-label", translatedText);
    }
  });
}

function getSpecialtyName(language) {
  const currentTranslations = getCurrentTranslations(language);
  const translationKey = specialtyTranslationKeys[specialty];

  if (!translationKey) {
    return "";
  }

  return currentTranslations[translationKey] || "";
}

function getInsuranceName() {
  return insuranceLabels[insurance] || "";
}

function formatAppointmentDate(dateKey, language) {
  const [year, month, day] = dateKey.split("-").map(Number);
  const appointmentDate = new Date(year, month - 1, day);
  const localeMap = {
    en: "en-US",
    es: "es-ES",
    zh: "zh-CN"
  };
  const locale = localeMap[language] || localeMap.en;

  return new Intl.DateTimeFormat(locale, {
    weekday: "short",
    month: "long",
    day: "numeric"
  }).format(appointmentDate);
}

function renderResultSummary() {
  const currentTranslations = getCurrentTranslations(currentLanguage);
  const specialtyName = getSpecialtyName(currentLanguage);
  const insuranceName = getInsuranceName();

  resultInfo.textContent =
    `${currentTranslations.statusLabel}: ${currentTranslations.approvedStatus} | ` +
    `${currentTranslations.summarySpecialtyLabel}: ${specialtyName} | ` +
    `${currentTranslations.summaryInsuranceLabel}: ${insuranceName}`;
}

function renderProviders() {
  const selectedProviders = providerData[specialty]?.[insurance] || [];

  providerList.innerHTML = "";

  selectedProviders.forEach((provider) => {
    const providerCard = document.createElement("button");
    providerCard.classList.add("provider-card");
    providerCard.type = "button";
    providerCard.innerHTML = `
      <strong>${provider.name}</strong>
      <span>${provider.location}</span>
    `;

    if (selectedDoctor === `${provider.name} - ${provider.location}`) {
      providerCard.classList.add("selected-option");
    }

    providerCard.addEventListener("click", function () {
      selectedDoctor = `${provider.name} - ${provider.location}`;
      selectedDate = "";
      selectedTime = "";
      clearStoredAppointment();

      document.querySelectorAll(".provider-card").forEach((card) => {
        card.classList.remove("selected-option");
      });

      providerCard.classList.add("selected-option");
      calendarGrid.classList.remove("disabled-section");
      bookAppointmentBtn.classList.add("hidden");
      renderCalendar();
      renderTimeSlots();
      updateModalDetails();
      scrollSectionIntoCenter(calendarSection);
    });

    providerList.appendChild(providerCard);
  });
}

function renderCalendar() {
  calendarGrid.innerHTML = "";

  if (!selectedDoctor) {
    calendarGrid.classList.add("disabled-section");
  } else {
    calendarGrid.classList.remove("disabled-section");
  }

  availableAppointments.forEach((dateKey) => {
    const dateBtn = document.createElement("button");
    dateBtn.type = "button";
    dateBtn.textContent = formatAppointmentDate(dateKey, currentLanguage);
    dateBtn.classList.add("calendar-date");

    if (selectedDate === dateKey) {
      dateBtn.classList.add("selected-option");
    }

    dateBtn.addEventListener("click", function () {
      if (!selectedDoctor) {
        const currentTranslations = getCurrentTranslations(currentLanguage);
        alert(currentTranslations.chooseDoctorFirstAlert);
        return;
      }

      selectedDate = dateKey;
      selectedTime = "";
      localStorage.removeItem("appointmentDate");
      localStorage.removeItem("appointmentTime");
      localStorage.removeItem("appointmentDoctor");

      renderCalendar();
      renderTimeSlots();
      updateModalDetails();
      bookAppointmentBtn.classList.add("hidden");
      scrollSectionIntoCenter(timesSection);
    });

    calendarGrid.appendChild(dateBtn);
  });
}

function renderTimeSlots() {
  timeSlots.innerHTML = "";

  if (!selectedDate) {
    return;
  }

  const availableTimes = timeData[selectedDate] || [];

  availableTimes.forEach((time) => {
    const timeBtn = document.createElement("button");
    timeBtn.type = "button";
    timeBtn.textContent = time;
    timeBtn.classList.add("time-slot");

    if (selectedTime === time) {
      timeBtn.classList.add("selected-option");
    }

    timeBtn.addEventListener("click", function () {
      selectedTime = time;

      localStorage.setItem("appointmentDate", selectedDate);
      localStorage.setItem("appointmentTime", selectedTime);
      localStorage.setItem("appointmentDoctor", selectedDoctor);

      renderTimeSlots();
      updateModalDetails();
      bookAppointmentBtn.classList.remove("hidden");
      scrollSectionIntoCenter(bookingSection);
    });

    timeSlots.appendChild(timeBtn);
  });
}

function updateModalDetails() {
  modalSpecialty.textContent = getSpecialtyName(currentLanguage);
  modalDoctor.textContent = localStorage.getItem("appointmentDoctor") || selectedDoctor;

  if (selectedDate) {
    modalDate.textContent = formatAppointmentDate(selectedDate, currentLanguage);
  } else {
    modalDate.textContent = "";
  }

  modalTime.textContent = localStorage.getItem("appointmentTime") || selectedTime;
}

function setLanguage(language) {
  const nextLanguage = translations[language] ? language : DEFAULT_LANGUAGE;

  currentLanguage = nextLanguage;
  localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLanguage);
  languageSelect.value = nextLanguage;

  applyTranslations(nextLanguage);
  renderResultSummary();
  renderCalendar();
  renderTimeSlots();
  updateModalDetails();
}

renderProviders();
currentLanguage = getSavedLanguage();
setLanguage(currentLanguage);

languageSelect.addEventListener("change", function () {
  setLanguage(languageSelect.value);
});

bookAppointmentBtn.addEventListener("click", function () {
  updateModalDetails();
  bookingModal.classList.remove("hidden");
});

closeModalBtn.addEventListener("click", function () {
  bookingModal.classList.add("hidden");
});

bookingModal.addEventListener("click", function (event) {
  if (event.target === bookingModal) {
    bookingModal.classList.add("hidden");
  }
});
