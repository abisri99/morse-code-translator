/**
 * Displays a notification message with a specific CSS class for a limited time.
 * @param {string} message - The message to display.
 * @param {string} className - The CSS class to apply to the notification.
 */

const showNotification = (message, className) => {
  const notification = document.createElement("div");
  notification.className = className;
  notification.innerText = message;
  document.getElementById("notification").innerHTML = ""; // Clear previous notifications
  document.getElementById("notification").appendChild(notification);
  setTimeout(() => notification.remove(), 1500);
};

document.addEventListener("DOMContentLoaded", () => {
  // Patterns to validate Morse code and plain text
  const MORSE_PATTERN = /^[.\- \/]+$/;
  const TEXT_PATTERN = /^[a-zA-Z0-9 ]+$/;

  // Cache frequently accessed DOM elements
  const inputElement = document.getElementById("input-text");
  const soundButton = document.getElementById("sound");
  const outputElement = document.getElementById("morse-output-text");
  const logo = document.getElementById("logo");
  const resetButton = document.getElementById("clear");
  const charCount = document.getElementById("count");

  // Update Character Count
  const updateCharCount = () => {
    charCount.textContent = inputElement.value.length;
  };

  // Toggle Clear Button Visibility
  const toggleClearButton = () => {
    resetButton.style.display = inputElement.value ? "block" : "none";
  };

  /**
   * Translates input text to Morse code or vice versa based on the input pattern.
   */
  const translate = () => {
    const input = inputElement.value.trim();
    const inputLength = input.length;

    if (!input) {
      showNotification("❌ Enter something", "error");
      return;
    }

    if (inputLength > 512) {
      showNotification("❌ Charecter limit exceeded", "limit");
      return;
    }

    if (MORSE_PATTERN.test(input)) {
      outputElement.innerText = translateToText(input);
      soundButton.classList.add("hidden");
    } else if (TEXT_PATTERN.test(input)) {
      outputElement.innerText = translateToMorse(input);
      soundButton.classList.remove("hidden");
    } else {
      showNotification("❌ Invalid Input", "error");
    }
  };

  // Reset Button Click Event
  resetButton.addEventListener("click", () => {
    inputElement.value = "";
    outputElement.textContent = "";
    updateCharCount();
    toggleClearButton();
  });

  // Input Event
  inputElement.addEventListener("input", () => {
    updateCharCount();
    toggleClearButton();
  });

  /**
   * Handles the click event on the translate button.
   */
  const handleTranslateButtonClick = () => {
    translate();
  };

  /**
   * Handles the click event on the sound button to play or stop Morse code sound.
   */
  const handleSoundButtonClick = () => {
    if (isPlaying) {
      soundButton.innerHTML =
        '<i class="material-icons" style="font-size: 16px;">volume_up</i>';
      isPlaying = false;
      stopSound();
    } else {
      const morseText = outputElement.innerText;
      soundButton.innerHTML =
        '<i class="material-icons" style="font-size: 16px;">stop</i>';
      isPlaying = true;
      playMorse(morseText);
    }
  };

  // Add event listeners for button clicks and input key presses
  document.body.addEventListener("click", (event) => {
    const targetId = event.target.id;
    if (targetId === "morse-button") {
      handleTranslateButtonClick();
    } else if (targetId === "sound") {
      handleSoundButtonClick();
    } else if (event.target.closest(".copy-icon")) {
      handleCopyIconClick();
    }
  });

  inputElement.addEventListener("keypress", (event) => {
    if (event.key === "Enter") translate();
  });

  /**
   * Handles the click event on the Morse output area to copy text to clipboard.
   */
  // Handle Copy Icon Click
  const handleCopyIconClick = async () => {
    const textToCopy = outputElement.innerText;
    try {
      await navigator.clipboard.writeText(textToCopy);
      showNotification("✅ Text copied!", "copy");
    } catch (err) {
      showNotification("Failed to copy text", "error");
    }
  };

  // Initialize Character Count and Clear Button
  updateCharCount();
  toggleClearButton();

  // Theme Toggle Functionality
  const themeToggle = document.getElementById("theme-toggle");
  const currentTheme = localStorage.getItem("theme") || "light";
  document.body.classList.add(currentTheme);

  themeToggle.addEventListener("click", () => {
    const isDarkMode = document.body.classList.toggle("dark");
    document.body.classList.toggle("light", !isDarkMode);
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");

    // Change Logo Based on Theme
    logo.src = isDarkMode ? "assets/darkLogo.svg" : "assets/logo.svg";

    themeToggle.innerHTML = isDarkMode
      ? '<i class="material-icons" style="font-size: 16px;">light_mode</i>'
      : '<i class="material-icons" style="font-size: 16px;">dark_mode</i>';
  });

  // Set Initial Icon and Logo Based on Current Theme
  themeToggle.innerHTML =
    currentTheme === "dark"
      ? '<i class="material-icons" style="font-size: 16px;">light_mode</i>'
      : '<i class="material-icons" style="font-size: 16px;">dark_mode</i>';

  logo.src =
    currentTheme === "dark" ? "assets/darkLogo.svg" : "assets/logo.svg";
});
