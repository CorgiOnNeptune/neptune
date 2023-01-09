/*
 * All routes for logout are defined here.
 * This file is loaded in server.js into /logout,
 * so these routes are mounted onto /logout.
 */

const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  req.session = null;

  res.redirect('/');
});

module.exports = router;
