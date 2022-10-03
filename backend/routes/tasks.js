'use strict';

/** Routes for tasks. */

const jsonschema = require('jsonschema');

const express = require('express');
const { BadRequestError } = require('../expressError');
const Task = require('../models/task');

const { ensureCorrectUser } = require('../middleware/auth');
const User = require('../models/user');

const router = express.Router();

router.post('/:username', async function(req, res, next) {
    try {
        cont task = await 
        const user = await User.get(req.params.username);
        const description = 
    }
})


module.exports = router;
