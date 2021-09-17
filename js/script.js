let isYearly = false;
const slider = document.querySelector(".card__slider");
const switchLabel = document.querySelector(".card__switch + label");
const priceContainer = document.querySelector(".card__component--price");

// Formats price
const formattedPrice = (value) =>
  new Intl.NumberFormat(navigator.language, {
    style: "currency",
    currency: "USD",
  }).format(Number(isYearly ? Number(value * 12 * 0.75) : value));

// Sets initial state to slider and defaul value
updateSlider(16);

// Updates price and billing
switchLabel.addEventListener("transitionend", (e) => {
  if (e.propertyName === "left") updateToggle();
});

// Update slider
function updateSlider(value) {
  const priceLabel = document.querySelector(".card__price");
  const viewsLabel = document.querySelector(".card__views");
  // Display price
  (function displayPrice() {
    const priceValue = slider.value;

    const price = document.createElement("span");
    price.id = "rangeValue";
    price.className = "card__price card__price--bounceIn";

    price.textContent = formattedPrice(priceValue);

    priceContainer.appendChild(price);
    priceContainer.replaceChild(price, priceLabel);
  })();

  // Slider track background
  (function setGradient() {
    const sliderBackground = `linear-gradient(to right, var(--soft-cyan) 0%, var(--soft-cyan) ${Math.trunc(
      Number(value) * 3.125
    )}%, var(--light-grayish-blue-1) ${Math.trunc(
      Number(value) * 3.125
    )}%, var(--light-grayish-blue-1) 100%)`;
    slider.style.backgroundImage = sliderBackground;
  })();

  (function updateViews() {
    viewsLabel.textContent = `${Math.trunc(Number(value) * 3.125)}k pageviews`;
  })();
}

// Update toggle
function updateToggle() {
  // Display type of billing (yearly / monthly)
  (function displayBilling() {
    // Switches between type of billing
    isYearly = isYearly ? false : true;

    const billingLabel = document.querySelector(".card__billing");
    const toggle = document.querySelector(".card__switch");
    const billing = document.createElement("span");

    billing.className = "card__billing";
    billing.textContent = `${!toggle.checked ? "/ month" : "/ year"}`;

    priceContainer.appendChild(billing);
    priceContainer.replaceChild(billing, billingLabel);
  })();

  // Display price (the code written this way to fire animation)
  (function displayPrice() {
    const priceLabel = document.querySelector(".card__price");
    const priceValue = slider.value;

    const price = document.createElement("span");
    price.id = "rangeValue";
    price.className = "card__price card__price--flipInX";
    price.textContent = formattedPrice(priceValue);

    priceContainer.appendChild(price);
    priceContainer.replaceChild(price, priceLabel);
  })();
}
