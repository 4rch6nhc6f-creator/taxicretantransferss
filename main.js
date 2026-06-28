const mobileBtn = document.getElementById("mobileBtn");
const menu = document.getElementById("menu");

if (mobileBtn && menu) {
  mobileBtn.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("active");
    mobileBtn.setAttribute("aria-expanded", String(isOpen));
  });

  document.querySelectorAll(".menu a").forEach(link => {
    link.addEventListener("click", () => {
      menu.classList.remove("active");
      mobileBtn.setAttribute("aria-expanded", "false");
    });
  });
}

const year = document.getElementById("year");
if (year) {
  year.textContent = new Date().getFullYear();
}

const dateField = document.getElementById("date");
if (dateField) {
  const today = new Date();
  today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
  dateField.min = today.toISOString().split("T")[0];
}

const bookingForm = document.getElementById("bookingForm");

if (bookingForm) {
  bookingForm.addEventListener("submit", function (e) {
    e.preventDefault();

    if (!this.checkValidity()) {
      this.reportValidity();
      return;
    }

    const data = new FormData(this);

    const message = `
Hello Giannis, I would like to request a transfer with TaxiCretanTransfers.

Service: ${data.get("service")}
Name: ${data.get("name")}
Phone: ${data.get("phone")}
Email: ${data.get("email") || "Not provided"}

Pickup: ${data.get("pickup")}
Drop-off: ${data.get("dropoff")}
Date: ${data.get("date")}
Time: ${data.get("time")}
Passengers: ${data.get("passengers")}
Luggage: ${data.get("luggage")}

Extra notes:
${data.get("message") || "None"}
    `.trim();

    const whatsappNumber = "306989436137";
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    const opened = window.open(whatsappURL, "_blank", "noopener");

    if (!opened) {
      window.location.href = whatsappURL;
    }
  });
}