const makeAPIRequests = (query) => {
  const encodedQuery = encodeURIComponent(query);
  console.log('encodedQuery ➡️ ', `${encodedQuery}`);

  const timeoutPromise = (ms, promise) => {
    const timeout = new Promise((resolve, reject) =>
      setTimeout(
        () => reject(`Timed out after ${ms} ms.`),
        ms));
    return Promise.race([
      promise,
      timeout
    ]);
  };

  // Amazon is commented for now because of the request limit
  // lmao
  const requests = [
    timeoutPromise(5000, makeYelpRequest(encodedQuery)),
    timeoutPromise(5000, makeOMDBRequest(encodedQuery)),
    timeoutPromise(5000, makeTMDBRequest(encodedQuery)),
    timeoutPromise(5000, makeGBooksRequest(encodedQuery))
    // makeAMZNRequest(encodedQuery)
  ];

  return Promise.allSettled(requests)
    .then((results) => {
      // console.log('data in promise');
      console.log(results);
      // console.log('in the promise');

      return results;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

const makeOMDBRequest = (query) => {
  return $.get((`/api/omdb/${query}`))
    .then((data) => {
      // console.log('in omdbRequest');
      // console.log(data);

      return data;
    })
    .fail((err) => {
      console.log(err.message);
    });
}

const makeTMDBRequest = (query) => {
  return $.get((`/api/tmdb/${query}`))
    .then((data) => {
      // console.log('in omdbRequest');
      // console.log(data);
      console.log("TMDB request successful");

      return data;
    })
    .fail((err) => {
      console.log(err.message);
    });
}

const makeGBooksRequest = (query) => {
  return $.get((`/api/gbooks/${query}`))
    .then((data) => {
      // console.log('in gBooksRequest');
      // console.log(data);

      return data;
    })
    .fail((err) => {
      console.log(err.message);
    });
}


const makeYelpRequest = (query) => {
  return $.get((`/api/ipapi/`))
    .then(location => {
      // console.log('in IP Request');
      // console.log(location);

      const latitude = location.latitude;
      const longitude = location.longitude;

      return $.get((`/api/yelp/${query}/${latitude}/${longitude}`))
        .then((data) => {
          // console.log('in yelpRequest');
          // console.log(data);

          return data;
        })
        .fail((err) => {
          console.log(err.message);
        })
    })
    .fail((err) => {
      console.log(err.message);
    });
}



const makeAMZNRequest = (query) => {
  return $.get((`/api/amazonprice/${query}`))
    .then((data) => {
      // console.log('in amazonReq');
      // console.log(data);

      return data;
    })
    .fail((err) => {
      console.log(err.message);
    });
}
