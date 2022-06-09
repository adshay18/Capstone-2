'use strict';

const db = require('../db');
const { NotFoundError, BadRequestError } = require('../expressError');

class Task {
	// Add a new task associated to a user
	// Returns {task_id, username, description, completed}
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

		const result = await db.query(
			`
        INSERT INTO tasks
        (username, description)
        VALUES ($1, $2)
        RETURNING *`,
			[ username, description ]
		);

		const task = result.rows[0];
		return task;
	}

	// Mark a task as completed
	// Returns {task_id, username, description, completed}
	static async markComplete(taskId) {
		const result = await db.query(
			`
        UPDATE tasks
        SET completed = true
        WHERE task_id = $1
        RETURNING *`,
			[ taskId ]
		);

		const task = result.rows[0];

		if (!task) throw new NotFoundError(`Task not found with ID: ${taskId}`);
		return task;
	}

	// Remove a task from user's list
	// Returns {deleted: taskId}

	static async remove(taskId) {
		const result = await db.query(
			`
        DELETE FROM tasks
        WHERE task_id = $1`,
			[ taskId ]
		);

		const deletedTask = result.rows[0];
		if (!deletedTask) throw new NotFoundError(`Task not found with ID: ${taskId}`);
		return { delted: taskId };
	}
}

module.exports = Task;
