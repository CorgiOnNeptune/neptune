const submitNewTask = (element) => {
  const $form = $(element);

  $.post('/tasks', $form.serialize())
    .then(() => {
      $form[0].reset();
      closeEditor($('.editor'));
    })
    .fail((err) => {
      console.log(err.message);
    });
};

const completeStatusAnimation = function() {
  $(".complete-status").click(() => {
    $(".complete-status").fadeOut(250, function() {
      if ($(this).attr("src") === "images/not-completed.png") {
        $(this).attr("src", "images/completed.png");
        $(this).removeClass("not-completed");
        $(this).addClass("completed");
      } else {
        $(this).attr("src", "images/not-completed.png");
        $(this).removeClass("completed");
        $(this).addClass("not-completed");
      }
    }).fadeIn(250);
  });
};
