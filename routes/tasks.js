/*
 * All routes for tasks are defined here.
 * This file is loaded in server.js into /tasks,
 * so these routes are mounted onto /tasks.
 */

const express = require('express');
const router = express.Router();
const taskQueries = require('../db/queries/tasks');

router.get('/:filter/:completed', (req, res) => {
  const queryParams = {user_id = req.session.user_id}

  if (req.params.filter) {
    queryParams.filter = req.params.filter;
  }

  if (req.params.completed === 'completed') {
    queryParams.completed = true;
  }

  taskQueries
    .getAllTasks(queryParams)
    .then((tasks) => {
      res.json({ tasks });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;