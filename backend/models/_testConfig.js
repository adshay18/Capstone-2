const bcrypt = require('bcrypt');
const db = require('../db');
const { BCRYPT_WORK_FACTOR } = require('../config');

// sample task descriptions
const taskDescriptions = {
	videoGames: 'Play a video game with at least one friend.',
	hike: 'Go on a hike that is 2 miles long!',
	cooking: 'Make a meal with chicken, asparagus, and rice.'
};

async function beforeAllTests() {
	// Empty test database
	await db.query('DELETE FROM users');
	await db.query('DELETE FROM tasks');
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
	// Add tasks for users
	await db.query(
		`
        INSERT INTO tasks(username, description)
        VALUES  ('Test1', $1),
                ('Test1', $2),
                ('Test2', $3),
                ('Test2', $4),
                ('Test2', $5),
                ('Test3', $6),
                `,
		[
			taskDescriptions.videoGames,
			taskDescriptions.hike,
			taskDescriptions.videoGames,
			taskDescriptions.hike,
			taskDescriptions.cooking,
			taskDescriptions.cooking
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
