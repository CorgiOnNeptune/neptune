# Neptune

Created by [Likai Liu](https://github.com/Likai-L), [Justin Bennett](https://github.com/CorgiOnNeptune).

Neptune is a "smart" activity list that auto-categorizes user-inputted tasks and returns information based on API calls. Neptune is a single-page app built in Node with Express and Axios supporting the back-end, jQuery/Ajax w/ SASS CSS to build the front-end and PostgreSQL to handle the local database.

When given input to assess, Neptune makes calls to multiple APIs to gather data and decide which API is appropriate. It will then categorize the task by the type of activity based on the API results and also grab additional information that is put into an informational card that can be toggled open or closed.

---

## Tech Stack
- Nodejs
- jQuery
- Axios
- Sass
- PostgreSQL

---

## Product Demo

![default page view](https://github.com/CorgiOnNeptune/neptune/blob/master/docs/main-screen.png?raw=true)

![API search for task](https://github.com/CorgiOnNeptune/neptune/blob/master/docs/create-task.gif?raw=true)

&nbsp;

![card dropdown](https://github.com/CorgiOnNeptune/neptune/blob/master/docs/card-dropdown.gif?raw=true)

![completed task button](https://github.com/CorgiOnNeptune/neptune/blob/master/docs/complete-task-button.gif?raw=true)

![movie card](https://github.com/CorgiOnNeptune/neptune/blob/master/docs/movie-card.png?raw=true)


&nbsp;

---

## Getting Started

1. Clone the repo
2. Install all [dependencies](#dependencies-and-tech-stack) using the `npm install` command.
3. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
4. Update the .env file with your relevant local information.
5. Install dependencies: `npm i`
6. Reset database: `npm run db:reset`
7. Run the server: `npm run start`
8. Visit `http://localhost:8080/`


## Dependencies

- Node 10.x or above
- NPM 5.x or above
- PG 6.x
- [Yelp API Key](https://docs.developer.yelp.com/docs/fusion-authentication)
- [TMDB API Key](https://developers.themoviedb.org/3/getting-started/introduction)
- [OMDB API Key](https://www.omdbapi.com/apikey.aspx)
