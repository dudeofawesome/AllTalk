var bcrypt = require('bcrypt-nodejs');

module.exports = {
	hashPassword: function (password) {
		return bcrypt.hashSync(password);
	},
	comparePassword: function (correct, testing) {
		return bcrypt.compareSync(testing, correct);
	}
};
