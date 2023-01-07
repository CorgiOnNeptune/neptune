DROP TABLE IF EXISTS tasks CASCADE;
DROP TABLE IF EXISTS restaurants CASCADE;
DROP TABLE IF EXISTS films CASCADE;
DROP TABLE IF EXISTS books CASCADE;
DROP TABLE IF EXISTS products CASCADE;
--
-- `npm run db:reset to initialize locally`
--
CREATE TABLE tasks(
id SERIAL PRIMARY KEY NOT NULL,
user_id INT REFERENCES users(id) ON DELETE CASCADE,
category VARCHAR(255) NOT NULL,
description VARCHAR(255) NOT NULL,
due_date DATE,
complete BOOL DEFAULT FALSE NOT NULL
);

CREATE TABLE restaurants(
  id SERIAL PRIMARY KEY NOT NULL,
  task_id INT REFERENCES tasks(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  image_url VARCHAR(255),
  url VARCHAR(255),
  rating VARCHAR(255),
  display_phone VARCHAR(30),
  location VARCHAR(255) [],
  categories VARCHAR(255) [],
  is_closed BOOL DEFAULT FALSE
);

-- Films includes both movies and TV shows
CREATE TABLE films(
  id SERIAL PRIMARY KEY NOT NULL,
  task_id INT REFERENCES tasks(id) ON DELETE CASCADE,
  Title VARCHAR(255) NOT NULL,
  Year VARCHAR(255),
  Poster VARCHAR(255),
  Ratings VARCHAR(255) [],
  Plot TEXT,
  Genre VARCHAR(255),
  Director VARCHAR(255),
  Writer VARCHAR(255),
  Actors VARCHAR(255),
  imdbRating VARCHAR(255),
  tmdb_rating VARCHAR(255),
  type VARCHAR(255)
);

CREATE TABLE books(
  id SERIAL PRIMARY KEY NOT NULL,
  task_id INT REFERENCES tasks(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(255),
  publishedDate DATE,
  thumbnail VARCHAR(255),
  previewLink VARCHAR(255),
  description TEXT,
  categories VARCHAR(255) []
);

CREATE TABLE products(
  id SERIAL PRIMARY KEY NOT NULL,
  task_id INT REFERENCES tasks(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  imageUrl VARCHAR(255),
  detailPageURL VARCHAR(255),
  rating VARCHAR(255),
  price VARCHAR(255)
);
