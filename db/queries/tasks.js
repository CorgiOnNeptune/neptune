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

module.exports = { getAllTasks };
