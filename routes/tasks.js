/*
 * All routes for tasks are defined here.
 * This file is loaded in server.js into /tasks,
 * so these routes are mounted onto /tasks.
 */

const express = require('express');
const router = express.Router();
const database = require('../db/queries/tasks');

/*
 * Get all incomplete tasks at '/tasks'
 */
router.get('/', (req, res) => {
  if (!req.session.user_id) {
    throw new Error('Must be logged in to view tasks.');
    return;
  }

  const queryParams = {
    user_id: req.session.user_id,
    // completed: false,
  };

  database
    .getAllTasks(queryParams)
    .then((tasks) => {
      res.json({ tasks });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    }); // this is rnot returning completed tasks for some reason
});

/*
 * Get all completed tasks
 */
router.get('/completed', (req, res) => {
  if (!req.session.user_id) {
    throw new Error('Must be logged in to view tasks.');
    return;
  }

  const queryParams = {
    user_id: req.session.user_id,
    completed: true,
  };

  database
    .getAllTasks(queryParams)
    .then((tasks) => {
      res.json({ tasks });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.get('/incomplete', (req, res) => {
  if (!req.session.user_id) {
    throw new Error('Must be logged in to view tasks.');
    return;
  }

  const queryParams = {
    user_id: req.session.user_id,
    completed: false,
  };

  database
    .getAllTasks(queryParams)
    .then((tasks) => {
      res.json({ tasks });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

/*
 * Get incomplete tasks filtered by category
 */
router.get('/:filter', (req, res) => {
  if (!req.session.user_id) {
    throw new Error('Must be logged in to view tasks.');
    return;
  }

  const queryParams = {
    user_id: req.session.user_id,
    category: req.params.filter,
  };

  database
    .getAllTasks(queryParams)
    .then((tasks) => {
      res.json({ tasks });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

/*
 * Get tasks filtered by category and completion status
 */
router.get('/:filter/:completed', (req, res) => {
  if (!req.session.user_id) {
    res.error('Must be logged in to view tasks.');
    return;
  }

  const queryParams = {
    user_id: req.session.user_id,
    category: req.params.filter,
    completed: req.params.completed,
  };

  database
    .getAllTasks(queryParams)
    .then((tasks) => {
      res.json({ tasks });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

/*
 * Post to create new task
 */
router.post('/', (req, res) => {
  if (!req.session.user_id) {
    throw new Error('Must be logged in to create tasks.');
    return;
  }

  const newTask = {
    user_id: req.session.user_id,
    description: req.body.description,
    category: req.body.category,
    due_date: req.body.due_date,
  };

  database
    .createTask(newTask)
    .then((task) => {
      res.json({ task });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
