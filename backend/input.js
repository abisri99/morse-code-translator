document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('morse-button').addEventListener('click', () => {
    const input = document.getElementById('input-text').value;
    let pattern = /^[ /.\-]*$/;
    if (pattern.test(input)) {
      const morseOutput = translateToText(input);
      document.getElementById('morse-output').innerText = morseOutput;
    }
    else {
      const textOutput = translateToMorse(input);
      document.getElementById('morse-output').innerText = textOutput;
    }
  });
  document.getElementById('sound').addEventListener('click', () => {
    playMorse(document.getElementById('morse-output').innerText);
  });
});
