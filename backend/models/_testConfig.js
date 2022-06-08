const bcrypt = require('bcrypt');
const db = require('../db');
const { BCRYPT_WORK_FACTOR } = require('../config');

async function beforeAllTests() {
	// Empty test database
	await db.query('DELETE FROM users');
	// Fill with user data
	await db.query(
		`
        INSERT INTO users(username, password, first_name, last_name, email, age)
        VALUES  ('Test1', $1, 'test', 'one', 'test.1@gmail.com', 19),
                ('Test2', $2, 'test', 'two', 'test.2@gmail.com', 42),
                ('Test3', $3, 'test', 'three', 'test.3@gmail.com', 15)`,
		[
			await bcrypt.hash('testpass1', BCRYPT_WORK_FACTOR),
			await bcrypt.hash('testpass2', BCRYPT_WORK_FACTOR),
			await bcrypt.hash('testpass3', BCRYPT_WORK_FACTOR)
		]
	);
}

async function beforeEachTest() {
	await db.query('BEGIN');
}

async function afterEachTest() {
	await db.query('ROLLBACK');
}

async function afterAllTests() {
	await db.end();
}

module.exports = {
	beforeAllTests,
	beforeEachTest,
	afterEachTest,
	afterAllTests
};
