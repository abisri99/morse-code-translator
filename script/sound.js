const dotSound = new Howl({ src: ['assets/dot.wav'] });
const dashSound = new Howl({ src: ['assets/dash.wav'] });

let soundTimeouts = [];

function playMorse(morseCode) {
  const characters = morseCode.trim().split(' ');
  let delay = 0; // Initial delay

  characters.forEach(character => {
    character.split('').forEach(symbol => {
      soundTimeouts.push(setTimeout(() => {
        switch (symbol) {
          case '.':
            dotSound.rate(2)
            dotSound.play();
            break;
          case '-':
            dashSound.rate(2)
            dashSound.play();
            break;
          default:
            break;
        }
      }, delay));
      delay += 250; // Add 500ms delay for the next symbol
    });
    delay += 500; // Add extra delay between characters
  });

  // Reset the button text and state when playback is complete
  setTimeout(() => {
    document.getElementById('sound').innerText = 'Play';
    playing = false;
  }, delay + 500);
}

function stopSound() {
  soundTimeouts.forEach(timeout => clearTimeout(timeout));
  dotSound.stop();
  dashSound.stop();
  soundTimeouts = []; // Reset the timeouts array
}

if (typeof module != 'undefined' && typeof module.exports != 'undefined') {
  module.exports = { playMorse, stopSound };
}
