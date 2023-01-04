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
 * @return false if falsy, else true.
 */
const validateCompleted = (completed) => {
  if (!completed) {
    return false;
  }

  return true;
};

module.exports = {
  checkValidCategory,
  validateCompleted,
};
