'use strict';

const { ExpressError, NotFoundError, BadRequestError } = require('../expressError');
const db = require('../db');
const User = require('./user');
const { beforeAllTests, beforeEachTest, afterEachTest, afterAllTests } = require('./_testConfig');

beforeAll(beforeAllTests);
beforeEach(beforeEachTest);
afterEach(afterEachTest);
afterAll(afterAllTests);

// Verification of User

describe('verify user', function() {
	test('works', async function() {
		const user = await User.verify('Test1', 'testpass1');
		expect(user).toEqual({ username: 'Test1' });
	});

	test('Not found for no user', async function() {
		try {
			await User.verify('DNE', 'password');
		} catch (e) {
			expect(e instanceof NotFoundError).toBeTruthy();
			expect(e.message).toEqual('Username not found.');
		}
	});

	test('Bad request for incorrect password', async function() {
		try {
			await User.verify('Test2', 'testpass1');
		} catch (e) {
			expect(e instanceof BadRequestError).toBeTruthy();
			expect(e.message).toEqual('Incorrect password.');
		}
	});
});

// User registration

describe('register new user', function() {
	test('works', async function() {
		const user = await User.register('Test4', 'testpass4', 'test', 'four', 'test.4@gmail.com', 3);
		expect(user).toEqual({
			username: 'Test4',
			firstName: 'test',
			lastName: 'four',
			email: 'test.4@gmail.com',
			age: 3,
			completedTasks: 0
		});
	});

	test('Bad request for username already in use', async function() {
		try {
			await User.register('Test1', 'testpass4', 'test', 'four', 'test.4@gmail.com', 3);
		} catch (e) {
			expect(e instanceof BadRequestError).toBeTruthy();
			expect(e.message).toEqual('Username: Test1 is already in use, please pick a different username.');
		}
	});
});

// Get user by username

describe('find users by username', function() {
	test('works', async function() {
		const user = await User.get('Test3');
		expect(user).toEqual({
			username: 'Test3',
			firstName: 'test',
			lastName: 'three',
			email: 'test.3@gmail.com',
			age: 15,
			completedTasks: 0,
			avatar: null
		});
	});

	test('404 if not found', async function() {
		try {
			await User.get('Wrong_Username');
		} catch (e) {
			expect(e instanceof NotFoundError).toBeTruthy();
			expect(e.status).toEqual(404);
			expect(e.message).toEqual('No user: Wrong_Username');
		}
	});
});
