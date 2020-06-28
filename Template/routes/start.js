const router = require('express').Router();
const handler = require('../handlers/start');
const isAuth = require('../utils/isAuth');

router.get('',isAuth(true), handler.get.start);

module.exports = router;