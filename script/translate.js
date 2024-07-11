const dictionary = {
	'a': ".-",
	'b': "-...",
	'c': "-.-.",
	'd': "-..",
	'e': ".",
	'f': "..-.",
	'g': "--.",
	'h': "....",
	'i': "..",
	'j': ".---",
	'k': "-.-",
	'l': ".-..",
	'm': "--",
	'n': "-.",
	'o': "---",
	'p': ".--.",
	'q': "--.-",
	'r': ".-.",
	's': "...",
	't': "-",
	'u': "..-",
	'v': "...-",
	'w': ".--",
	'x': "-..-",
	'y': "-.--",
	'z': "--..",
	'0': "-----",
	'1': ".----",
	'2': "..---",
	'3': "...--",
	'4': "....-",
	'5': ".....",
	'6': "-....",
	'7': "--...",
	'8': "---..",
	'9': "----.",
	'.': ".-.-.-",
	',': "--..--",
	'?': "..--..",
	"'": ".----.",
	'!': "-.-.--",
	'/': "-..-.",
	'(': "-.--.",
	')': "-.--.-",
	'&': ".-...",
	':': "---...",
	';': "-.-.-.",
	'=': "-...-",
	'+': ".-.-.",
	'-': "-....-",
	'_': "..--.-",
	'"': ".-..-.",
	'$': "...-..-",
	'@': ".--.-."
};

function translateToMorse(text) {
	text = text.toLowerCase();
	let pattern = /^[a-zA-Z0-9\.\,\?\!\/\-\:\'\" ]*$/;
	if (text == "") {
		return "Error: Enter something first"
	}

	if (!pattern.test(text)) {
		return "Error: Invalid characters detected";
	}

	let morse_array = [];
	for (let i = 0; i < text.length; i++) {
		if (text.charAt(i) === ' ') {
			morse_array.push('/');
		} else {
			morse_array.push(dictionary[text.charAt(i)]);
		}
	}
	return morse_array.join(" ");
}

function translateToText(morse) {
	let pattern = /^[ /.\-]*$/;
	if (morse == "") {
		return "Error: Enter something first";
	}
	if (!pattern.test(morse)) {
		return "Error: Invalid characters detected";
	}
	const wordList = morse.split('/');
	const text = wordList.map((word) => {
		const letterList = word.split(' ');
		return letterList.map((letter) => {
			for (let key in dictionary) {
				if (dictionary[key] === letter) {
					return key;
				}
			}
			return '';
		}).join("")
	}).join(" ")
	return text;
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
	module.exports = { translateToMorse, translateToText };
}
