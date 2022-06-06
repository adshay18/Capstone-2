'use strict';

const db = require('../db');
const bcrypt = require('bcrypt');
const { NotFoundError, BadRequestError } = require('../expressError');
const { BCRYPT_WORK_FACTOR } = require('../config');

class User {
	// User authentication
	// Returns {username}
	static async verify(username, password) {
		const res = await db.query(
			`SELECT username, password
            FROM users
            WHERE username = $1`,
			[ username ]
		);

		const user = res.rows[0];

		if (user) {
			const correctPassword = await bcrypt.compare(password, user.password);
			if (correctPassword === true) {
				delete user.password;
				return user;
			} else {
				throw new BadRequestError('Incorrect password.');
			}
		} else {
			throw new NotFoundError('Username not found.');
		}
	}

	// Add new user
	// Returns {username, firstName, lastName, email, age, completedTasks}
	static async register({ username, password, firstName, lastName, email, age, completedTasks = 0, avatar = null }) {
		const duplicateCheck = await db.query(
			`SELECT username
           FROM users
           WHERE username = $1`,
			[ username ]
		);

		if (duplicateCheck.rows[0]) {
			throw new BadRequestError(`Username: ${username} is already in use, please pick a different username.`);
		}

		const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

		const result = await db.query(
			`INSERT INTO users
           (username,
            password,
            first_name,
            last_name,
            email,
            age,
            completed_tasks,
            avatar)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
           RETURNING username, first_name AS "firstName", last_name AS "lastName", email, age, completed_tasks AS "completedTasks"`,
			[ username, hashedPassword, firstName, lastName, email, age, completedTasks, avatar ]
		);

		const user = result.rows[0];

		return user;
	}
}
