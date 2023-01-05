/**
 * Takes in film object to return HTML elements for genres
 * @param {{}} film
 */
const getGenresHTML = (film) => {
  const genres = film.genres;

  genres.foreach((genre) => {
    return `  <span class="genre">${genre}</span>`;
  });
};

/**
 * Takes in film object to return JustWatch URL
 * @param {{}} film
 */
const getJustWatchURL = (film) => {
  const regex = /[^A-Za-z0-9 \w]/g;
  const filmTitle = film.title.replace(regex, '');
  const titleArr = filmTitle.split(' ');
  const urlTitle = titleArr.join('-');

  return `https://www.justwatch.com/ca/movie/${urlTitle}`;
};
