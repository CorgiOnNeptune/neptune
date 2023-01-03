/**
 * Helper function to determine valid category entries
 * @param {string} category Input to check validity of
 * @return 'all' if category input checked is not valid, else return unaltered param
 */
const checkValidCategory = (category) => {
  const validCategories = [
    'restaraunts',
    'films',
    'books',
    'products',
    'others',
  ];
  if (!validCategories.includes(category)) {
    return (category = 'all');
  }

  return category;
};
