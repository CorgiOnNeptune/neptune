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

/**
 * @param {string} str Takes in string to check condition.
 * @param {string} word Word to check for in string.
 * @return boolean if the word is in the string.
 */
const wordInString = (str, word) => {
  return new RegExp('\\b' + word + '\\b', 'i').test(str);
};

/**
 * @param {string} str Takes in string to check for keyword.
 * @return appropriate category if value match found.
 */
const matchCategoryKeyword = (string) => {
  let category;
  const categories = ['restaurants', 'films', 'books', 'products'];
  const keywords = ['eat', 'watch', 'read', 'buy'];

  keywords.some((val, index) => {
    if (wordInString(string, val)) {
      category = categories[index];
    }
  })

  return category;
}

module.exports = {
  checkValidCategory,
  validateCompleted,
  matchCategoryKeyword
};
