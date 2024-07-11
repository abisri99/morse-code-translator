const dotSound = new Howl({ src: ['assets/dot.wav'] });
const dashSound = new Howl({ src: ['assets/dash.wav'] });

let soundTimeouts = [];
let playing = false;

/**
 * Plays Morse code sounds for each dot and dash.
 * @param {string} morseCode - The Morse code to play.
 */
function playMorse(morseCode) {
  const characters = morseCode.trim().split(' ');
  let delay = 0;

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
            break;
        }
      }, delay));
      delay += 250; // Time between each dot/dash
    });
    delay += 500; // Time between characters
  });

  // Reset button text and state when playback is complete
  setTimeout(() => {
    document.getElementById('sound').innerText = 'Play'; // Reset button text
    playing = false; // Reset playing state
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
