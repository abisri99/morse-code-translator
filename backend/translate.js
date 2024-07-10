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
	if (pattern.test(text)) {
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
	return "Error: Invalid characters detected";
}

function translateToText(morse) {
	let text = "";
	let pattern = /^[ .\-]*$/;
	if (pattern.test(morse)) {
		const characterList = morse.split(' ');
		for (let char = 0; char < characterList.length; char++) {
			for (let key in dictionary) {
				if (dictionary[key] == characterList[char]) {
					text += key;
					break;
				}
			}
		}
		return text;
	}
	return "Error: Invalid characters detected";
}

module.exports = { translateToMorse, translateToText };
