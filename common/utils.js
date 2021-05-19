module.exports = {
	sum(a, b) {
		return a + b;
	},

	validateUsername(username){
		return /^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/.test(username);
	},

	validateEmail(email) {
		return /([\w.\-_]+)?\w+@[\w-_]+(\.\w+){1,}/.test(email);
	},
};
