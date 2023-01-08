/*
 *  Functions to help out API calls or run algorithms with API results
 */

/**
 * Determine category of given task
 * Runs task description through a keyword check first
 * Returns a promise to specific API if category determined by keyword
 * If keyword check fails, makes a request to all APIs
 * API results are sorted by most to least strict results
 * This allows for more accurate categorization of the given task
 * @param  {{}}          task Task object to run through algorithm
 * @return {Promise<{}>}      A promise to the API(s), returning task updated
 *                            with data received from the API(s)
 */
const determineCategory = task => {
  let autoCategory = matchCategoryKeyword(task.description);

  // If keyword matches, return a promise to the relevant API
  if (autoCategory) {
    task.category = autoCategory;
    return callAPIByCategory(task)
      .then(task => {
        console.log(task);
        return task;
      })
      .catch(err => console.log(err.message));
  }

  // Make request to all APIs, results sorted by API strictness
  return makeAPIRequests(task.description)
    .then(results => {
      const yelpResult = results[0];
      const omdbResult = results[1];
      const tmdbResult = results[2];
      const gbooksResult = results[3];
      const amznResult = results[4];

      console.log('Yelp result:', yelpResult);
      console.log('OMDB result:', omdbResult);
      console.log('TMDB result:', tmdbResult);
      console.log('Gbooks result:', gbooksResult);
      console.log('Amzn result:', amznResult);

      // Return category restaurants if Yelp is fulfilled
      if (yelpResult.status === 'fulfilled') {
        task.category = 'restaurants';
        task.data = yelpResult.value;
        return task;
      }

      /* Use OMDB results to determine category for films and shows because
       * it's stricter than TMDB.
       * Combine information from TMDB and OMDB in returned task.
       */
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

      // Return category books if GBooks is fulfilled
      if (gbooksResult.status === 'fulfilled') {
        task.category = 'books';
        task.data = gbooksResult.value;
        return task;
      }

      // Return category products if Amazon Price is fulfilled
      if (amznResult.status === 'fulfilled') {
        task.category = 'products';
        task.data = data;
        return task;
      }

    })
    .catch(err => console.log(err.message));
};

/**
 * Makes a call to a specific API depending on the category of the given task
 * @async
 * @param   {{}} task The task from which to send the API request with
 * @return  {{}}      The original task + the data received from the API call
 */
const callAPIByCategory = async (task) => {
  const query = removeFirstWord(task.description);
  console.log("query", query);
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
};

/**
 * Gives a time limit to a promise
 * Given promise is rejected if not resolved before timeout
 * @param  {number}      ms      Length of ms before timeout
 * @param  {Promise<{}>} promise Promise to limit
 * @return {Promise<>}
 */
const timeoutPromise = (ms, promise) => {
  const timeout = new Promise((resolve, reject) =>
    setTimeout(() =>
      reject(`Timed out after ${ms} ms.`), ms));

  return Promise.race([
    promise,
    timeout
  ]);
};


/**
 * Matches string against key values to check for easy API match
 * @param  {string} string Takes in string to check for keyword
 * @return {string}        String of category matched, else undefined
 */
const matchCategoryKeyword = (string) => {
  let category;
  const categories = ['restaurants', 'films', 'books', 'products'];
  const keywords = ['eat', 'watch', 'read', 'buy'];

  for (let i in keywords) {
    if (string.trim().split(" ")[0].toLowerCase() === keywords[i]) {
      category = categories[i];
    }
  }
  console.log("Keyword matched. Category:", category);
  return category;
};

/**
 * Trim given string of matched keyword and whitespace from the start/end
 * @param  {string} string Takes in string to check for keyword
 * @return {string}        Altered string
 */
const removeFirstWord = (string) => {
  const splitTask = string.trim().split(" ");
  splitTask.shift();
  const filteredString = splitTask.join(" ");
  return filteredString;
};


