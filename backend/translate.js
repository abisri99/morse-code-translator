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
	var morse_text = "";
	for (let i = 0; i < text.length; i++) {
		morse_text = morse_text + dictionary[text.charAt(i)];
	  }
	  return morse_text;
}

function translateToText(morse) {
	let text = "";
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

module.exports = { translateToMorse, translateToText };
