const specialty = localStorage.getItem("specialty");
const insurance = localStorage.getItem("insurance");

const resultInfo = document.getElementById("resultInfo");
const providerList = document.getElementById("providerList");
const dateList = document.getElementById("dateList");

resultInfo.textContent = `Specialty: ${specialty} | Insurance: ${insurance}`;

const providers = [
  "Provider A",
  "Provider B",
  "Provider C"
];

providers.forEach(p => {
  const li = document.createElement("li");
  li.textContent = p;
  providerList.appendChild(li);
});

const dates = [
  "March 10",
  "March 12",
  "March 15"
];

dates.forEach(d => {
  const li = document.createElement("li");
  li.textContent = d;
  dateList.appendChild(li);
});