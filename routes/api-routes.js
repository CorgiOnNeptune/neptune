/*
 * All routes for api requests are defined here.
 * This file is loaded in server.js into /api,
 * so these routes are mounted onto /api.
 */

require('dotenv').config();
const express = require('express');
const axios = require('axios');
const router = express.Router();


router.get('/omdb/:query', (req, res, next) => {
  const query = req.params.query;
  const apiKey = process.env.OMDB_API_KEY;

  axios.get(`https://www.omdbapi.com/?apikey=${apiKey}&t=${query}`)
    .then(data => {
      console.log('OMDB Request Complete');
      // console.log(data);
      if (!data.data.Error) {
        res.send(data.data);
      }
    })
    .catch(err => next(err));
});


router.get('/gbooks/:query', (req, res, next) => {
  const query = req.params.query;

  axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}+filter=full+startIndex=0+maxResults=5`)
    .then(data => {
      console.log('GBooks Request Complete');
      console.log(data);
      if (data.data.totalItems > 0) {
        res.send(data.data.items['0']);
      }
    })
    .catch(err => next(err));
});





// router.get('/yelp/:query', (req, res, next) => {
//   const query = req.params.query;
//   const apiKey = process.env.YELP_API_KEY;

//   axios.get(`http://`)
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => next(err));
// });






// router.get('/amazonprice/:query', (req, res, next) => {
//   const query = req.params.query;
//   const apiKey = process.env.AMZNPRICE_API_KEY;

//   axios.get(`http://`)
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => next(err));
// });



module.exports = router;
