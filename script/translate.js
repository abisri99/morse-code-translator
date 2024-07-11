/**
 * Dictionary mapping characters to Morse code and vice versa.
 * @type {Object<string, string>}
 */
const dictionary = {
	'a': ".-", 'b': "-...", 'c': "-.-.", 'd': "-..", 'e': ".", 'f': "..-.",
	'g': "--.", 'h': "....", 'i': "..", 'j': ".---", 'k': "-.-", 'l': ".-..",
	'm': "--", 'n': "-.", 'o': "---", 'p': ".--.", 'q': "--.-", 'r': ".-.",
	's': "...", 't': "-", 'u': "..-", 'v': "...-", 'w': ".--", 'x': "-..-",
	'y': "-.--", 'z': "--..", '0': "-----", '1': ".----", '2': "..---",
	'3': "...--", '4': "....-", '5': ".....", '6': "-....", '7': "--...",
	'8': "---..", '9': "----.", '.': ".-.-.-", ',': "--..--", '?': "..--..",
	"'": ".----.", '!': "-.-.--", '/': "-..-.", '(': "-.--.", ')': "-.--.-",
	'&': ".-...", ':': "---...", ';': "-.-.-.", '=': "-...-", '+': ".-.-.",
	'-': "-....-", '_': "..--.-", '"': ".-..-.", '$': "...-..-", '@': ".--.-."
};

/**
 * Translates text to Morse code.
 * @param {string} text - The text to translate.
 * @returns {string} - The Morse code translation.
 */
function translateToMorse(text) {
	text = text.toLowerCase();
	let morseArray = [];

	for (let i = 0; i < text.length; i++) {
		if (text.charAt(i) === ' ') {
			morseArray.push('/');
		} else {
			morseArray.push(dictionary[text.charAt(i)]);
		}
	}

	return morseArray.join(" ");
}

/**
 * Translates Morse code to text.
 * @param {string} morse - The Morse code to translate.
 * @returns {string} - The text translation.
 */
function translateToText(morse) {
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
		}).join("");
	}).join(" ");

	return text;
}

// Export functions for Node.js if applicable
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
	module.exports = { translateToMorse, translateToText };
}
