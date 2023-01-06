const makeAPIRequests = (query) => {
  const encodedQuery = encodeURIComponent(query);
  console.log('encodedQuery ➡️ ', `${encodedQuery}`);

  const requests = [
    yelpRequest(encodedQuery),
    omdbRequest(encodedQuery),
    gBooksRequest(encodedQuery)
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

const omdbRequest = (query) => {
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

const gBooksRequest = (query) => {
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



const yelpRequest = (query) => {
  return $.get((`/api/ipapi/`))
    .then(location => {
      // console.log('in IP Request');
      // console.log(location);

      const latitude = location.latitude;
      const longitude = location.longitude;

      return $.get((`/api/yelp/${query}/${latitude}/${longitude}`))
        .then((data) => {
          console.log('in yelpRequest');
          console.log(data);

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



// const amznRequest = (query) => {
//   return $.get((`/api/amazonprice/${query}`))
//     .then((data) => {

//     })
//     .fail((err) => {
//       console.log(err.message);
//     });
// }
