/*
 * Client-side JS logic
 */

/* global submitNewTask deleteTask loadTasks loadTasksByCategory */

$(() => {
  loadScript('component-helpers');
  loadScript('editor-events');
  loadScript('createTaskElement');
  loadScript('renderDetails');
  loadScript('api-helpers');
  loadScript('api-requests');

  $('.new-task-form').on('submit', function (event) {
    event.preventDefault();
    $('#loading-animation').show();
    $(this).css('visibility', 'hidden');
    submitNewTask(this);
  });

  $('.delete-btn').on('click', function (event) {
    event.preventDefault();
    const taskID = $(this).closest('li').attr('id').slice(8);
    deleteTask(taskID);
  });

  loadTasks('incomplete');

  loadTasksByCategory();
});
