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

// Add task

describe('add a new task to db', function() {
	test('works', async function() {
		await Task.add('Test3', 'Walk your dog.');
		const tasks = await Task.getAllForUser('Test3');
		expect(tasks).toEqual([
			{
				taskId: expect.any(Number),
				username: 'Test3',
				description: 'Make a meal with chicken, asparagus, and rice.',
				completed: false
			},
			{
				taskId: expect.any(Number),
				username: 'Test3',
				description: 'Walk your dog.',
				completed: false
			}
		]);
	});

	test('bad request for duplication', async function() {
		try {
			await Task.add('Test3', 'Make a meal with chicken, asparagus, and rice.');
		} catch (e) {
			expect(e instanceof BadRequestError);
		}
	});

	test('404 for user not found', async function() {
		try {
			await Task.add('Wrong_user', 'Make a meal with chicken, asparagus, and rice.');
		} catch (e) {
			expect(e instanceof NotFoundError);
		}
	});
});
