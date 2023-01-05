// AJAX GET tasks from '/tasks'
const loadTasks = () => {
  $.get('/tasks')
    .then((data) => {
      console.log(data.tasks);
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
    const $details = getTaskDetails(task);

    $('.task-details').append($details);
    $taskContainer.prepend($task);
  }
};

const getTaskDetails = (task) => {
  $.get(`/tasks/${task.category}`)
    .then((data) => {
      console.log(data.tasks);
      data.tasks.forEach((val) => {
        if (val.task_id === task.id) {
          return data;
        }
      });
    })
    .then((data) => {
      switch (task.category) {
        // case 'restaurants':
        // case 'books':
        case 'films':
          return loadFilmTaskDetails(task.id);
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
