INSERT INTO tasks(category, description, due_date, complete)
VALUES (
    "restaurants",
    "Eat at Shimizu",
    "2023-01-06",
    FALSE
  ),
  (
    "films",
    "Watch The Shining",
    "2023-01-06",
    FALSE
  ),
  (
    "books",
    "Read The Catcher in the Rye",
    "2023-01-06",
    FALSE
  ),
  (
    "products",
    "Buy cat food",
    "2023-01-06",
    FALSE
  );

INSERT INTO restaurants(
    task_id,
    title,
    cover_photo_url,
    more_info_url,
    rating,
    phone_number,
    address,
    cuisine_type,
    is_closed
  )
VALUES (
    1,
    "Shimizu",
    "https://placekitten.com/200/300",
    "https://www.yelp.ca/biz/shimizu-kitchen-calgary",
    4.5,
    "+1 403-455-3380",
    [
      "1918 37 Street SW",
      "Calgary, AB T3E 3A3",
      "Canada"
    ],
    "Ramen",
    FALSE
  );

INSERT INTO films(
    task_id,
    title,
    release_date,
    cover_photo_url,
    more_info_url,
    rating,
    summary,
    genres,
    backdrop_photo_url
  )
VALUES (
    2,
    "The Shining",
    "1980-05-23",
    "https://placekitten.com/200/300",
    "https://www.themoviedb.org/movie/694-the-shining?language=en-CA",
    8.2,
    "Jack Torrance accepts a caretaker job at the Overlook Hotel, WHERE he, along WITH his wife Wendy AND their son Danny, must live isolated FROM the rest of the world FOR the winter. But they aren't prepared for the madness that lurks within.",
    [
      "Horror",
      "Thriller"
    ],
    "https://placekitten.com/800/350"
  );

INSERT INTO books(
    task_id,
    title,
    author,
    release_date,
    cover_photo_url,
    more_info_url,
    rating,
    summary,
    genres,
  )
VALUES (
    3,
    "The Catcher in the Rye",
    "Jerome David Salinger",
    "1951-07-16",
    "https://placekitten.com/200/300",
    "https://books.google.ca/books/about/The_Catcher_in_the_Rye.html?id=j--EMdEfmbkC&",
    4,
    "Story of Holden Caulfield WITH his idiosyncrasies, penetrating insight, confusion, sensitivity AND negativism. The hero - narrator of 'The Catcher in the Rye' IS an ancient child of sixteen, a native New Yorker named Holden Caulfield.Through circumstances that tend TO preclude adult, secondhand description, he leaves his prep school IN Pennsylvania AND goes underground IN New York City FOR three days.The boy himself IS at once too simple AND too complex FOR us TO make any final COMMENT about him OR his story",
    [
      "Fiction",
      "Classics"
    ]
  );

INSERT INTO products(
    task_id,
    title,
    cover_photo_url,
    more_info_url,
    rating,
    price,
  )
VALUES (
    4,
    "Purina ® Friskies ® Ocean Delights Cat Food Variety Pack 24 - 156g Cans",
    "https://placekitten.com/200/300",
    "https://www.amazon.ca/dp/B079NHK95Y",
    4.6,
    "$18.97"
  );
