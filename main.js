// Execute code after DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  const myBar = document.getElementById("myBar");
  const balloon = document.getElementById("balloon");
  const coupon = document.getElementById("coupon");
  const closeButton = document.getElementById("closeCoupon");
  const codeElement = document.getElementById("code");

  initScrollProgress(myBar);
  if (isFirstVisit()) {
    showInitialAnimation(balloon);
  }
  setupBalloonClick(balloon, coupon);
  setupCouponClose(coupon, closeButton);
  setupCouponCopy(codeElement);
});

// Initialize scroll progress bar
function initScrollProgress(progressBar) {
  updateScrollProgress(progressBar);
  window.addEventListener("scroll", () => updateScrollProgress(progressBar));
}

// Update scroll progress based on window scroll position
function updateScrollProgress(progressBar) {
  const winScroll =
    document.body.scrollTop || document.documentElement.scrollTop;
  const height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  progressBar.style.width = `${scrolled}%`;
}

// Check if this is the user's first visit using cookies
function isFirstVisit() {
  const firstVisit = document.cookie
    .split(";")
    .some((item) => item.trim().startsWith("firstVisit="));
  if (!firstVisit) {
    setCookie("firstVisit", "true", 30);
    return true;
  }
  return false;
}

// Function to set a cookie
function setCookie(name, value, days) {
  const expiryDate = new Date();
  expiryDate.setTime(expiryDate.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "expires=" + expiryDate.toUTCString();
  document.cookie = `${name}=${value}; ${expires}; path=/`;
}

// Show the initial balloon animation
function showInitialAnimation(balloon) {
  balloon.classList.add("balloon-fly");
}

// Set up balloon click event to hide balloon and show coupon
function setupBalloonClick(balloon, coupon) {
  balloon.addEventListener("click", () => {
    balloon.style.display = "none";
    showCoupon(coupon);
  });
}

// Show coupon with random discount and code
function showCoupon(coupon) {
  const discountElement = document.getElementById("discount");
  const codeElement = document.getElementById("code");

  const discount = Math.floor(Math.random() * 21) + 5;
  const code = Math.random().toString(36).substring(2, 10).toUpperCase();

  discountElement.textContent = discount;
  codeElement.textContent = code;

  coupon.style.display = "block";

  // Add animation after coupon is displayed
  requestAnimationFrame(() => {
    coupon.classList.add("coupon-fall");
  });
}

// Set up event for closing the coupon
function setupCouponClose(coupon, closeButton) {
  closeButton.addEventListener("click", () => {
    coupon.style.display = "none";
  });
}

// Set up coupon code copy functionality
function setupCouponCopy(codeElement) {
  codeElement.addEventListener("click", () => {
    const textToCopy = codeElement.textContent;
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        // Visual feedback on successful copy
        codeElement.classList.add("copied");
        setTimeout(() => {
          codeElement.classList.remove("copied");
        }, 200);
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  });
}
