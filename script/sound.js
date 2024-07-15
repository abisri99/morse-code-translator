const dotSound = new Howl({ src: ["assets/dot.wav"] });
const dashSound = new Howl({ src: ["assets/dash.wav"] });

let soundTimeouts = [];
let isPlaying = false;

/**
 * Plays Morse code sounds for each dot and dash.
 * @param {string} morseCode - The Morse code to play.
 */
function playMorse(morseCode) {
  const words = morseCode.trim().split(" / ");
  let delay = 0;
  words.forEach((word) => {
    characters = word.trim().split(" ");
    characters.forEach((character) => {
      character.split("").forEach((symbol) => {
        soundTimeouts.push(
          setTimeout(() => {
            switch (symbol) {
              case ".":
                dotSound.rate(1.5); // Adjust playback rate if necessary
                dotSound.play();
                break;
              case "-":
                dashSound.rate(1.5); // Adjust playback rate if necessary
                dashSound.play();
                break;
              default:
                break;
            }
          }, delay)
        );
        delay += 200; // Time between each dot/dash
      });
      delay += 400; // Time between characters
    });
    delay += 800;
  });

  // Reset button text and state when playback is complete
  setTimeout(() => {
    document.getElementById("sound").innerHTML =
      '<i class="material-icons" style="font-size: 16px;">volume_up</i>'; // Reset button text
    isPlaying = false; // Reset playing state
  }, delay + 100); // Delay + additional time after last character
}

/**
 * Stops currently playing Morse code sounds.
 */
function stopSound() {
  soundTimeouts.forEach((timeout) => clearTimeout(timeout)); // Clear all timeouts
  dotSound.stop(); // Stop dot sound
  dashSound.stop(); // Stop dash sound
  soundTimeouts = []; // Reset timeouts array
}

// Export functions for Node.js if applicable
if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
  module.exports = { playMorse, stopSound };
}
