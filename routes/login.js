/*
 * All routes for login are defined here.
 * This file is loaded in server.js into /login,
 * so these routes are mounted onto /login.
 */

const express = require('express');
const router = express.Router();

router.get('/:id', (req, res) => {
  // Set to 1 for simple login and functionality testing
  req.session.user_id = req.params.id;

  res.redirect('/');
});

module.exports = router;
