var pattern = /^[ /.\-]*$/;
document.addEventListener('DOMContentLoaded', () => {
  const translate = () => {
    const input = document.getElementById('input-text').value;
    if (pattern.test(input)) {
      const morseOutput = translateToText(input);
      document.getElementById('morse-output-text').innerText = morseOutput;
    } else {
      const textOutput = translateToMorse(input);
      document.getElementById('morse-output-text').innerText = textOutput;
    }
  }

  document.getElementById('morse-button').addEventListener('click', translate);
  document.getElementById('input-text').addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      translate();
    }
  })

  document.getElementById('sound').addEventListener('click', () => {
    if (playing) {
      document.getElementById('sound').innerText = 'Play';
      playing = false;
      stopSound();
    } else {
      if (!pattern.test(document.getElementById('morse-output-text').innerText)) {
        document.getElementById('morse-output-text').innerText = "Erorr: This is not morse code"
        document.getElementById('sound').innerText = 'Play';
        playing = false;
        return;
      }
      document.getElementById('sound').innerText = 'Stop';
      playing = true;
      playMorse(document.getElementById('morse-output-text').innerText);
    }
  });


  const morseOutputDiv = document.getElementById('morse-output');
  morseOutputDiv.addEventListener('click', () => {
    const textToCopy = document.getElementById('morse-output-text').innerText;
    const textarea = document.createElement('textarea');
    textarea.value = textToCopy;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);

    // Display a popup notification above the division
    const notification = document.createElement('div');
    notification.className = 'copy-notification';
    notification.innerText = 'Text copied!';
    morseOutputDiv.appendChild(notification);
    setTimeout(() => {
      notification.remove();
    }, 1500);
  });
});
