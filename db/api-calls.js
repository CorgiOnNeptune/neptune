const { wordInString } = require('./db-helpers');

const determineCategory = (task) => {
  const keywords = ['Eat', 'Watch', 'Read', 'Buy'];

  keywords.forEach((val) => {
    if (wordInString(task.description, val)) {

    }
  })

};

const makeAPIRequest = (request) => {

};


const apiRequests = () => {

};


const omdbRequest = (apiKey, query) => {
  $.get(`http://www.omdbapi.com/?apikey=${apiKey}&t=${query}`, () => {

  });
};

module.exports = {
  determineCategory
}
