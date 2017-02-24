// script was written in few minutes
// is working on node 4.2.2 and maybe later versions
// Idea: sent archive from one PC without detecting is as archive and without ability to read anything from it, as option archive could be with password
// 1. Made archive from folder with files
// 2. encode archive ANSI file to utf8 encoding
// 3. encrypt utf8 version and save it as file
// do the same in reverse order:
// 4. read utf8 encrypted file, then decrypt it 
// 5. ecode utf8 back to ANSI and save as file
// 6. unzip archive
// No requirements to code, just quick working version

var fs = require('fs'),
	encoding = require('encoding'),
	crypto = require('crypto');
	
var algorithm = 'aes-256-ctr',
	password = 'cavabunga!£$123';
	
function encrypt(text) {
	var cipher = crypto.createCipher(algorithm, password);
	var crypted = cipher.update(text, 'utf8', 'hex');
	crypted += cipher.final('hex');
	return crypted;
}
	
function decrypt(text) {
	var decipher = crypto.createDecipher(algorithm, password);
	var dec = decipher.update(text, 'hex', 'utf8');
	dec += decipher.final('utf8');
	return dec;
}

//var file = fs.readFileSync('sourceZipFile', 'binary');
//var encoded = encoding.convert(file, 'utf8', 'binary');
//var encrypted = encrypt(encoded);
//fs.writeFile('decoded.txt', encrypted);

var file = fs.readFileSync('decodedText.txt', 'utf8');
var decrypted = decrypt(file);
var decoded = encoding.convert(decrypted, 'binary', 'utf8');
fs.writeFile('encoded.txt', decoded);