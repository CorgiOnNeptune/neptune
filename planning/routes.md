# Routes For Smart Todo

## Tasks

| **HTTP Method** |     **URL**     |              **Use**              |
| :-------------: | :-------------: | :-------------------------------: |
|       GET       |   / && /tasks   |          Show all tasks           |
|       GET       |   /tasks/new    | Display form to create a new task |
|      POST       |     /tasks      |          Create new task          |
|       GET       | /tasks/:id/edit |    Display form to edit a task    |
|       PUT       |   /tasks/:id    |        Submit edit to task        |
|     DELETE      |   /tasks/:id    |           Deletes task            |

&nbsp;
Get following views via database queries:

- GET /tasks/restaurants
- GET /tasks/films
- GET /tasks/books
- GET /tasks/products
- GET /tasks/other
- GET /tasks/completed

&nbsp;

## Users

| **HTTP Method** |  **URL**   | **Use**  |
| :-------------: | :--------: | :------: |
|      POST       | /login/:id | Logs in  |
|      POST       |  /logout   | Logs out |
