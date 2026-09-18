const CONTACT_EMAIL = "YOUR-TUTORING-EMAIL@example.com";

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

if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (CONTACT_EMAIL.includes("YOUR-TUTORING-EMAIL")) {
      status.textContent = "Please add your tutoring email address in script.js first.";
      return;
    }

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

    window.location.href =
      `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    status.textContent = "Opening your email app…";
  });
}

document.getElementById("year").textContent = new Date().getFullYear();
