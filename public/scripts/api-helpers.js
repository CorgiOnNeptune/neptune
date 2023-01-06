/**
 * @param {string} str Takes in string to check condition.
 * @param {string} word Word to check for in string.
 * @return boolean if the word is in the string.
 */
const findWordInString = (str, word) => {
  return new RegExp('\\b' + word + '\\b', 'i').test(str);
};

/**
 * @param {string} string Takes in string to check for keyword.
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
  });

  return category;
};

const filterKeywords = (string) => {
  const keywords = ['eat', 'watch', 'read', 'buy'];
  let newString = '';

  keywords.some((val, index) => {
    if (findWordInString(string, val)) {
      newString = string.replace(val, '').trim();
    }
  });

  return newString;
}

const determineCategory = (task) => {
  let autoCategory = matchCategoryKeyword(task.description);

  if (autoCategory) {
    task.category = autoCategory;
    return callAPIByCategory(task)
      .then(task => {
        console.log(task);
        return task;
      })
      .catch(err => {
        console.log(err.message);
      })
  }

  return makeAPIRequests(task.description)
    .then((data) => {
      if (!data) {
        task.category = 'others';
        return task;
      }

      if (data.Director) {
        task.category = 'films';
        task.data = data;
        return task;
      }

      if (data.authors) {
        task.category = 'books';
        task.data = data;
        return task;
      }

      if (data.distance) {
        task.category = 'restaurants';
        task.data = data;
        return task;
      }

      if (data.ASIN) {
        task.category = 'products';
        task.data = data;
        return task;
      }

    })
    .catch((err) => {
      console.log(err.message);
    });
};


const callAPIByCategory = async (task) => {
  const query = filterKeywords(task.description);
  const encodedQuery = encodeURIComponent(query);

  switch (task.category) {
    case 'films':
      task.data = await makeOMDBRequest(encodedQuery);
      return task;
      break;
    case 'books':
      task.data = await makeGBooksRequest(encodedQuery);
      return task;
      break;
    case 'restaurants':
      task.data = await makeYelpRequest(encodedQuery);
      return task;
      break;
    case 'products':
      task.data = await makeAMZNRequest(encodedQuery);
      return task;
      break;
    default:
      return task;
  }
}
