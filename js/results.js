const specialty = localStorage.getItem("specialty");
const insurance = localStorage.getItem("insurance");

const resultInfo = document.getElementById("resultInfo");
const providerList = document.getElementById("providerList");
const calendarGrid = document.getElementById("calendarGrid");
const timeSlots = document.getElementById("timeSlots");
const bookAppointmentBtn = document.getElementById("bookAppointmentBtn");

const bookingModal = document.getElementById("bookingModal");
const closeModalBtn = document.getElementById("closeModalBtn");

const modalSpecialty = document.getElementById("modalSpecialty");
const modalDoctor = document.getElementById("modalDoctor");
const modalDate = document.getElementById("modalDate");
const modalTime = document.getElementById("modalTime");

bookingModal.classList.add("hidden");
bookAppointmentBtn.classList.add("hidden");

const specialtyLabels = {
  cardiology: "Cardiology",
  dermatology: "Dermatology",
  gynecology: "Gynecology",
  "infectious-disease": "Infectious Disease",
  endocrinology: "Endocrinology"
};

const insuranceLabels = {
  metroplus: "MetroPlus",
  aetna: "Aetna",
  medicaid: "Medicaid"
};

resultInfo.textContent = `Status: Approved | Specialty: ${specialtyLabels[specialty]} | Insurance: ${insuranceLabels[insurance]}`;

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
  { weekday: "Wed", month: "April", day: 8 },
  { weekday: "Fri", month: "April", day: 10 },
  { weekday: "Sun", month: "April", day: 12 },
  { weekday: "Wed", month: "April", day: 15 },
  { weekday: "Sat", month: "April", day: 18 }
];

const timeData = {
  "Wed, April 8th": ["9:00 AM", "11:00 AM", "2:00 PM"],
  "Fri, April 10th": ["10:00 AM", "1:00 PM", "3:30 PM"],
  "Sun, April 12th": ["8:30 AM", "12:00 PM", "4:00 PM"],
  "Wed, April 15th": ["9:30 AM", "1:30 PM", "5:00 PM"],
  "Sat, April 18th": ["10:30 AM", "2:30 PM", "4:30 PM"]
};

let selectedDate = "";
let selectedTime = "";
let selectedDoctor = "";

function getOrdinal(day) {
  if (day > 3 && day < 21) return `${day}th`;

  switch (day % 10) {
    case 1:
      return `${day}st`;
    case 2:
      return `${day}nd`;
    case 3:
      return `${day}rd`;
    default:
      return `${day}th`;
  }
}

function formatAppointmentDate(appointment) {
  return `${appointment.weekday}, ${appointment.month} ${getOrdinal(appointment.day)}`;
}

const selectedProviders = providerData[specialty][insurance];

selectedProviders.forEach((provider) => {
  const providerCard = document.createElement("button");
  providerCard.classList.add("provider-card");

  providerCard.innerHTML = `
    <strong>${provider.name}</strong>
    <span>${provider.location}</span>
  `;

  providerCard.addEventListener("click", function () {
    selectedDoctor = `${provider.name} - ${provider.location}`;

    document.querySelectorAll(".provider-card").forEach((card) => {
      card.classList.remove("selected-option");
    });

    providerCard.classList.add("selected-option");

    calendarGrid.classList.remove("disabled-section");
  });

  providerList.appendChild(providerCard);
});

calendarGrid.classList.add("disabled-section");


availableAppointments.forEach((appointment) => {
  const formattedDate = formatAppointmentDate(appointment);

  const dateBtn = document.createElement("button");
  dateBtn.textContent = formattedDate;
  dateBtn.classList.add("calendar-date");

  dateBtn.addEventListener("click", function () {
    if (!selectedDoctor) {
      alert("Please choose a doctor first.");
      return;
    }

    selectedDate = formattedDate;
    selectedTime = "";

    document.querySelectorAll(".calendar-date").forEach((btn) => {
      btn.classList.remove("selected-option");
    });

    dateBtn.classList.add("selected-option");

    timeSlots.innerHTML = "";
    bookAppointmentBtn.classList.add("hidden");

    timeData[formattedDate].forEach((time) => {
      const timeBtn = document.createElement("button");
      timeBtn.textContent = time;
      timeBtn.classList.add("time-slot");

      timeBtn.addEventListener("click", function () {
        selectedTime = time;

        document.querySelectorAll(".time-slot").forEach((btn) => {
          btn.classList.remove("selected-option");
        });

        timeBtn.classList.add("selected-option");

        localStorage.setItem("appointmentDate", selectedDate);
        localStorage.setItem("appointmentTime", selectedTime);
        localStorage.setItem("appointmentDoctor", selectedDoctor);

        bookAppointmentBtn.classList.remove("hidden");
      });

      timeSlots.appendChild(timeBtn);
    });
  });

  calendarGrid.appendChild(dateBtn);
});

bookAppointmentBtn.addEventListener("click", function () {
  modalSpecialty.textContent = specialtyLabels[specialty];
  modalDoctor.textContent = localStorage.getItem("appointmentDoctor");
  modalDate.textContent = localStorage.getItem("appointmentDate");
  modalTime.textContent = localStorage.getItem("appointmentTime");

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