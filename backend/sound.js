const dotSound = new Howl({ src: ['../assets/dot.wav'] });
const dashSound = new Howl({ src: ['../assets/dash.wav'] });

function playMorse(morseCode) {
	const characters = morseCode.trim().split(' ');
	let delay = 0;

	characters.forEach(character => {
		character.split('').forEach(symbol => {
			setTimeout(() => {
				switch (symbol) {
					case '.':
						dotSound.play();
						break;
					case '-':
						dashSound.play();
						break;
					default:
						break;
				}
			}, delay);
			delay += 500;
		});
		delay += 1000;
	});
}

module.exports = { playMorse };
