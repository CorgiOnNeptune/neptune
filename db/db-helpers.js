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
 * @return returns true for true or 'completed', else false.
 */
const validateCompleted = (completed) => {
  if (completed === true || completed === 'completed') {
    return true;
  }

  return false;
};

module.exports = {
  checkValidCategory,
  validateCompleted,
};
