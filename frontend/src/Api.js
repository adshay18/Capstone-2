import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3001';

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 *
 */

class BoredApi {
	static async request(endpoint, data = {}, method = 'get') {
		console.debug('API Call:', endpoint, data, method);

		const url = `${BASE_URL}/${endpoint}`;
		const params = method === 'get' ? data : {};

		try {
			return (await axios({ url, method, data, params })).data;
		} catch (err) {
			console.error('API Error:', err.response);
			let message = err.response.data.error.message;
			throw Array.isArray(message) ? message : [ message ];
		}
	}

	// Individual API routes

	//  --------------  User Routes ------------------

	// Store user token here
	static token;

	// Register a new user
	static async registerUser(user) {
		let res = await this.request('users/register', user, 'post');
		return res;
	}

	// Authenticate user
	static async loginUser(userLogin) {
		let res = await this.request('users/token', userLogin, 'post');
		return res;
	}

	// Get info on a user
	static async getUser(username) {
		let res = await this.request(`users/${username}`);
		return res;
	}

	// Update a user
	static async updateUser(username, user) {
		let res = await this.request(`users/${username}`, user, 'patch');
		return res;
	}

	// Delete a user
	static async deleteUser(username) {
		let res = await this.request(`users/${username}`, 'delete');
		return res;
	}

	//  --------------  Task Routes ------------------

	// Give a user a task
	static async addTask(username, key) {
		let res = await this.request(`tasks/${username}/${key}`, {}, 'post');
		return res;
	}

	// Mark a task complete
	static async markComplete(username, key) {
		let res = await this.request(`tasks/${username}/${key}`, {}, 'patch');
		return res;
	}

	// Get tasks associated with a given user
	static async getTasksForUser(username) {
		let res = await this.request(`tasks/${username}`);
		return res;
	}

	// Delete a task
	static async deleteTask(username, key) {
		let res = await this.request(`tasks/${username}/${key}`);
		return res;
	}

	//  --------------  Badge Routes ------------------

	// Add a new badge
	static async addBadge(username, badgeId) {
		let res = await this.request(`collectedBadges/${username}/${badgeId}`, {}, 'post');
		return res;
	}

	// Get badges for a given user
	static async getBadges(username) {
		let res = await this.request(`collectedBadges/${username}`);
		return res;
	}
}

export default BoredApi;
