const determineCategory = (task) => {
  if (task.category && task.category !== 'auto') {
    return task.category;
  }

  let newCategory = matchCategoryKeyword(task.description) || undefined;
  if (newCategory) {
    return newCategory;
  }

  // makeAPIRequests(task.description)
  //   .then((query) => {
  //     omdbRequest(query)
  //   })
  //   .catch((err) => {
  //     console.log(err.message);
  //   })

};

const makeAPIRequests = (query) => {
  return new Promise((resolve, reject) => {
    if (query) {
      resolve('Stuff worked!');
    }
    if (!query) {
      reject(Error('Failed query :('));
    }
  });
};

// const omdbRequest = (query) => {
//   const apiKey = process.env.OMDB_API_KEY;

//   $.get(`http://www.omdbapi.com/?apikey=${apiKey}&t=${query}`, (data) => {
//     return data;
//   });
// };

console.log(determineCategory({ description: 'Watch Gremlins' }));
