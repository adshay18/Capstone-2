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
		}
	});

	test('Bad request for incorrect password', async function() {
		try {
			await User.verify('Test2', 'testpass1');
		} catch (e) {
			expect(e instanceof BadRequestError).toBeTruthy();
		}
	});
});
