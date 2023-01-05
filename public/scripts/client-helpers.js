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
