/*
 * All routes for login are defined here
 */

const express = require('express');
const router = express.Router();

router.get('/login/:id', (req, res) => {
  req.session.user_id = req.params.id;

  res.redirect('/');
});

router.get('/logout', (req, res) => {
  req.session = null;
  res.redirect('/');
});

module.exports = router;
