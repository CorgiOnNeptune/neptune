const db = require('../connection');

/**
 * Get all tasks for user.
 * @param {string} user_id The id of the user.
 * @param {string} category Filter tasks in this category, defaults to 'all'.
 * Other options include 'restaraunts, films, books, products, other'.
 * @param {boolean} completed Filter tasks by completed, defaults to false.
 * @return {Promise<[{}]>} A promise to the tasks.
 */
const getAllTasks = (user_id, category = 'all', completed = false) => {
  const queryParams = [user_id, category];
  const categorySpecified = category !== 'all' && !completed;
  const showCompletedTasks = `WHERE tasks.complete = ${completed}`;
  let queryString = `
    SELECT tasks.id,
      tasks.category,
      tasks.description AS task_name,
      tasks.due_date,
      tasks.complete${categorySpecified ? `, $2.* ` : ` `}`;

  queryString += `FROM tasks `;

  if (!categorySpecified) {
    queryString += `${showCompletedTasks} `;
  }

  if (categorySpecified) {
    queryString += `
        JOIN $2 ON task_id = tasks.id
      ${showCompletedTasks}
      AND tasks.category = $2 `;
  }

  queryString += `
  AND tasks.user_id = $1
  ORDER BY tasks.due_date ASC;
  `;

  return db
    .query(queryString, queryParams)
    .then((data) => {
      return data.rows;
    })
    .catch((err) => {
      console.log(err.message);
      return null;
    });
};

module.exports = { getAllTasks };
