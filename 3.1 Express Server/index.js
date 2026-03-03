// ====== SETTINGS ======
const FARM_PHONE = "8619535133"; // WhatsApp number (India)
const DEFAULT_WA_TEXT = "नमस्ते! मुझे शुद्ध सिरोही बकरियों की जानकारी/रेट चाहिए।";

// WhatsApp link helper
function waLink(text) {
  const msg = encodeURIComponent(text);
  return `https://wa.me/91${FARM_PHONE}?text=${msg}`;
}

// Set WhatsApp links
const waTop = document.getElementById("whatsappTop");
const waFloat = document.getElementById("waFloat");
if (waTop) waTop.href = waLink(DEFAULT_WA_TEXT);
if (waFloat) waFloat.href = waLink(DEFAULT_WA_TEXT);

// ====== Booking form -> WhatsApp message ======
const bookingForm = document.getElementById("bookingForm");
if (bookingForm) {
  bookingForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const breed = document.getElementById("breed").value;
    const gender = document.getElementById("gender").value;
    const qty = document.getElementById("qty").value;
    const date = document.getElementById("date").value;
    const city = document.getElementById("city").value.trim();
    const message = document.getElementById("message").value.trim();

    const lines = [
      "📌 *Goat Booking Request*",
      `👤 नाम: ${name}`,
      `📞 मोबाइल: ${phone}`,
      `🐐 Breed: ${breed}`,
      `✅ प्रकार: ${gender}`,
      `🔢 Quantity: ${qty}`,
      date ? `📅 चाहिए तारीख: ${date}` : "",
      city ? `📍 शहर/जिला: ${city}` : "",
      message ? `📝 मैसेज: ${message}` : "",
      "",
      "कृपया उपलब्धता, कीमत और डिलीवरी जानकारी बताएं।",
    ].filter(Boolean);

    const waMsg = lines.join("\n");
    window.open(waLink(waMsg), "_blank");
  });
}

// ====== Gallery lightbox ======
const lightbox = document.getElementById("lightbox");
const lbImg = document.getElementById("lbImg");
const lbClose = document.getElementById("lbClose");

document.querySelectorAll(".g-item").forEach((item) => {
  item.addEventListener("click", () => {
    const full = item.getAttribute("data-full");
    if (lbImg) lbImg.src = full;
    if (lightbox) lightbox.classList.add("open");
  });
});

function closeLightbox() {
  if (lightbox) lightbox.classList.remove("open");
  if (lbImg) lbImg.src = "";
}

if (lbClose) lbClose.addEventListener("click", closeLightbox);

if (lightbox) {
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLightbox();
});