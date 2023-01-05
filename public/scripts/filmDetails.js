/**
 * @param {{}} task the related
 */
const getTaskID = (task) => {};

/**
 * @param {{}} film takes in film object to parse data.
 */
const loadFilmTaskDetails = (film, task_id) => {
  return `
    <div class="poster-container"><img src="${
      film.cover_photo_url
    }" alt="" /></div>
    <div class="info">
      <div class="info-header">
        <div class="title">${film.title}</div>
        <div class="genres">
          ${getGenresHTML(film)}
        </div>
      </div>
      <div class="description">
        ${film.summary}
      </div>
      <div class="director">
        <div class="director-title">Director</div>
        <div class="director-name">${film.director}</div>
      </div>
      <div class="cast">
        <div class="cast-title">Cast</div>
        <div class="cast-names">${film.cast.join(', ')}</div>
      </div>
    </div>

    <div class="more">
      <div class="ratings">
        <div class="IMDB-rating">
          <img src="images/IMDB-logo.png" alt="" />
          <span>${film.imdb_rating}</span>
        </div>
        <div class="RT-rating">
          <img src="images/RT-logo.png" alt="" />
          <span>${film.rt_rating}</span>
        </div>
        <div class="MC-rating">
          <img src="images/metacritic-logo.png" alt="" />
          <span>${film.mc_rating}</span>
        </div>
        <div class="Meta-rating"></div>
      </div>

      <div class="streaming-guide">
        <div class="streaming">Streaming Guide</div>
        <a href="${getJustWatchURL(film)}">
          <img src="images/just-watch-logo.png" alt="justwatch" />
        </a>
        `;
};
