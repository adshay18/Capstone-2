'use strict';

/** Routes for users. */

const jsonschema = require('jsonschema');

const express = require('express');
const { BadRequestError } = require('../expressError');
const User = require('../models/user');
const userNewSchema = require('../schemas/userNewSchema.json');
const userUpdateSchema = require('../schemas/userUpdateSchema.json');
const userLoginSchema = require('../schemas/userLoginSchema.json');

const router = express.Router();

const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config');

/** return signed JWT from user data. */

function createToken(user) {
	let payload = {
		username: user.username,
		completedTasks: user.completedTasks,
		avatar: user.avatar
	};

	return jwt.sign(payload, SECRET_KEY);
}

/** POST /users:   { user } => { token }
 *
 * user must include { username, password, firstName, lastName, email, age }
 *
 * This returns the newly created user and an authentication token for them:
 *  {user: { username, firstName, lastName, email, ... }, token }
 *
 */

router.post('/register', async function(req, res, next) {
	try {
		const validator = jsonschema.validate(req.body, userNewSchema);
		if (!validator.valid) {
			const errs = validator.errors.map((e) => e.stack);
			throw new BadRequestError(errs);
		}

		const newUser = await User.register({ ...req.body });
		const token = createToken(newUser);
		return res.status(201).json({ newUser, token });
	} catch (err) {
		return next(err);
	}
});

/** POST /users/token:  { username, password } => { token }
 *
 * Returns JWT token which can be used to authenticate further requests.
 *
 */

router.post('/token', async function(req, res, next) {
	try {
		const validator = jsonschema.validate(req.body, userAuthSchema);
		if (!validator.valid) {
			const errs = validator.errors.map((e) => e.stack);
			throw new BadRequestError(errs);
		}

		const { username, password } = req.body;
		const user = await User.verify(username, password);
		const token = createToken(user);
		return res.json({ token });
	} catch (err) {
		return next(err);
	}
});

module.exports = router;
