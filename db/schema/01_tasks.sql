DROP TABLE IF EXISTS tasks CASCADE;
DROP TABLE IF EXISTS restaurants CASCADE;
DROP TABLE IF EXISTS films CASCADE;
DROP TABLE IF EXISTS books CASCADE;
DROP TABLE IF EXISTS products CASCADE;

-- User schema commented out as login system not planned for implementation
CREATE TABLE tasks(
  id SERIAL PRIMARY KEY NOT NULL,
  -- user_id INT REFERENCES users(id) ON DELETE CASCADE,
  category VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  due_date DATE,
  complete BOOL DEFAULT FALSE NOT NULL,
);

CREATE TABLE restaurants(
  id SERIAL PRIMARY KEY NOT NULL,
  task_id INT REFERENCES tasks(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  cover_photo_url VARCHAR(255),
  more_info_url VARCHAR(255),
  rating SMALLINT DEFAULT 0,
  summary TEXT,
  phone_number VARCHAR(30),
  address VARCHAR(255),
  is_closed BOOL DEFAULT FALSE,
  price SMALLINT,
  hours VARCHAR(255) []
);

-- Films includes both movies and TV shows
CREATE TABLE films(
  id SERIAL PRIMARY KEY NOT NULL,
  task_id INT REFERENCES tasks(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
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
  cover_photo_url VARCHAR(255),
  more_info_url VARCHAR(255),
  rating SMALLINT DEFAULT 0,
  summary TEXT,
  genres VARCHAR(255) [],
  author VARCHAR(255)
);

CREATE TABLE products(
  id SERIAL PRIMARY KEY NOT NULL,
  task_id INT REFERENCES tasks(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  cover_photo_url VARCHAR(255),
  more_info_url VARCHAR(255),
  rating SMALLINT DEFAULT 0,
  price SMALLINT DEFAULT 0
);



-- CREATE TABLE categories(
--   id SERIAL PRIMARY KEY NOT NULL,
--   buy BOOL NOT NULL DEFAULT FALSE,
--   watch BOOL NOT NULL DEFAULT FALSE,
--   buy BOOL NOT NULL DEFAULT FALSE,
--   buy BOOL NOT NULL DEFAULT FALSE,
-- );
-- CREATE TABLE buy(
--   id SERIAL PRIMARY KEY NOT NULL,
--   task_id INT REFERENCES tasks(id) ON DELETE CASCADE,
--   title VARCHAR(255) NOT NULL,
--   details_url VARCHAR(255) NOT NULL,
--   price INT DEFAULT 0,
--   rating SMALLINT DEFAULT 0,
--   image_url VARCHAR(255),
-- );
