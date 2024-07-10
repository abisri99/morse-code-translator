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
});

describe("translateToMorse", function() {
	it("should translate 'Hello World' to Morse code", function() {
	  var result = translateToMorse("Hello World");
	  expect(result).toBe(".... . .-.. .-.. --- / .-- --- .-. .-.. -..");
	});
  
	it("should translate 'Hello, World!' to Morse code", function() {
	  var result = translateToMorse("Hello, World!");
	  expect(result).toBe(".... . .-.. .-.. --- / --..-- .-- --- .-. .-.. -.. !--.-.-");
	});
  
	it("should translate 'Hello 123' to Morse code", function() {
	  var result = translateToMorse("Hello 123");
	  expect(result).toBe(".... . .-.. .-.. --- / .---- ..--- ...--");
	});
  
	it("should return an error for invalid characters", function() {
	  var result = translateToMorse("Hello @World");
	  expect(result).toBe("Error: Invalid characters detected");
	});
  
	it("should return an empty string for an empty input", function() {
	  var result = translateToMorse("");
	  expect(result).toBe("");
	});
  
	it("should translate a single character to Morse code", function() {
	  var result = translateToMorse("A");
	  expect(result).toBe(".-");
	});
  });
  