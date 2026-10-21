const form = document.getElementById("form");
const input = document.getElementById("value");
const unitSelect = document.getElementById("unit");
const errorBox = document.getElementById("error");
const results = document.getElementById("results");

const ABSOLUTE_ZERO_C = -273.15;

function toCelsius(value, unit) {
  if (unit === "F") return (value - 32) * 5 / 9;
  if (unit === "K") return value - 273.15;
  return value;
}

function fromCelsius(c) {
  return {
    C: c,
    F: c * 9 / 5 + 32,
    K: c + 273.15
  };
}

function format(n) {
  return (Math.round(n * 100) / 100).toString();
}

function showError(message) {
  errorBox.textContent = message;
  errorBox.hidden = false;
  results.hidden = true;
  input.classList.add("invalid");
}

function clearError() {
  errorBox.hidden = true;
  input.classList.remove("invalid");
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  clearError();

  const raw = input.value.trim();

  if (raw === "") {
    showError("Enter a temperature to convert.");
    return;
  }
  if (!/^[-+]?(\d+\.?\d*|\.\d+)$/.test(raw)) {
    showError("Enter numbers only, for example 36.6 or -10.");
    return;
  }

  const value = parseFloat(raw);
  const unit = unitSelect.value;
  const celsius = toCelsius(value, unit);

  if (Math.round(celsius * 1e6) / 1e6 < ABSOLUTE_ZERO_C) {
    showError("That is below absolute zero (-273.15 °C, -459.67 °F, 0 K). Enter a higher temperature.");
    return;
  }

  const out = fromCelsius(celsius);
  document.getElementById("out-C").textContent = format(out.C) + " °C";
  document.getElementById("out-F").textContent = format(out.F) + " °F";
  document.getElementById("out-K").textContent = format(out.K) + " K";
  results.hidden = false;
});
