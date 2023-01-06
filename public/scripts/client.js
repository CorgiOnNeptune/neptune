/*
 * Client-side JS logic
 */

$(() => {
  $('.new-task-form').on('submit', function (event) {
    event.preventDefault();
    submitNewTask(this);
  });

  $('.edit-button').on('submit', function (event) {
    event.preventDefault();
    const taskID = $(this).attr('data-value');
    console.log('taskID ➡️ ', `${taskID}`);
    editTask(this, taskID);
  });


  loadTasks("incomplete");

  loadTasksByCategory();
});
