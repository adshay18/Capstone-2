'use strict';

const express = require('express');
const cors = require('cors');
const { NotFoundError } = require('./expressError');

// Init app
const app = express();

app.use(cors());
// accepts json
app.use(express.json());

//NEED TO CREATE AND INCLUDE ROUTES - needs models done first

/** Handle 404 errors -- this matches everything */
app.use(function(req, res, next) {
	return next(new NotFoundError());
});

/** Generic error handler; anything unhandled goes here. */
app.use(function(err, req, res, next) {
	if (process.env.NODE_ENV !== 'test') console.error(err.stack);
	const status = err.status || 500;
	const message = err.message;

	return res.status(status).json({
		error: { message, status }
	});
});

module.exports = app;
