// ============================================================
// CONFIG
// ============================================================
// Admin email that receives every form submission.
const ADMIN_EMAIL = "hedkeytaining@gmail.com";

// FormSubmit AJAX endpoint (sends the email from the frontend, no backend needed).
// NOTE: After activation you can replace the email below with the random
// alias FormSubmit gives you, so your address isn't visible in the source.
const ENDPOINT = `https://formsubmit.co/ajax/${ADMIN_EMAIL}`;

// ============================================================
// ELEMENTS
// ============================================================
const form = document.getElementById("contactForm");
const submitBtn = document.getElementById("submitBtn");
const btnText = submitBtn.querySelector(".btn-text");
const statusBox = document.getElementById("status");

const fields = {
  name: document.getElementById("name"),
  email: document.getElementById("email"),
  message: document.getElementById("message"),
};

// ============================================================
// VALIDATION
// ============================================================
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function setError(field, msg) {
  const wrap = field.closest(".field");
  wrap.classList.toggle("invalid", Boolean(msg));
  document.getElementById(field.id + "Error").textContent = msg || "";
}

function validate() {
  let ok = true;

  const name = fields.name.value.trim();
  const email = fields.email.value.trim();
  const message = fields.message.value.trim();

  if (name.length < 2) {
    setError(fields.name, "Please enter your name (at least 2 characters).");
    ok = false;
  } else setError(fields.name, "");

  if (!emailPattern.test(email)) {
    setError(fields.email, "Please enter a valid email address.");
    ok = false;
  } else setError(fields.email, "");

  if (message.length < 10) {
    setError(fields.message, "Message must be at least 10 characters.");
    ok = false;
  } else setError(fields.message, "");

  return ok;
}

// Clear an error as soon as the user starts fixing it
Object.values(fields).forEach((f) =>
  f.addEventListener("input", () => setError(f, ""))
);

// ============================================================
// UI HELPERS
// ============================================================
function showStatus(type, text) {
  statusBox.className = "status " + type;
  statusBox.textContent = text;
}

function setLoading(isLoading) {
  submitBtn.disabled = isLoading;
  submitBtn.classList.toggle("loading", isLoading);
  btnText.textContent = isLoading ? "Sending..." : "Send Message";
}

// ============================================================
// SUBMIT
// ============================================================
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  statusBox.className = "status";
  statusBox.textContent = "";

  // Bot trap: real users never fill this hidden field
  if (document.getElementById("honey").value) return;

  if (!validate()) return;

  const payload = {
    name: fields.name.value.trim(),
    email: fields.email.value.trim(),
    message: fields.message.value.trim(),
    _subject: `New contact message from ${fields.name.value.trim()}`,
    _replyto: fields.email.value.trim(),
    _template: "table",
    _captcha: "false",
  };

  setLoading(true);

  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json().catch(() => ({}));

    if (res.ok && (data.success === "true" || data.success === true)) {
      showStatus("success", "Thank you! Your message has been sent successfully.");
      form.reset();
    } else {
      throw new Error(data.message || "Request failed");
    }
  } catch (err) {
    console.error("Form error:", err);
    showStatus(
      "fail",
      "Sorry, something went wrong while sending your message. Please try again."
    );
  } finally {
    setLoading(false);
  }
});
