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

  axios.get(`http://www.omdbapi.com/?apikey=${apiKey}&t=${query}`)
    .then(data => {
      console.log('OMDB Request Complete');
      console.log(data.status);
      return data;
    })
    .catch(err => next(err));
});

// router.get('/yelp/:query', (req, res, next) => {
//   const query = req.params.query;
//   const apiKey = process.env.YELP_API_KEY;

//   axios.get(`http://`)
//     .then(data => res.json(data))
//     .catch(err => next(err));
// });

// router.get('/gbooks/:query', (req, res, next) => {
//   const query = req.params.query;
//   const apiKey = process.env.AMZNPRICE_API_KEY;

//   axios.get(`http://`)
//     .then(data => res.json(data))
//     .catch(err => next(err));
// });

// router.get('/amazonprice/:query', (req, res, next) => {
//   const query = req.params.query;
//   const apiKey = process.env.AMZNPRICE_API_KEY;

//   axios.get(`http://`)
//     .then(data => res.json(data))
//     .catch(err => next(err));
// });

module.exports = router;
