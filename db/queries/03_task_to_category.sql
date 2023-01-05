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
VALUES(
    5,
    'Suspiria',
    '2000-01-01',
    'poster.png',
    'suspiria.movie',
    '4.8',
    'big spooky color witch lady ',
    ARRAY ['Sci-FI', 'Horror'],
    'hahah.png'
  )
RETURNING *;
