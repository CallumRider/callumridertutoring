const CONTACT_EMAIL = "callumrider@icloud.com";
const CONTACT_PHONE = "07398156901";

const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.textContent = open ? "Close" : "Menu";
  });

  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.textContent = "Menu";
    });
  });
}

const form = document.getElementById("enquiryForm");
const status = document.getElementById("formStatus");
const enquiryButton = document.getElementById("enquiryButton");
const formNote = document.getElementById("formNote");
const deviceNote = document.getElementById("deviceNote");

// Treat actual phones as SMS devices. Desktop/laptop browsers use email.
const isPhone = /Android.+Mobile|iPhone|iPod|Windows Phone/i.test(navigator.userAgent);

if (isPhone) {
  if (enquiryButton) enquiryButton.textContent = "Send SMS enquiry";
  if (deviceNote) deviceNote.textContent = "On your phone, this enquiry will open your Messages app.";
  if (formNote) formNote.textContent = "Nothing is stored on this website. Your phone's Messages app will open with the enquiry ready to send.";
} else {
  if (enquiryButton) enquiryButton.textContent = "Send email enquiry";
  if (deviceNote) deviceNote.textContent = "On a PC or laptop, this enquiry will open your email app.";
  if (formNote) formNote.textContent = "Nothing is stored on this website. Your email app will open with the enquiry ready to send.";
}

if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = new FormData(form);
    const subject = `Tutoring enquiry – ${data.get("subject")} – age ${data.get("age")}`;
    const body = [
      `Parent / guardian: ${data.get("parent")}`,
      `Student age: ${data.get("age")}`,
      `Subject: ${data.get("subject")}`,
      `What they need help with: ${data.get("message")}`,
      `Preferred days / times: ${data.get("availability")}`,
      `Contact details: ${data.get("contact")}`
    ].join("\n");

    if (isPhone) {
      window.location.href = `sms:${CONTACT_PHONE}?body=${encodeURIComponent(body)}`;
      if (status) status.textContent = "Opening your Messages app…";
    } else {
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      if (status) status.textContent = "Opening your email app…";
    }
  });
}

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();
