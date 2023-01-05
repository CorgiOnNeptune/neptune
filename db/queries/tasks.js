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

  const showCompletedTasks = `WHERE tasks.complete = ${completed} `;
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

  queryString += showCompletedTasks;

  if (categorySpecified) {
    queryString += `AND tasks.category = $2 `;
  }

  queryString += `
  AND tasks.user_id = $1
  ORDER BY tasks.due_date ASC;`;

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

  // if (task.category === 'auto') {
  //   task.category = apiCalls.determineCategory(task);
  // }

  const queryString = `
  INSERT INTO tasks(${taskValues.join(', ')})
  VALUES($1, $2, $3, $4)
  RETURNING *;
  `;

  const values = taskValues.map((value) => task[value]);

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

/**
 * Adds new task data to appropriate category database
 * @param {{}} taskData An object containing all of the API obtained info.
 * @param string A string of appropriate category, based on API call.
 * @return {Promise<[{}]>} A promise to the tasks categories.
 */
const addTaskToCategory = (taskData, category) => {
  // ! Using placeholder for 'films' category
  // TODO: Will need to get the category values via API or other function call
  // ! NEED to add 'ARRAY' before array values in the query
  const categoryValues = [
    'task_id',
    'title',
    'release_date',
    'cover_photo_url',
    'more_info_url',
    'rating',
    'summary',
    'genres',
    'backdrop_photo_url',
  ];

  const insertValues = [];

  categoryValues.forEach((val, index) => insertValues.push(`$${index + 1}`));

  const queryString = `
  INSERT INTO ${taskData.category}(${categoryValues.join(', ')})
  VALUES(${insertValues.join(', ')})
  RETURNING *;
  `;

  const values = categoryValues.map((val) => taskData[val]);

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

module.exports = { getAllTasks, createTask, addTaskToCategory };
