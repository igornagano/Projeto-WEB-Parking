var bcrypt = require("bcrypt");

const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

var salt = bcrypt.genSaltSync(saltRounds);
var hash = bcrypt.hashSync(myPlaintextPassword, salt);

bcrypt.compare(myPlaintextPassword, hash, function(err, res) {
console.log(myPlaintextPassword+" = "+hash+" "+ res);
}); // true

bcrypt.compare(someOtherPlaintextPassword, hash, function(err, res) {
	console.log(someOtherPlaintextPassword+" = "+hash+" "+res);
}); // false