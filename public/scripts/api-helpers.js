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
    .then((results) => {
      const yelpResult = results[0];
      const omdbResult = results[1];
      const tmdbResult = results[2];
      const gbooksResult = results[3];

      console.log('Yelp result:', yelpResult);
      console.log('OMDB result:', omdbResult);
      console.log('TMDB result:', tmdbResult);
      console.log('Gbooks result:', gbooksResult);

      // if (yelpResult.status === 'fulfilled') {
      //   task.category = 'restaurants';
      //   task.data = yelpResult.value;
      //   return task;
      // }

      // use OMDB results to determine category for films and shows because it's stricker than TMDB, which apparently sends back results for anything
      // put additional information from TMDB to OMDB's value and pack them up in task
      if (omdbResult.status === 'fulfilled') {
        task.category = 'films';
        const firstResult = tmdbResult.value.results[0];
        if (tmdbResult.status === 'fulfilled' || firstResult.name === omdbResult.value.Title) {
          const posterPath = firstResult.poster_path;
          const tmdbRating = firstResult.vote_average;
          const posterUrl = `https://image.tmdb.org/t/p/w780/${posterPath}`;
          omdbResult.value.Poster = posterUrl;
          omdbResult.value.tmdb_rating = tmdbRating;
        }
        task.data = omdbResult.value;
        return task;
      }

      if (gbooksResult.status === 'fulfilled') {
        task.category = 'books';
        task.data = gbooksResult.value;
        return task;
      }

      // if (data.ASIN) {
      //   task.category = 'products';
      //   task.data = data;
      //   return task;
      // }

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
