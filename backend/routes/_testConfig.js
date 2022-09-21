const db = require('../db.js');
const User = require('../models/user.js');
const { createToken } = require('./helpers');

async function commonBeforeAll() {
	// noinspection SqlWithoutWhere
	await db.query('DELETE FROM users');

	await User.register({
		username: 'u1',
		password: 'password1',
		firstName: 'U1F',
		lastName: 'U1L',
		email: 'user1@user.com',
		age: 15
	});
	await User.register({
		username: 'u2',
		password: 'password2',
		firstName: 'U2F',
		lastName: 'U2L',
		email: 'user2@user.com',
		age: 12
	});
	await User.register({
		username: 'u3',
		password: 'password3',
		firstName: 'U3F',
		lastName: 'U3L',
		email: 'user3@user.com',
		age: 17
	});
}

async function commonBeforeEach() {
	await db.query('BEGIN');
}

async function commonAfterEach() {
	await db.query('ROLLBACK');
}

async function commonAfterAll() {
	await db.end();
}

const u1Token = createToken({ username: 'u1' });
const u2Token = createToken({ username: 'u2' });
const u3Token = createToken({ username: 'u3' });

module.exports = {
	commonBeforeAll,
	commonBeforeEach,
	commonAfterEach,
	commonAfterAll,
	u1Token,
	u2Token,
	u3Token
};
