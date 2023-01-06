const makeAPIRequests = (query) => {
  const encodedQuery = encodeURIComponent(query);
  console.log('encodedQuery ➡️ ', `${encodedQuery}`);

  const categories = ['films'];
  const requests = [omdbRequest(encodedQuery)];

  Promise.any(requests)
    .then((data) => {
      console.log('data in promise');
      console.log(data);
      console.log('in the promise');

      return 'films';
      // return categories[0];
    })
    .catch((err) => {
      console.log(err.message);
    });


  // Promise.any(requests.map((res, index) => {
  //   res.then(v => [v, index])
  // }))
  //   .then((data, index) => {
  //     console.log(data);
  //     return categories[index];
  //   })
  //   .catch((err) => {
  //     console.log(err.message);
  //   });

};

const omdbRequest = (query) => {
  $.get((`/api/omdb/${query}`))
    .then((data) => {
      // console.log('data.status ➡️ ', `${data.status}`);
      // if (data.status === 200) {
      //   return true;
      // }
      return data;
    })
    .fail((err) => {
      console.log(err.message);
    });
}











// const yelpRequest = (query) => {
//   $.get((`/api/yelp/${query}`))
//     .then((data) => {

//     })
//     .fail((err) => {
//       console.log(err.message);
//     });
// }

// const gbooksRequest = (query) => {
//   $.get((`/api/gbooks/${query}`))
//     .then((data) => {

//     })
//     .fail((err) => {
//       console.log(err.message);
//     });
// }

// const amznRequest = (query) => {
//   $.get((`/api/amazonprice/${query}`))
//     .then((data) => {

//     })
//     .fail((err) => {
//       console.log(err.message);
//     });
// }
