const openEditorButtons = document.querySelectorAll('[data-modal-target]');
const closeEditorButton = $('.close-btn');
const overlay = $('#overlay');

const openEditor = function (editor) {
  if (!editor) return;
  editor.classList.add('active');
  overlay.addClass('active');
};

const closeEditor = function (editor) {
  if (!editor) return;
  editor.removeClass('active');
  overlay.removeClass('active');
};

openEditorButtons.forEach(button => {
  button.addEventListener('click', () => {
    const editor = document.querySelector(button.dataset.modalTarget);
    openEditor(editor);
  });
});

closeEditorButton.on('click', () => {
  const editor = $('.editor');
  closeEditor(editor);
});
