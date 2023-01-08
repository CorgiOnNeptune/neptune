/*
 * Functions that make async requests using routes to APIs for data
 */

/**
 * Makes a GET call to all available APIs
 * API calls are rejected if they don't resolve before the timeout
 * @param  {string} query Search query sent to APIs
 * @return {Promise<{}>}  Returns a promise to the APIs including the result
 *                        and desired data from each API
 */
const makeAPIRequests = query => {
  const encodedQuery = encodeURIComponent(query);
  console.log('encodedQuery ➡️ ', `${encodedQuery}`);

  /*
   * Amazon is commented out for now because of the request limit to the API
   */
  const requests = [
    timeoutPromise(5000, makeYelpRequest(encodedQuery)),
    timeoutPromise(5000, makeOMDBRequest(encodedQuery)),
    timeoutPromise(5000, makeTMDBRequest(encodedQuery)),
    timeoutPromise(5000, makeGBooksRequest(encodedQuery))
    // timeoutPromise(5000, makeAMZNRequest(encodedQuery))
  ];

  return Promise.allSettled(requests)
    .then(results => {
      console.log('↓ makeAPIRequests() results ↓')
      console.log(results);
      return results;
    })
    .catch(err => console.log(err.message));
};

/**
 * Makes a GET request to the OMDB API
 * @param  {string}      query URI encoded search query sent to API
 * @return {Promise<{}>}       Object with data from the API
 */
const makeOMDBRequest = query => {
  return $.get((`/api/omdb/${query}`))
    .fail(err => console.log(err.message));
};

/**
 * Makes a GET request to the TMDB API
 * @param  {string}      query URI encoded search query sent to API
 * @return {Promise<{}>}       Object with data from the API
 */
const makeTMDBRequest = query => {
  return $.get((`/api/tmdb/${query}`))
    .fail(err => console.log(err.message));
};

/**
 * Makes a GET request to the Google Books API
 * @param  {string}      query URI encoded search query sent to API
 * @return {Promise<{}>}       Object with data from the API
 */
const makeGBooksRequest = query => {
  return $.get((`/api/gbooks/${query}`))
    .fail(err => console.log(err.message));
};

/**
 * Makes a GET request to the Yelp API using location from IP API
 * @param  {string}      query URI encoded search query sent to API
 * @return {Promise<{}>}       Object with data from the API
 */
const makeYelpRequest = query => {
  return makeIPRequest()
    .then(location => {
      const latitude = location.latitude;
      const longitude = location.longitude;

      return $.get((`/api/yelp/${query}/${latitude}/${longitude}`))
        .fail(err => console.log(err.message));
    })
    .fail(err => console.log(err.message));
};

/**
 * Makes a GET request to the IP API to get user location
 * @return {Promise<{}>} Object with location data from the API
 */
const makeIPRequest = () => {
  return $.get((`/api/ipapi`))
    .fail(err => console.log(err.message));
};

/**
 * Makes a GET request to the Amazon Price API
 * @TODO Replace with an API that doesn't have a 150 request limit...
 * @param  {string}      query URI encoded search query sent to API
 * @return {Promise<{}>}       Object with data from the API
 */
const makeAMZNRequest = (query) => {
  return $.get((`/api/amazonprice/${query}`))
    .fail(err => console.log(err.message));
};
