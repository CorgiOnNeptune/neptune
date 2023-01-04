/*
 * All routes for login are defined here.
 * This file is loaded in server.js into /login,
 * so these routes are mounted onto /login.
 */

const express = require('express');
const router = express.Router();

router.get('/:id', (req, res) => {
  console.log('req.session.user_id BEFORE ➡️ ', `${req.session.user_id}`);

  // Set to 1 for simple login and functionality testing
  req.session.user_id = 1;
  console.log('req.params.id ➡️ ', `${req.params.id}`);
  console.log('req.session.user_id ➡️ ', `${req.session.user_id}`);

  res.redirect('/');
});

module.exports = router;
