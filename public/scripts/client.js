/*
 * Client-side JS logic
 */

$(() => {
  $('.new-task-form').on('submit', function (event) {
    event.preventDefault();
    submitNewTask(this);
  });

  $('.edit-task-form').on('submit', function (event) {
    event.preventDefault();
    editTask(this);
  });


  loadTasks("incomplete");

  loadTasksByCategory();
});
