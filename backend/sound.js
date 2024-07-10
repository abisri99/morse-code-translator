const dotSound = new Howl({ src: ['../assets/dot.mp3'] });
const dashSound = new Howl({ src: ['../assets/dash.mp3'] });

function playMorse(morse) {
	const characterList = morse.split(' ');
	for (let char = 0; char < characterList.length; char++) {
		let dotsAndDashes = characterList[char];
		for (let i = 0; i < dotsAndDashes.length; i++) {
			switch (dotsAndDashes[i]) {
				case '.':
					dotSound.play();
					break;
				case '-':
					dashSound.play();
				default:
					break;
			}
		}
	}
}
