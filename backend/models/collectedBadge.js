'use strict';

const db = require('../db');
const { NotFoundError, BadRequestError } = require('../expressError');

class CollectedBadge {
	// Add a new badge for user
	// Returns {id, badgeId, username}

	static async add(username, badgeId) {
		const duplicateCheck = await db.query(
			`SELECT * FROM collected_badges
            WHERE username = $1 AND badge_id = $2`,
			[ username, badgeId ]
		);
		if (duplicateCheck.rows[0]) throw new BadRequestError('User has already collected this badge.');

		const result = await db.query(
			`
        INSERT INTO collected_badges (username, badge_id)
        VALUES ($1, $2)`,
			[ username, badgeId ]
		);

		const badge = result.rows[0];
		if (!badge) throw new NotFoundError('Username or badgeID not found.');
		return badge;
	}

	// Get a list of all badges a user has earned
	// Returns [{badgeId, username}...]

	static async getAllForUser(username) {
		const userCheck = await db.query(`SELECT * FROM users WHERE username = $1`, [ username ]);
		if (!userCheck.rows[0]) throw new NotFoundError('Username not found');

		const result = await db.query(
			`
        SELECT badge_id AS "badgeId", username FROM collected_badges
        WHERE username = $1
        ORDER BY badge_id`,
			[ username ]
		);

		return result.rows;
	}
}

module.exports = CollectedBadge;
