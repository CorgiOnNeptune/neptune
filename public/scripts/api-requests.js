const makeAPIRequests = (query) => {


};

const omdbRequest = (query) => {
  $.get((`/api/omdb/${query}`))
    .then((data) => {

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
