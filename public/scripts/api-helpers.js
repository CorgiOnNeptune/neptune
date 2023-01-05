/**
 * @param {string} str Takes in string to check condition.
 * @param {string} word Word to check for in string.
 * @return boolean if the word is in the string.
 */
const findWordInString = (str, word) => {
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
    if (findWordInString(string, val)) {
      category = categories[index];
    }
  })

  return category;
}

const determineCategory = (task) => {
  if (task.category && task.category !== 'auto') {
    return task.category;
  }

  let autoCategory = matchCategoryKeyword(task.description) || undefined;
  if (autoCategory) {
    return autoCategory;
  }

  // If match not found, ask APIs.
  const apiCategory = makeAPIRequests(task.description);

  if (apiCategory) {
    return apiCategory;
  }

  return 'others';
};
