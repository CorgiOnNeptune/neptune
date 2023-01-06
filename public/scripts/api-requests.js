const makeAPIRequests = (query) => {
  const encodedQuery = encodeURIComponent(query);
  console.log('encodedQuery ➡️ ', `${encodedQuery}`);

  // Amazon is commented for now because of the request limit
  // lmao
  const requests = [
    makeYelpRequest(encodedQuery),
    makeOMDBRequest(encodedQuery),
    makeGBooksRequest(encodedQuery)
    // makeAMZNRequest(encodedQuery)
  ];

  return Promise.any(requests)
    .then((data) => {
      console.log('data in promise');
      console.log(data);
      console.log('in the promise');

      return data;
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
