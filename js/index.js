// Get the menu button element by its ID
const menuBtn = document.getElementById("menu-btn");

// Get the navigation links element by its ID
const navLinks = document.getElementById("nav-links");

// Get the icon element inside the menu button
const menuBtnIcon = menuBtn.querySelector("i");

// Add a click event listener to the menu button
menuBtn.addEventListener("click", (e) => {
  // Toggle the 'open' class on the navigation links element
  navLinks.classList.toggle("open");

  // Check if the navigation links are currently open
  const isOpen = navLinks.classList.contains("open");
  
  // Change the menu button icon based on the open state
  menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
});

// Add a click event listener to the navigation links
navLinks.addEventListener("click", (e) => {
  // Remove the 'open' class from the navigation links
  navLinks.classList.remove("open");
  
  // Reset the menu button icon to the menu icon
  menuBtnIcon.setAttribute("class", "ri-menu-line");
});

// Define options for the ScrollReveal animation
const scrollRevealOption = {
  distance: "50px", // Distance the element will move
  origin: "bottom", // Direction from which the element will appear
  duration: 1000    // Duration of the animation in milliseconds
};

// Reveal the header image with a specific animation
ScrollReveal().reveal(".header-image img", {
  ...scrollRevealOption, // Spread the default options
  origin: "right",       // Change the origin to 'right' for this element
});

// Reveal the main header title with a delay
ScrollReveal().reveal(".header-content h1", {
  ...scrollRevealOption, // Spread the default options
  delay: 500,            // Delay the animation by 500 milliseconds
});

// Reveal the paragraph content with a delay
ScrollReveal().reveal(".header-content p", {
  ...scrollRevealOption, // Spread the default options
  delay: 1000,           // Delay the animation by 1000 milliseconds
});

// Reveal the form content with a delay
ScrollReveal().reveal(".header-content form", {
  ...scrollRevealOption, // Spread the default options
  delay: 1500,           // Delay the animation by 1500 milliseconds
});

// Reveal the bar element with a delay
ScrollReveal().reveal(".header-content bar", {
  ...scrollRevealOption, // Spread the default options
  delay: 2000,           // Delay the animation by 2000 milliseconds
});

// Reveal the header image card with specific options
ScrollReveal().reveal(".header-image-card", {
  duration: 1000,       // Duration of the animation in milliseconds
  interval: 500,        // Interval between animations for multiple elements
  delay: 2500,          // Delay the animation by 2500 milliseconds
});