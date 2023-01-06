const makeAPIRequests = (query) => {
  const encodedQuery = encodeURIComponent(query);
  console.log('encodedQuery ➡️ ', `${encodedQuery}`);

  // TODO: Adjust priority as GBooks always pulls back lots of results;
  const requests = [
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










// const yelpRequest = (query) => {
//   return $.get((`/api/yelp/${query}`))
//     .then((data) => {

//     })
//     .fail((err) => {
//       console.log(err.message);
//     });
// }


// const amznRequest = (query) => {
//   return $.get((`/api/amazonprice/${query}`))
//     .then((data) => {

//     })
//     .fail((err) => {
//       console.log(err.message);
//     });
// }
