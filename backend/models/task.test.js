'use strict';

const { NotFoundError, BadRequestError } = require('../expressError');
const db = require('../db');
const Task = require('./task');
const { beforeAllTests, beforeEachTest, afterEachTest, afterAllTests } = require('./_testConfig');
beforeAll(beforeAllTests);
beforeEach(beforeEachTest);
afterEach(afterEachTest);
afterAll(afterAllTests);

// Get user's tasks

describe('find all tasks a user has saved', function() {
	test('returns array of tasks', async function() {
		const tasks = await Task.getAllForUser('Test1');
		console.log(tasks);
		expect(tasks).toEqual([
			{
				taskId: expect.any(Number),
				username: 'Test1',
				description: 'Play a video game with at least one friend.',
				completed: false
			},
			{
				taskId: expect.any(Number),
				username: 'Test1',
				description: 'Go on a hike that is 2 miles long!',
				completed: false
			}
		]);
	});

	test('returns 404 for invalid username', async function() {
		try {
			await Task.getAllForUser('Wrong_Username');
		} catch (e) {
			expect(e instanceof NotFoundError).toBeTruthy();
			expect(e.message).toEqual('Username not found');
			expect(e.status).toEqual(404);
		}
	});
});
