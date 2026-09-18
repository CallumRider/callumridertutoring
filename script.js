// Callum Rider Tutoring
// Replace this address when you have your tutoring email set up.
const CONTACT_EMAIL = "YOUR-TUTORING-EMAIL@example.com";

const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

menuToggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.textContent = open ? "×" : "☰";
});

document.querySelectorAll("#nav a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  });
});

const form = document.getElementById("enquiryForm");
const status = document.getElementById("formStatus");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (CONTACT_EMAIL.includes("YOUR-TUTORING-EMAIL")) {
    status.textContent = "Before using the form, add your tutoring email in script.js.";
    return;
  }

  const data = new FormData(form);
  const subject = encodeURIComponent(`Tutoring enquiry for ${data.get("age")}-year-old — ${data.get("subject")}`);
  const body = encodeURIComponent(
`Parent / guardian: ${data.get("parent")}
Student age: ${data.get("age")}
Subject: ${data.get("subject")}

What they need help with:
${data.get("message")}

Preferred days / times:
${data.get("availability")}

Contact details:
${data.get("contact")}`
  );

  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  status.textContent = "Opening your email app with the enquiry ready to send.";
});
