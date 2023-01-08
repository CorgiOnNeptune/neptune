/*
 * All routes for api requests are defined here.
 * This file is loaded in server.js into /api,
 * so these routes are mounted onto /api.
 */

require('dotenv').config();
const express = require('express');
let axios = require('axios');
const router = express.Router();

/*
 * Proxy settings: uncomment if you need to run axios with proxy
 */
// const HttpsProxyAgent = require("https-proxy-agent");
// const host = process.env.HTTPS_HOST;
// const port = process.env.HTTPS_PORT;
// const httpsAgent = new HttpsProxyAgent({host: `${host}`, port: `${port}`});
// axios = axios.create({httpsAgent});

// Get request to the OMDB API using local API key
router.get('/omdb/:query', (req, res, next) => {
  const query = req.params.query;
  const apiKey = process.env.OMDB_API_KEY;

  axios.get(`https://www.omdbapi.com/?apikey=${apiKey}&t=${query}`)
    .then(data => {
      console.log('OMDB Request Complete');

      if (!data.data.Error) {
        res.send(data.data);
      }
    })
    .catch(err => next(err));
});

// Get request to the TMDB API using local API key
router.get('/tmdb/:query', (req, res, next) => {
  const query = req.params.query;
  const apiKey = process.env.TMDB_API_KEY;

  axios.get(`https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query=${query}`)
    .then(data => {
      console.log('TMDB Request Complete');

      if (!data.data.Error) {
        res.send(data.data);
      }
    })
    .catch(err => next(err));
});

// Get request to the Google Books API
router.get('/gbooks/:query', (req, res, next) => {
  const query = req.params.query;

  axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}+intitle:${query}`)
    .then(data => {
      console.log('GBooks Request Complete');

      if (data.data.totalItems > 0) {
        res.send(data.data.items['0'].volumeInfo);
      }
    })
    .catch(err => next(err));
});

// Get request to the Yelp API using local API key
router.get('/yelp/:query/:latitude/:longitude', (req, res, next) => {
  const query = req.params.query;
  const apiKey = process.env.YELP_API_KEY;

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

      if (data.data.total > 0) {
        res.send(data.data.businesses['0']);
      }
    })
    .catch(err => next(err));
});

// Get request to the IP API using user IP
// Use req.ip if this was ever a live product
router.get('/ipapi', (req, res, next) => {
  const userIP = '50.99.179.236';
  const location = { latitude: '', longitude: '' }

  axios.get(`https://ipapi.co/${userIP}/json/`)
    .then(data => {
      console.log('IP Request Complete');

      location.latitude = data.data.latitude;
      location.longitude = data.data.longitude;

      res.send(location);
    })
    .catch(err => next(err));
});

// Get request to the Amazon Price API using local API key
// TODO: Replace with a fully free API that doesn't have a request limit
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

      if (data.data.length) {
        res.send(data.data[0]);
      }
    })
    .catch(err => next(err));
});


module.exports = router;
