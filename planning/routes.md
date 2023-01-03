# Routes For Smart Todo

## Tasks

| **HTTP Method** |     **URL**     |              **Use**              |
| :-------------: | :-------------: | :-------------------------------: |
|       GET       |   / && /tasks   |          Show all tasks           |
|       GET       |   /tasks/new    | Display form to create a new task |
|      POST       |     /tasks      |          Create new task          |
|       GET       | /tasks/:id/edit |    Display form to edit a task    |
|       PUT       |    /tasks:id    |        Submit edit to task        |
|     DELETE      |    /tasks:id    |           Deletes task            |

&nbsp;
Get following views via queries:

- GET /tasks/eat
- GET /tasks/watch
- GET /tasks/read
- GET /tasks/buy
- GET /tasks/other
- GET /tasks/completed

&nbsp;

## Users

| **HTTP Method** |  **URL**  | **Use**  |
| :-------------: | :-------: | :------: |
|      POST       | /login:id | Logs in  |
|      POST       |  /logout  | Logs out |
