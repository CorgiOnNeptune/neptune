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
  title VARCHAR(255) NOT NULL,
  cover_photo_url VARCHAR(255),
  more_info_url VARCHAR(255),
  rating SMALLINT DEFAULT 0,
  phone_number VARCHAR(30),
  address VARCHAR(255) [],
  cuisine_type VARCHAR(255),
  is_closed BOOL DEFAULT FALSE
);

-- Films includes both movies and TV shows
CREATE TABLE films(
  id SERIAL PRIMARY KEY NOT NULL,
  task_id INT REFERENCES tasks(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  release_date DATE,
  cover_photo_url VARCHAR(255),
  more_info_url VARCHAR(255),
  rating SMALLINT DEFAULT 0,
  summary TEXT,
  genres VARCHAR(255) [],
  backdrop_photo_url VARCHAR(255)
);

CREATE TABLE books(
  id SERIAL PRIMARY KEY NOT NULL,
  task_id INT REFERENCES tasks(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(255),
  release_date DATE,
  cover_photo_url VARCHAR(255),
  more_info_url VARCHAR(255),
  rating SMALLINT DEFAULT 0,
  summary TEXT,
  genres VARCHAR(255) []
);

CREATE TABLE products(
  id SERIAL PRIMARY KEY NOT NULL,
  task_id INT REFERENCES tasks(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  cover_photo_url VARCHAR(255),
  more_info_url VARCHAR(255),
  rating SMALLINT DEFAULT 0,
  price VARCHAR(255)
);
