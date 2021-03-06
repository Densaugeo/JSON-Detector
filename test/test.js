var assert = require('assert');
var splitter = require('..');

suite('', function() {
  test('Single well-formed json', function() {
    var result = splitter('{"foo":"bar"}');
    
    assert.deepStrictEqual(result, {
      jsons: ['{"foo":"bar"}'],
      remainder: ''
    });
  });
  
  test('String with remainder', function() {
    var result = splitter('{"foo":"bar"}{"remainder"');
    
    assert.deepStrictEqual(result, {
      jsons: ['{"foo":"bar"}'],
      remainder: '{"remainder"'
    });
  });
  
  test('Single complicated json', function() {
    var result = splitter('{"foo":"bar", "num":456, "exponent":1e+8, "stringy":"{{", "quotes":"\'\\\"", "escape": "\\\\", "utf8":"ねじ巻き精霊戦記 天鏡のアルデラミン"}');
    
    assert.deepStrictEqual(result, {
      jsons: ['{"foo":"bar", "num":456, "exponent":1e+8, "stringy":"{{", "quotes":"\'\\\"", "escape": "\\\\", "utf8":"ねじ巻き精霊戦記 天鏡のアルデラミン"}'],
      remainder: ''
    });
  });
  
  test('Three strings', function() {
    var result = splitter('{"one":"string"}{"two":"string"}{"three":"string"}');
    
    assert.deepStrictEqual(result, {
      jsons: ['{"one":"string"}', '{"two":"string"}', '{"three":"string"}'],
      remainder: ''
    });
  });
  
  test('Three strings with extra white space in-between', function() {
    var result = splitter('\t\t\t{"one":"string"}    {"two":"string"}\n\n\n{"three":"string"}');
    
    assert.deepStrictEqual(result, {
      jsons: ['{"one":"string"}', '{"two":"string"}', '{"three":"string"}'],
      remainder: ''
    });
  });
});
