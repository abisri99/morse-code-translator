const assert = require('assert');
const { translateToMorse, translateToText } = require('../backend/translate.js');

describe('Morse Code Translator', () => {
	it('translate text to Morse code', () => {
		const result = translateToMorse("hello");
		assert.strictEqual(result, ".... . .-.. .-.. ---");
	});

	it('translate Morse code to text', () => {
		const result = translateToText(".... . .-.. .-.. ---");
		assert.strictEqual(result, "hello");
	});

	it('handle special characters', () => {
		const result = translateToMorse("Hello, World!");
		assert.strictEqual(result, ".... . .-.. .-.. --- --..-- / .-- --- .-. .-.. -.. -.-.--");
	});

	it('handle numbers', () => {
		const result = translateToMorse("123");
		assert.strictEqual(result, ".---- ..--- ...--");
	});

	it("should handle spaces correctly", function() {
		const result = translateToText(".... . .-.. .-.. --- -.-.-- / - .... .. ... / .. ... / .- / - . ... - .-.-.-");
		assert.strictEqual(result, "hello! this is a test.")
	});

	it("should return an error for invalid characters (text)", function() {
		const result = translateToMorse("Hello @World");
		assert.strictEqual(result, "Error: Invalid characters detected")
	});

	it("should return an error for invalid characters (morse)", function() {
		const result = translateToText("$");
		assert.strictEqual(result, "Error: Invalid characters detected")
	});

	it("should return an empty string for an empty input", function() {
		const result = translateToMorse("");
		assert.strictEqual(result, "")
	});

	it("should translate a single character to Morse code", function() {
		const result = translateToMorse("A");
		assert.strictEqual(result, ".-")
	});
});
