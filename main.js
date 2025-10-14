// checkout.js

// Wait until the page content is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Read the query parameters from the URL
  const urlParams = new URLSearchParams(window.location.search);
  const plan = urlParams.get("plan");
  const price = urlParams.get("price");

  // Display the selected plan and price
  const planNameEl = document.getElementById("plan-name");
  const planPriceEl = document.getElementById("plan-price");

  if (plan && price) {
    planNameEl.textContent = plan + " Membership";
    planPriceEl.textContent = price;
  } else {
    // Default if accessed directly
    planNameEl.textContent = "Basic Membership";
    planPriceEl.textContent = "19";
  }
});
