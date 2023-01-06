const db = require("./connection");

/**
 * Helper function to determine valid category entries
 * @param {string} category Input to check validity
 * @return 'all' if category input checked is not valid, else return unaltered param
 */
const checkValidCategory = (category) => {
  const validCategories = [
    'restaurants',
    'films',
    'books',
    'products',
    'others',
  ];
  if (!validCategories.includes(category) || !category) {
    return (category = 'all');
  }

  return category;
};

/**
 * @param {boolean} completed Input to check presence of completed bool.
 * @return returns boolean of the input, else null.
 */
const validateCompleted = (completed) => {
  if (completed === true || completed === 'completed') {
    return true;
  }

  if (completed === false || completed === 'incomplete') {
    return false;
  }

  return null;
};


const getDataColumns = (category) => {
  const queryString = `
  SELECT *
  FROM ${category}
  WHERE false;
  `

  return db.query(queryString)
    .then((data) => {
      const columns = [];

      data.fields.forEach((field) => {
        if (field.name !== 'id') {
          columns.push(field.name);
        }
      })

      return columns;
    })
    .catch(err => {
      console.log(err.message);
      return null;
    });
};

const lowercaseKeys = (object) => {
  const newObj = object;
  Object.keys(newObj).map(key => {
    if (key.toLowerCase() != key) {
      newObj[key.toLowerCase()] = newObj[key];
      delete newObj[key];
    }
  });

  return newObj;
};

module.exports = {
  checkValidCategory,
  validateCompleted,
  getDataColumns,
  lowercaseKeys
};
