const chips = document.querySelectorAll(".chip");
const cards = document.querySelectorAll(".destination-card");
const tabs = document.querySelectorAll(".tab");
const itineraryList = document.getElementById("itineraryList");

const itineraryData = {
  1: [
    "Llegada a Bali y check-in en Ubud",
    "Visita a terrazas de arroz y templo Tirta Empul",
    "Cena local con show cultural"
  ],
  2: [
    "Tour de cascadas y senderismo suave",
    "Almuerzo en restaurante sostenible",
    "Tarde de relajación en spa balinés"
  ],
  3: [
    "Excursión a playas del sur",
    "Clase de surf para principiantes",
    "Reserva de traslado y cierre del itinerario"
  ]
};

function renderItinerary(day) {
  itineraryList.innerHTML = "";
  itineraryData[day].forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    itineraryList.appendChild(li);
  });
}

chips.forEach((chip) => {
  chip.addEventListener("click", () => {
    chips.forEach((c) => c.classList.remove("active"));
    chip.classList.add("active");

    const filter = chip.dataset.filter;
    cards.forEach((card) => {
      const category = card.dataset.category;
      const show = filter === "todos" || category.includes(filter);
      card.style.display = show ? "block" : "none";
    });
  });
});

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");
    renderItinerary(tab.dataset.day);
  });
});

renderItinerary("1");
