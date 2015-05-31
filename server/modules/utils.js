var bcrypt = require("bcrypt-nodejs");

function hashPassword (password) {
	return bcrypt.hashSync(password);
}

function comparePassword (correct, testing) {
	return bcrypt.compareSync(testing, correct);
}
