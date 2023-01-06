INSERT INTO films(
    task_id,
    Title,
    Year,
    Poster,
    Ratings,
    Plot,
    Genre,
    Director,
    Actors
  )
VALUES(
    5,
    'Arrival',
    '2016',
    'https://m.media-amazon.com/images/M/MV5BMTExMzU0ODcxNDheQTJeQWpwZ15BbWU4MDE1OTI4MzAy._V1_SX300.jpg',
    ARRAY ['7.9/10',
    '95%',
    '81/100'
    ],
    'A linguist works with the military to communicate with alien lifeforms after twelve mysterious spacecraft appear around the world.',
    'Drama, Mystery, Sci-Fi',
    'Denis Villeneuve',
    'Amy Adams, Jeremy Renner, Forest Whitaker'
  )
RETURNING *;
