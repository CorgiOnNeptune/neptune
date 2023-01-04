SELECT tasks.id,
  tasks.category,
  tasks.description AS task_name,
  tasks.due_date,
  tasks.complete,
  restaurants.*
FROM tasks
  JOIN restaurants ON task_id = tasks.id
WHERE tasks.complete = FALSE
  AND tasks.category = 'restaurants'
  AND tasks.user_id = 1
ORDER BY tasks.due_date ASC;
