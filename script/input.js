/**
 * Displays a notification message with a specific CSS class for a limited time.
 * @param {string} message - The message to display.
 * @param {string} className - The CSS class to apply to the notification.
 */

const showNotification = (message, className) => {
  const notification = document.createElement('div');
  notification.className = className;
  notification.innerText = message;
  document.getElementById('morse-output').appendChild(notification);
  setTimeout(() => notification.remove(), 1500);
};

document.addEventListener('DOMContentLoaded', () => {
  // Patterns to validate Morse code and plain text
  const MORSE_PATTERN = /^[.\- ]+$/;
  const TEXT_PATTERN = /^[a-zA-Z0-9 ]+$/;
  let isPlaying = false;

  // Cache frequently accessed DOM elements
  const inputElement = document.getElementById('input-text');
  const soundButton = document.getElementById('sound');
  const outputElement = document.getElementById('morse-output-text');

  /**
   * Translates input text to Morse code or vice versa based on the input pattern.
   */
  const translate = () => {
    const input = inputElement.value.trim();
    const inputLength = input.length;

    if (!input) {
      showNotification('Error: Enter something', 'error');
      return;
    }

    if (inputLength > 512) {
      showNotification('Error: Limit Reached', 'limit');
      return;
    }

    if (MORSE_PATTERN.test(input)) {
      outputElement.innerText = translateToText(input);
      soundButton.classList.add('hidden');
    } else if (TEXT_PATTERN.test(input)) {
      outputElement.innerText = translateToMorse(input);
      soundButton.classList.remove('hidden');
    } else {
      showNotification('Error: Invalid Input', 'error');
    }
  };

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
      soundButton.innerText = 'Play';
      isPlaying = false;
      stopSound();
    } else {
      const morseText = outputElement.innerText.trim();
      if (!MORSE_PATTERN.test(morseText)) {
        soundButton.innerText = 'Play';
        isPlaying = false;
        return;
      }
      soundButton.innerText = 'Stop';
      isPlaying = true;
      playMorse(morseText);
    }
  };

  /**
   * Handles the click event on the Morse output area to copy text to clipboard.
   */
  const handleMorseOutputClick = () => {
    const textToCopy = outputElement.innerText;
    const textarea = document.createElement('textarea');
    textarea.value = textToCopy;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    showNotification('Text copied!', 'copy');
  };

  // Add event listeners for button clicks and input key presses
  document.body.addEventListener('click', event => {
    const targetId = event.target.id;
    if (targetId === 'morse-button') {
      handleTranslateButtonClick();
    } else if (targetId === 'sound') {
      handleSoundButtonClick();
    } else if (targetId === 'morse-output') {
      handleMorseOutputClick();
    }
  });

  inputElement.addEventListener('keypress', event => {
    if (event.key === 'Enter') translate();
  });
});
