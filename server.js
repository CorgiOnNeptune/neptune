// load .env data into process.env
require('dotenv').config();

// Web server config
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');
const cookieSession = require('cookie-session');

const app = express();
const PORT = process.env.PORT || 8080;

app.set('view engine', 'ejs');

// Middleware
// Load the logger first so all (static) HTTP requests are logged to STDOUT
// The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  '/styles',
  sassMiddleware({
    source: __dirname + '/styles',
    destination: __dirname + '/public/styles',
    isSass: false, // false => scss, true => sass
  })
);
app.use(express.static('public'));
app.use(
  cookieSession({
    name: 'session',
    keys: ['key1'],
  })
);

// Separated Routes for each Resource
const loginRoutes = require('./routes/login');
const logoutRoutes = require('./routes/logout');
const tasksRoutes = require('./routes/tasks');

const apiRoutes = require('./routes/api-routes');

// Mount all resource routes
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use('/login', loginRoutes);
app.use('/logout', logoutRoutes);
app.use('/tasks', tasksRoutes);

app.use('/api', apiRoutes);

// Home page
app.get('/', (req, res) => {
  res.render('index');
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
