'use strict';

const express = require('express');
const router = express.Router();
const log = require('../libs/log')(module);

const siteRouter = require('./site');
const errorsRouter = require('./errors');

router.use('/', siteRouter);

router.use('/', errorsRouter);

module.exports = router;