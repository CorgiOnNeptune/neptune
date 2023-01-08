/*
 * Client-side JS logic
 */

$(() => {
  $('.new-task-form').on('submit', function (event) {
    event.preventDefault();
    $("#loading-animation").show();
    $(this).css("visibility", "hidden");
    submitNewTask(this);
  });

  $('.delete-btn').on('click', function (event) {
    event.preventDefault();
    const taskID = $(this).closest('li').attr('id').slice(8);
    deleteTask(taskID);
  });

  loadTasks("incomplete");

  loadTasksByCategory();
});
