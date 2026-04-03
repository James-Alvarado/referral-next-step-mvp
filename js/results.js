const pageElements = {
  topBar: document.querySelector(".top-bar"),
  languageSelect: document.getElementById("languageSelect"),
  referralSummary: document.getElementById("resultInfo"),
  providerList: document.getElementById("providerList"),
  dateList: document.getElementById("calendarGrid"),
  timeList: document.getElementById("timeSlots"),
  bookAppointmentButton: document.getElementById("bookAppointmentBtn"),
  calendarSection: document.querySelector(".calendar-section"),
  timeSection: document.querySelector(".times-section"),
  bookingSection: document.querySelector(".booking-section"),
  bookingModal: document.getElementById("bookingModal"),
  closeModalButton: document.getElementById("closeModalBtn"),
  modalSpecialty: document.getElementById("modalSpecialty"),
  modalDoctor: document.getElementById("modalDoctor"),
  modalDate: document.getElementById("modalDate"),
  modalTime: document.getElementById("modalTime"),
};

const referralDetails = {
  specialty: localStorage.getItem("specialty"),
  insurance: localStorage.getItem("insurance"),
};

const selectedAppointment = {
  doctor: "",
  dateKey: "",
  time: "",
};

const specialtyLabelKeys = {
  cardiology: "cardiologyName",
  dermatology: "dermatologyName",
  gynecology: "gynecologyName",
  "infectious-disease": "infectiousDiseaseName",
  endocrinology: "endocrinologyName",
};

const specialtyAcronyms = {
  cardiology: "CARD",
  dermatology: "DERM",
  gynecology: "GYN",
  "infectious-disease": "ID",
  endocrinology: "ENDO",
};

const insuranceLabelKeys = {
  metroplus: "metroplusName",
  aetna: "aetnaName",
  medicaid: "medicaidName",
};

const providersByReferral = {
  cardiology: {
    metroplus: [
      { name: "Dr. Ana Rivera", location: "Harlem, Manhattan" },
      { name: "Dr. James Carter", location: "Bushwick, Brooklyn" },
      { name: "Dr. Sofia Morales", location: "Chelsea, Manhattan" },
    ],
    aetna: [
      { name: "Dr. Kevin Brooks", location: "Astoria, Queens" },
      { name: "Dr. Laura Chen", location: "Washington Heights, Manhattan" },
      { name: "Dr. Miguel Santos", location: "Downtown Brooklyn, Brooklyn" },
    ],
    medicaid: [
      { name: "Dr. Tiana Lewis", location: "South Bronx, Bronx" },
      { name: "Dr. Eric Hall", location: "Jamaica, Queens" },
      { name: "Dr. Daniela Ruiz", location: "Sunset Park, Brooklyn" },
    ],
  },
  dermatology: {
    metroplus: [
      { name: "Dr. Emily Torres", location: "Harlem, Manhattan" },
      { name: "Dr. Rachel Kim", location: "Bushwick, Brooklyn" },
      { name: "Dr. Daniel Flores", location: "Chelsea, Manhattan" },
    ],
    aetna: [
      { name: "Dr. Nina Patel", location: "Astoria, Queens" },
      { name: "Dr. Marcus Green", location: "Upper East Side, Manhattan" },
      { name: "Dr. Elena Cruz", location: "Williamsburg, Brooklyn" },
    ],
    medicaid: [
      { name: "Dr. Olivia Reed", location: "South Bronx, Bronx" },
      { name: "Dr. Jason Perez", location: "Corona, Queens" },
      { name: "Dr. Lucia Gomez", location: "Flatbush, Brooklyn" },
    ],
  },
  gynecology: {
    metroplus: [
      { name: "Dr. Isabel Vega", location: "Harlem, Manhattan" },
      { name: "Dr. Karen White", location: "Bushwick, Brooklyn" },
      { name: "Dr. Monica Reyes", location: "Chelsea, Manhattan" },
    ],
    aetna: [
      { name: "Dr. Priya Shah", location: "Astoria, Queens" },
      { name: "Dr. Amanda Scott", location: "Midtown, Manhattan" },
      { name: "Dr. Paula Jimenez", location: "Park Slope, Brooklyn" },
    ],
    medicaid: [
      { name: "Dr. Selena Ortiz", location: "South Bronx, Bronx" },
      { name: "Dr. Brittany Cole", location: "Jamaica, Queens" },
      { name: "Dr. Marisol Peña", location: "Bay Ridge, Brooklyn" },
    ],
  },
  "infectious-disease": {
    metroplus: [
      { name: "Dr. Victor Alvarez", location: "Harlem, Manhattan" },
      { name: "Dr. Hannah Lee", location: "Bushwick, Brooklyn" },
      { name: "Dr. Camila Soto", location: "Chelsea, Manhattan" },
    ],
    aetna: [
      { name: "Dr. Steven Park", location: "Astoria, Queens" },
      { name: "Dr. Melissa Grant", location: "Upper West Side, Manhattan" },
      { name: "Dr. José Ramirez", location: "Downtown Brooklyn, Brooklyn" },
    ],
    medicaid: [
      { name: "Dr. Natalie Young", location: "South Bronx, Bronx" },
      { name: "Dr. Kevin Martinez", location: "Elmhurst, Queens" },
      { name: "Dr. Rosa Delgado", location: "Crown Heights, Brooklyn" },
    ],
  },
  endocrinology: {
    metroplus: [
      { name: "Dr. Teresa Hill", location: "Harlem, Manhattan" },
      { name: "Dr. Bianca Lopez", location: "Bushwick, Brooklyn" },
      { name: "Dr. Adrian Romero", location: "Chelsea, Manhattan" },
    ],
    aetna: [
      { name: "Dr. Helen Wright", location: "Astoria, Queens" },
      { name: "Dr. Omar Hassan", location: "Midtown East, Manhattan" },
      { name: "Dr. Carolina Diaz", location: "Fort Greene, Brooklyn" },
    ],
    medicaid: [
      { name: "Dr. Jasmine Foster", location: "South Bronx, Bronx" },
      { name: "Dr. Leo Torres", location: "Jackson Heights, Queens" },
      { name: "Dr. Andrea Castillo", location: "East Flatbush, Brooklyn" },
    ],
  },
};

const appointmentDateKeys = [
  "2026-04-08",
  "2026-04-10",
  "2026-04-12",
  "2026-04-15",
  "2026-04-18",
];

const appointmentTimesByDate = {
  "2026-04-08": ["9:00 AM", "11:00 AM", "2:00 PM"],
  "2026-04-10": ["10:00 AM", "1:00 PM", "3:30 PM"],
  "2026-04-12": ["8:30 AM", "12:00 PM", "4:00 PM"],
  "2026-04-15": ["9:30 AM", "1:30 PM", "5:00 PM"],
  "2026-04-18": ["10:30 AM", "2:30 PM", "4:30 PM"],
};

let currentLanguage = appI18n.getLanguage();

function getPageText() {
  return appI18n.getTranslations(currentLanguage);
}

function getSelectedSpecialtyLabel() {
  const labelKey = specialtyLabelKeys[referralDetails.specialty];

  if (!labelKey) {
    return "";
  }

  return getPageText()[labelKey] || "";
}

function getSelectedInsuranceLabel() {
  const labelKey = insuranceLabelKeys[referralDetails.insurance];

  if (!labelKey) {
    return "";
  }

  return getPageText()[labelKey] || "";
}

function getSelectedSpecialtyAcronym() {
  return specialtyAcronyms[referralDetails.specialty] || "";
}

function getSelectedProviders() {
  return (
    providersByReferral[referralDetails.specialty]?.[referralDetails.insurance] || []
  );
}

function formatAppointmentDate(dateKey) {
  const [year, month, day] = dateKey.split("-").map(Number);
  const date = new Date(year, month - 1, day);

  return new Intl.DateTimeFormat(appI18n.getLocale(currentLanguage), {
    weekday: "short",
    month: "long",
    day: "numeric",
  }).format(date);
}

function getDoctorLabel(provider) {
  return `${provider.name} - ${provider.location}`;
}

function showBookButtonIfReady() {
  const isTimeSelected = Boolean(selectedAppointment.time);
  pageElements.bookAppointmentButton.classList.toggle("hidden", !isTimeSelected);
}

function updateModalContent() {
  pageElements.modalSpecialty.textContent = getSelectedSpecialtyLabel();
  pageElements.modalDoctor.textContent = selectedAppointment.doctor;
  pageElements.modalDate.textContent = selectedAppointment.dateKey
    ? formatAppointmentDate(selectedAppointment.dateKey)
    : "";
  pageElements.modalTime.textContent = selectedAppointment.time;
}

function updateReferralSummary() {
  const pageText = getPageText();

  pageElements.referralSummary.textContent =
    `${pageText.statusLabel}: ${pageText.approvedStatus} | ` +
    `${pageText.summarySpecialtyLabel}: ${getSelectedSpecialtyLabel()} | ` +
    `${pageText.summaryInsuranceLabel}: ${getSelectedInsuranceLabel()}`;
}

function scrollToCenteredSection(sectionElement) {
  if (!sectionElement) {
    return;
  }

  const sectionRect = sectionElement.getBoundingClientRect();
  const centeredTop =
    window.scrollY + sectionRect.top - (window.innerHeight - sectionRect.height) / 2;

  window.scrollTo({
    top: Math.max(0, centeredTop),
    behavior: "smooth",
  });
}

function resetDateAndTimeSelection() {
  selectedAppointment.dateKey = "";
  selectedAppointment.time = "";
}

function renderProviderOptions() {
  const providers = getSelectedProviders();
  const specialtyAcronym = getSelectedSpecialtyAcronym();

  pageElements.providerList.innerHTML = "";

  providers.forEach((provider) => {
    const doctorLabel = getDoctorLabel(provider);
    const providerButton = document.createElement("button");

    providerButton.type = "button";
    providerButton.className = "provider-card";
    providerButton.innerHTML = `
      <strong>${specialtyAcronym} | ${provider.name}</strong>
      <span>${provider.location}</span>
    `;

    if (selectedAppointment.doctor === doctorLabel) {
      providerButton.classList.add("selected-option");
    }

    providerButton.addEventListener("click", function () {
      selectedAppointment.doctor = doctorLabel;
      resetDateAndTimeSelection();

      renderProviderOptions();
      renderDateOptions();
      renderTimeOptions();
      updateModalContent();
      showBookButtonIfReady();
      scrollToCenteredSection(pageElements.calendarSection);
    });

    pageElements.providerList.appendChild(providerButton);
  });
}

function renderDateOptions() {
  pageElements.dateList.innerHTML = "";
  pageElements.dateList.classList.toggle(
    "disabled-section",
    !selectedAppointment.doctor
  );

  appointmentDateKeys.forEach((dateKey) => {
    const dateButton = document.createElement("button");

    dateButton.type = "button";
    dateButton.className = "calendar-date";
    dateButton.textContent = formatAppointmentDate(dateKey);

    if (selectedAppointment.dateKey === dateKey) {
      dateButton.classList.add("selected-option");
    }

    dateButton.addEventListener("click", function () {
      if (!selectedAppointment.doctor) {
        alert(getPageText().chooseDoctorFirstAlert);
        return;
      }

      selectedAppointment.dateKey = dateKey;
      selectedAppointment.time = "";

      renderDateOptions();
      renderTimeOptions();
      updateModalContent();
      showBookButtonIfReady();
      scrollToCenteredSection(pageElements.timeSection);
    });

    pageElements.dateList.appendChild(dateButton);
  });
}

function renderTimeOptions() {
  pageElements.timeList.innerHTML = "";

  if (!selectedAppointment.dateKey) {
    return;
  }

  const availableTimes = appointmentTimesByDate[selectedAppointment.dateKey] || [];

  availableTimes.forEach((time) => {
    const timeButton = document.createElement("button");

    timeButton.type = "button";
    timeButton.className = "time-slot";
    timeButton.textContent = time;

    if (selectedAppointment.time === time) {
      timeButton.classList.add("selected-option");
    }

    timeButton.addEventListener("click", function () {
      selectedAppointment.time = time;

      renderTimeOptions();
      updateModalContent();
      showBookButtonIfReady();
      scrollToCenteredSection(pageElements.bookingSection);
    });

    pageElements.timeList.appendChild(timeButton);
  });
}

function applyLanguageToPage(language) {
  currentLanguage = appI18n.saveLanguage(language);

  appI18n.syncLanguageSelect(pageElements.languageSelect, currentLanguage);
  appI18n.applyTranslations(currentLanguage);

  updateReferralSummary();
  renderDateOptions();
  renderTimeOptions();
  updateModalContent();
}

function handleLanguageChange() {
  applyLanguageToPage(pageElements.languageSelect.value);
}

function openBookingModal() {
  updateModalContent();
  pageElements.bookingModal.classList.remove("hidden");
}

function closeBookingModal() {
  pageElements.bookingModal.classList.add("hidden");
}

function closeModalWhenOverlayIsClicked(event) {
  if (event.target === pageElements.bookingModal) {
    closeBookingModal();
  }
}

function updateTopBarOnScroll() {
  const hasScrolled = window.scrollY > 12;
  const maxScrollForFade = 260;
  const scrollRatio = Math.min(window.scrollY / maxScrollForFade, 1);
  const topBarOpacity = 0.94 - scrollRatio * 0.22;

  pageElements.topBar.classList.toggle("scrolled", hasScrolled);
  pageElements.topBar.style.setProperty("--top-bar-opacity", topBarOpacity.toFixed(2));
}

function initializeResultsPage() {
  if (!referralDetails.specialty || !referralDetails.insurance) {
    window.location.href = "index.html";
    return;
  }

  pageElements.bookingModal.classList.add("hidden");

  renderProviderOptions();
  applyLanguageToPage(currentLanguage);
  showBookButtonIfReady();
  updateTopBarOnScroll();

  pageElements.languageSelect.addEventListener("change", handleLanguageChange);
  pageElements.bookAppointmentButton.addEventListener("click", openBookingModal);
  pageElements.closeModalButton.addEventListener("click", closeBookingModal);
  pageElements.bookingModal.addEventListener(
    "click",
    closeModalWhenOverlayIsClicked
  );
  window.addEventListener("scroll", updateTopBarOnScroll, { passive: true });
}

initializeResultsPage();
