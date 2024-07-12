const dotSound = new Howl({ src: ['assets/dot.wav'] });
const dashSound = new Howl({ src: ['assets/dash.wav'] });

let soundTimeouts = [];
let isPlaying = false;

/**
 * Plays Morse code sounds for each dot and dash.
 * @param {string} morseCode - The Morse code to play.
 */
function playMorse(morseCode) {
  if (isPlaying) return; // Prevent multiple concurrent plays

  const words = morseCode.trim().split('/');
  let delay = 0;

  words.forEach(word => {
    const characters = word.trim().split(' ');
    characters.forEach(character => {
      character.split('').forEach(symbol => {
        soundTimeouts.push(setTimeout(() => {
          switch (symbol) {
            case '.':
              dotSound.rate(1.5); // Adjust playback rate if necessary
              dotSound.play();
              break;
            case '-':
              dashSound.rate(1.5); // Adjust playback rate if necessary
              dashSound.play();
              break;
            default:
              console.log('Invalid symbol:', symbol); // Debug logging
              break;
          }
        }, delay));
        delay += 250; // Time between each dot/dash
      });
      delay += 250; // Additional time between characters
    });
    delay += 500; // Additional time between words
  });

  isPlaying = true; // Set playing state to true

  // Reset button text and state when playback is complete
  setTimeout(() => {
    document.getElementById('sound').innerText = 'Play'; // Reset button text
    isPlaying = false; // Reset playing state
  }, delay + 500); // Delay + additional time after last character
}

/**
 * Stops currently playing Morse code sounds.
 */
function stopSound() {
  soundTimeouts.forEach(timeout => clearTimeout(timeout)); // Clear all timeouts
  dotSound.stop(); // Stop dot sound
  dashSound.stop(); // Stop dash sound
  soundTimeouts = []; // Reset timeouts array
}

// Export functions for Node.js if applicable
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = { playMorse, stopSound };
}
