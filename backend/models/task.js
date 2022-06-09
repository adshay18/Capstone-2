'use strict';

const db = require('../db');
const { NotFoundError, BadRequestError } = require('../expressError');

class Task {
	static async add(username, description) {
		const duplicateCheck = await db.query(
			`SELECT * FROM tasks
            WHERE username = $1 AND description = $2
            `,
			[ username, description ]
		);

		if (duplicateCheck.rows[0]) {
			throw new BadRequestError(`User already has task in their list`);
		}
	}
}
