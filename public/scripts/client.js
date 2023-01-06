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
    // const taskID = $(this).attr('data-value');
    const taskID = $(this).closest('li').attr('id').slice(8);
    editTask(this, taskID);
  });


  $('.delete-btn').on('click', function (event) {
    event.preventDefault();
    const taskID = $(this).closest('li').attr('id').slice(8);
    deleteTask(taskID);
  });

  loadTasks("incomplete");

  loadTasksByCategory();
});
