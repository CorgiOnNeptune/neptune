/*
 * Client-side JS logic
 */

$(() => {

  $('.new-task-form').on('submit', function (event) {
    event.preventDefault();
    submitNewTask(this);
  });

});
