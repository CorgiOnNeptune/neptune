INSERT INTO tasks(user_id, category, description, due_date)
VALUES(1, 'films', 'Watch Suspiria', '2023-01-08')
RETURNING *;
