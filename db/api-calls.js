const { matchCategoryKeyword } = require('./db-helpers');

const determineCategory = (task) => {
  let category = matchCategoryKeyword(task.description) || undefined;
  if (category) {
    return category;
  }





};

console.log(determineCategory({ description: 'Gremlins' }));

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
