/* global determineCategory callAPIByCategory */

const renderTasks = (tasks) => {
  for (let task of tasks) {
    const $task = createTaskElement(task);
    $('#tasks-ul').prepend($task);
  }
};

const loadTasks = (category) => {
  let url = '/tasks';

  if (category) {
    url += `/${category}`;
  }

  $.get(url)
    .then((tasks) => {
      renderTasks(tasks.tasks);
      // re-register the click events
      completeStatusAnimation();
      addEditorEvents();
      setDefaultDate();
      setDefaultValue();
      renderDetails(category);
    })
    .catch((err) => console.log(err.message));
};

const submitNewTask = async (element) => {
  const $form = $(element);
  const formArray = $form.serializeArray();

  let task = {
    description: formArray[0].value,
    category: formArray[1].value,
    due_date: formArray[2].value,
    data: {},
  };

  if (!task.category || task.category === 'auto') {
    task = await determineCategory(task);
  } else {
    console.log('Selected category:', task.category);
    task = await callAPIByCategory(task);
  }

  $.post('/tasks', task)
    .then(() => {
      $('#tasks-ul').empty();
      loadTasks('incomplete');
      $form[0].reset();
      closeEditor($('.editor'));
    })
    .fail((err) => console.log(err.message));
};

const editTaskStatus = (task) => {
  $.post(`/tasks/${task.id}/status`, { ...task })
    .then(() => console.log(`Status changed: ${task.id}: ${task.status}`))
    .catch((err) => console.log(err.message));
};

const deleteTask = (taskID) => {
  $.post(`/tasks/${taskID}/delete`, { id: taskID })
    .then(() => console.log('Task deleted successfully'))
    .catch((err) => console.log(err.message));
};

const loadScript = (fileName) => {
  return $('body').append(`<script src="./scripts/${fileName}.js"></script>`);
};
