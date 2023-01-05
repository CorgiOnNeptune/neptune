const apiRequests = () => {

};


const omdbRequest = (apiKey, query) => {
  $.get(`http://www.omdbapi.com/?apikey=${apiKey}&t=${query}`, () => {

  });
};
