const utils = require('./utils');

test('Test utils.sum()', () => {
	expect(utils.sum(3, 4)).toBe(7);
});

test('Test utils.validateEmail()', () => {
	expect(utils.validateEmail('name@gmail.com')).toBe(true);
	expect(utils.validateEmail('namegmail.com')).toBe(false);

	expect(utils.validateEmail('name@social.club')).toBe(true);
	expect(utils.validateEmail('name@social.site')).toBe(true);
});



test('Test utils.validateUsername()', () => {
	expect(utils.validateUsername('ngoc123')).toBe(false);
	expect(utils.validateUsername('ngoc.123')).toBe(true);
	expect(utils.validateUsername('NgocAnh123')).toBe(true);
	expect(utils.validateUsername('NgocAnh123.')).toBe(false);
	expect(utils.validateUsername('NgocAnh123_')).toBe(false);
	expect(utils.validateUsername('anh_nguyen.1.2.312331231232')).toBe(false);
	
});