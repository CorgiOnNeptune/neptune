const openEditorButtons = document.querySelectorAll('[data-modal-target]');
const closeEditorButtons = document.querySelectorAll('[data-close-button]');
const overlay = document.getElementById('overlay');

const openEditor = function (editor) {
  if (!editor) return;
  editor.classList.add('active');
  overlay.classList.add('active');
};

const closeEditor = function (editor) {
  if (!editor) return;
  editor.classList.remove('active');
  overlay.classList.remove('active');
};

openEditorButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const editor = document.querySelector(button.dataset.modalTarget);
    openEditor(editor);
  });
});

closeEditorButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const editor = button.closest('.new-task-editor');
    closeEditor(editor);
  });
});
