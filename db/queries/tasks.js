const db = require('../connection');
const dbHelpers = require('../db-helpers');

/**
 * Get all tasks for user.
 * @param {{user_id: number, category: string, completed: boolean}} queryParams
 * Valid categories include 'restaurants', 'films', 'books', 'products', 'others', 'all'
 * @return {Promise<[{}]>} A promise to the tasks.
 */
const getAllTasks = (queryParams) => {
  const { user_id } = queryParams;
  // Default category to 'all' and completed to false if invalid value
  let category = dbHelpers.checkValidCategory(queryParams.category);
  let completed = dbHelpers.validateCompleted(queryParams.completed);

  const values = [user_id];

  const restrictCompleteStatus = `WHERE tasks.complete = ${completed} `;
  let categorySpecified;

  if (category !== 'all') {
    values.push(category);
    categorySpecified = true;
  }

  let queryString = `
  SELECT tasks.id,
      tasks.category,
      tasks.description AS task_name,
      tasks.due_date,
      tasks.complete${categorySpecified ? `, ${category}.* ` : ` `}
      FROM tasks `;

  //TODO: Can't use variables ($2) in SELECT or JOIN statements
  if (categorySpecified) {
    queryString += `JOIN ${category} ON task_id = tasks.id `;
  }
  if (completed !== null) {
    queryString += restrictCompleteStatus;
  }

  if (categorySpecified) {
    if (completed === null) {
      queryString += `WHERE tasks.category = $2 `;
    } else {
      queryString += `AND tasks.category = $2 `;
    }
  }

  if (completed === null && !categorySpecified) {
    queryString += `
  WHERE tasks.user_id = $1 `;
  } else {
    queryString += `
    AND tasks.user_id = $1 `
  }

  queryString += `ORDER BY tasks.complete DESC, tasks.due_date DESC;`;

  console.log(queryString);

  return db
    .query(queryString, values)
    .then((data) => {
      console.log(data.rows);
      return data.rows;
    })
    .catch((err) => {
      console.log(err.message);
      return null;
    });
};

/**
 * Adds a new task to the database
 * @param {{}} task An object containing all of the task details.
 * @return {Promise<[{}]>} A promise to the tasks.
 */
const createTask = (task) => {
  const taskValues = ['user_id', 'category', 'description', 'due_date'];

  const queryString = `
  INSERT INTO tasks(${taskValues.join(', ')})
  VALUES($1, $2, $3, $4)
  RETURNING *;
  `;

  const values = taskValues.map((value) => task[value]);

  return db
    .query(queryString, values)
    .then((data) => {
      console.log(queryString);
      console.log(data.rows[0]);
      return data.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
      return null;
    });
};

/**
 * Adds a new task to the database
 * @param {{}} task An object containing a task id and the status to change to
 * @return {Promise<[{}]>} A promise to the tasks.
 */
const changeTaskStatus = (data) => {
  const queryString = `
  UPDATE tasks
  SET complete = $2
  WHERE id = $1
  RETURNING *;
  `;
  const values = [data.id, data.status];

  return db
    .query(queryString, values)
    .then((data) => {
      console.log(data.rows);
      console.log(queryString);
      return data.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
      return null;
    });
};

/**
 * Adds a new task to the database
 * @param {{}} task An object containing a task id and the status to change to
 * @return {Promise<[{}]>} A promise to the tasks.
 */
const deleteTaskData = (task) => {
  const queryString = `
  DELETE FROM tasks
  WHERE tasks.id = $1
  AND tasks.user_id = $2
  `;

  const values = [task.id, task.user_id]

  return db
    .query(queryString, task.id)
    .then((data) => {
      console.log(data.rows);
      console.log(queryString);
      console.log(`successfully deleted task ${task.id}`)
      return data.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
      return null;
    });
};


/**
 * Adds new task data to appropriate category database
 * @param {{}} taskData An object containing all of the API obtained info.
 * @param string A string of appropriate category, based on API call.
 * @param columns
 * @return {Promise<[{}]>} A promise to the tasks categories.
 */
const addTaskToCategory = async (task_id, category, taskData) => {

  taskData.task_id = task_id;
  const columns = await dbHelpers.getDataColumns(category);
  const taskDataLower = dbHelpers.lowercaseKeys(taskData);
  const taskDataClean = dbHelpers.cleanAPIData(taskDataLower, category);
  const insertValues = [];

  console.log(taskDataClean);

  columns.forEach((val, index) => insertValues.push(`$${index + 1}`));

  const queryString = `
  INSERT INTO ${category}(${columns.join(', ')})
  VALUES(${insertValues.join(', ')})
  RETURNING *;
  `;

  const values = columns.map((val) => taskDataClean[val]);

  // console.log(values);
  console.log(queryString);

  return db
    .query(queryString, values)
    .then((data) => {
      console.log(data.rows);
      return data.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
      return null;
    });
};

module.exports = {
  getAllTasks,
  createTask,
  addTaskToCategory,
  changeTaskStatus,
  deleteTaskData
};
