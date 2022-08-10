'use strict';

const request = require('supertest');

const db = require('../db.js');
const app = require('../app');
const User = require('../models/user');

const {
	commonBeforeAll,
	commonBeforeEach,
	commonAfterEach,
	commonAfterAll,
	u1Token,
	u2Token,
	u3Token
} = require('./_testConfig');

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************** POST /users/register */

describe('POST /users/register', function() {
	test('creates new user', async function() {
		const res = await request(app).post('/users/register').send({
			username: 'T1',
			firstName: 'Test',
			lastName: 'User',
			password: 'tp12345',
			email: 'test@gmail.com',
			age: 35
		});
		expect(res.statusCode).toEqual(201);
	});
});
