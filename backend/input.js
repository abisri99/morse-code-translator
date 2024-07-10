document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('morse-button').addEventListener('click', () => {
      const inputText = document.getElementById('input-text').value;
      const morseOutput = translateToMorse(inputText);
      document.getElementById('morse-output').innerText = morseOutput;
    });
  
    document.getElementById('text-button').addEventListener('click', () => {
      const inputMorse = document.getElementById('input-morse').value;
      const textOutput = translateToText(inputMorse);
      document.getElementById('text-output').innerText = textOutput;
    });
  });
  
