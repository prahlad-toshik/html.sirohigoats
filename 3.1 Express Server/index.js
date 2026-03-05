"use strict";

// ====== SETTINGS ======
const FARM_PHONE = "8619535133"; // WhatsApp number (India)
const DEFAULT_WA_TEXT = "नमस्ते! मुझे शुद्ध सिरोही बकरियों की जानकारी/रेट चाहिए।";

function waLink(text) {
  const msg = encodeURIComponent(text);
  return `https://wa.me/91${FARM_PHONE}?text=${msg}`;
}

function $(id) {
  return document.getElementById(id);
}

document.addEventListener("DOMContentLoaded", () => {
  // Set WhatsApp links (top + float)
  const waTop = $("whatsappTop");
  const waFloat = $("waFloat");
  if (waTop) waTop.href = waLink(DEFAULT_WA_TEXT);
  if (waFloat) waFloat.href = waLink(DEFAULT_WA_TEXT);

  // Booking form submit
  const bookingForm = $("bookingForm");
  if (!bookingForm) {
    alert.error("bookingForm id नहीं मिला (index.html check करें)");
    return;
  }

  bookingForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = $("name")?.value.trim() || "";
    const phone = $("phone")?.value.trim() || "";
    const breed = $("breed")?.value || "";
    const gender = $("gender")?.value || "";
    const qty = $("qty")?.value || "";
    const date = $("date")?.value || "";
    const city = $("city")?.value.trim() || "";
    const message = $("message")?.value.trim() || "";

    if (!name || !phone) {
      alert("कृपया नाम और मोबाइल नंबर भरें।");
      return;
    }

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
    const url = waLink(waMsg);

    // Popup blocked? fallback to same tab
    const win = window.open(url, "_blank");
    if (!win) window.location.href = url;
  });
});