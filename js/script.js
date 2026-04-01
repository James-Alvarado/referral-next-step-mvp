const checkReferralBtn = document.getElementById("checkReferralBtn");
const specialtySelect = document.getElementById("specialty");

const resultSection = document.getElementById("resultSection");
const providersSection = document.getElementById("providersSection");
const reminderSection = document.getElementById("reminderSection");

const resultSpecialty = document.getElementById("resultSpecialty");
const nextStepMessage = document.getElementById("nextStepMessage");
const providerList = document.getElementById("providerList");

const providerData = {
    cardiology: [
      "Heart Care Associates - Bronx, NY",
      "Uptown Cardiology Group - Manhattan, NY",
      "Metro Health Cardiology - Queens, NY"
    ],
    dermatology: [
      "Skin Health Partners - Bronx, NY",
      "City Dermatology Clinic - Manhattan, NY",
      "Community Skin Center - Brooklyn, NY"
    ],
    gynecology: [
      "Women's Care Center - Bronx, NY",
      "East Side OB-GYN - Manhattan, NY",
      "Family Women's Health - Queens, NY"
    ]
  };

  const nextStepData = {
    cardiology: "Your referral is approved. Your next step is to contact an in-network cardiology office and schedule your appointment.",
    dermatology: "Your referral is approved. Your next step is to choose an in-network dermatology provider and call to confirm availability.",
    gynecology: "Your referral is approved. Your next step is to select an in-network gynecology provider and book your visit."
  };
  
  checkReferralBtn.addEventListener("click", function () {
    const selectedSpecialty = specialtySelect.value;
  
    if (selectedSpecialty === "") {
      alert("Please choose a specialty first.");
      return;
    }
  
    resultSpecialty.textContent =
      selectedSpecialty.charAt(0).toUpperCase() + selectedSpecialty.slice(1);
  
    nextStepMessage.textContent = nextStepData[selectedSpecialty];
  
    providerList.innerHTML = "";
  
    providerData[selectedSpecialty].forEach(function (provider) {
      const listItem = document.createElement("li");
      listItem.textContent = provider;
      providerList.appendChild(listItem);
    });
  
    resultSection.classList.remove("hidden");
    providersSection.classList.remove("hidden");
    reminderSection.classList.remove("hidden");
  });