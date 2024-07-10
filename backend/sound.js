const dotSound = new Howl({ src: ['../assets/dot.mp3'] });
const dashSound = new Howl({ src: ['../assets/dash.mp3'] });

function playMorse(morse) {
	const characterList = morse.trim().split(' ');
	characterList.forEach(character => {
		character.forEach(dotOrDash => {
			switch (dotOrDash) {
				case '.':
					dotSound.play();
					break;
				case '-':
					dashSound.play();
					break;
				default:
					break;
			}
			setTimeout(() => { }, 500);
		});
	});
}

module.exports = { playMorse };
