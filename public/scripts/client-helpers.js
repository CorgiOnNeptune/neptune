// AJAX GET tasks from '/tasks'
const loadTasks = () => {
  $.get('/tasks')
    .then((data) => {
      // console.log(data.tasks);
      renderTasks(data.tasks);
    })
    .fail((err) => {
      console.log(err.message);
    });
};

const renderTasks = (tasks) => {
  const $taskContainer = $('#tasks-container');

  $taskContainer.empty();

  for (const task of tasks) {
    console.log(task);

    const $task = createTaskElement(task);
    // const $details = getTaskDetails(task);

    // $('.task-details').append($details);
    $taskContainer.append($task);
  }
};

const getTaskDetails = (taskInfo) => {
  console.log(taskInfo.category);

  $.get(`/tasks/${taskInfo.category}`)
    .then((data) => {
      if (data.tasks[0].task_id === taskInfo.id) {
        console.log(data);
        return data;
      }
    })
    .then((data2) => {
      const categoryData = data2.tasks[0];
      switch (categoryData.category) {
        // case 'restaurants':
        // case 'books':
        case 'films':
          console.log(categoryData);
          return loadFilmTaskDetails(categoryData);
          break;
        // case 'products':
        // case 'others':
        default:
          return null;
      }
    })
    .fail((err) => {
      console.log(err.message);
    });
};
