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

router.get('/tmdb/:query', (req, res, next) => {
  const query = req.params.query;
  const apiKey = process.env.TMDB_API_KEY;

  axios.get(`https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query=${query}`)
    .then(data => {
      console.log('TMDB Request Complete');
      // console.log(data);
      if (!data.data.Error) {
        res.send(data.data);
      }
    })
    .catch(err => next(err));
});


router.get('/gbooks/:query', (req, res, next) => {
  const query = req.params.query;

  axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}+intitle:${query}`)
    .then(data => {
      console.log('GBooks Request Complete');
      // console.log(data);
      if (data.data.totalItems > 0) {
        res.send(data.data.items['0'].volumeInfo);
      }
    })
    .catch(err => next(err));
});


router.get('/yelp/:query/:latitude/:longitude', (req, res, next) => {
  const query = req.params.query;
  const apiKey = process.env.YELP_API_KEY;
  // Would use req.ip if this was a live product.
  const userIP = '50.99.179.236';

  const options = {
    method: 'GET',
    url: `https://api.yelp.com/v3/businesses/search?latitude=${req.params.latitude}&longitude=${req.params.longitude}&term=${req.params.query}&sort_by=best_match&limit=5`,
    headers: {
      accept: 'application/json',
      Authorization: apiKey
    }
  };

  axios.request(options)
    .then(data => {
      console.log('Yelp Request Complete');
      // console.log(data);

      if (data.data.total > 0) {
        res.send(data.data.businesses['0']);
      }
    })
    .catch(err => next(err));
});


router.get('/ipapi', (req, res, next) => {
  const query = req.params.query;
  const userIP = '50.99.179.236';
  const info = { query, latitude: '', longitude: '' }

  axios.get(`https://ipapi.co/${userIP}/json/`)
    .then(data => {
      console.log('IP Request Complete');
      // console.log(data)

      info.latitude = data.data.latitude;
      info.longitude = data.data.longitude;

      res.send(info);
    })
    .catch(err => {
      console.log(err.message);
    })
});


router.get('/amazonprice/:query', (req, res, next) => {
  const query = req.params.query;
  const apiKey = process.env.AMZNPRICE_API_KEY;

  const options = {
    method: 'GET',
    url: 'https://amazon-price1.p.rapidapi.com/search',
    params: {
      marketplace: 'CA', keywords: query
    },
    headers: {
      'X-RapidAPI-Key': apiKey,
      'X-RapidAPI-Host': 'amazon-price1.p.rapidapi.com'
    }
  };

  axios.request(options)
    .then(data => {
      console.log('Amazon Price Request Complete');
      // console.log(data);

      if (data.data.length) {
        res.send(data.data[0]);
      }
    })
    .catch(err => next(err));
});



module.exports = router;
