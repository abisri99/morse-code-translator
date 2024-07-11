document.addEventListener('DOMContentLoaded', () => {
  let pattern = /^[ /.\-]*$/;
  const translate = () => {
    const input = document.getElementById('input-text').value;
    if (pattern.test(input)) {
      const morseOutput = translateToText(input);
      document.getElementById('morse-output').innerText = morseOutput;
    }
    else {
      const textOutput = translateToMorse(input);
      document.getElementById('morse-output').innerText = textOutput;
    }
  }
  document.getElementById('morse-button').addEventListener('click', translate);
  document.getElementById('input-text').addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      translate();
    }
  })
  document.getElementById('sound').addEventListener('click', () => {
    const input = document.getElementById('input-text').value;
    if (pattern.test(input)) {
      document.getElementById('morse-output').innerText = "Error: Cannot play text output";
      return;
    }
    playMorse(document.getElementById('morse-output').innerText);
  });
});
