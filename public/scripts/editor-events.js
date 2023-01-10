let openEditorButtons = document.querySelectorAll('[data-modal-target]');
let closeEditorButton = $('.close-btn');
let overlay = $('#overlay');

const openEditor = (editor) => {
  if (!editor) return;
  editor.classList.add('active');
  overlay.addClass('active');
  $('#loading-animation').hide();
  $(editor).find('form').css('visibility', 'visible');
};

const closeEditor = (editor) => {
  if (!editor) return;
  editor.removeClass('active');
  overlay.removeClass('active');
};

const addEditorEvents = () => {
  openEditorButtons = document.querySelectorAll('[data-modal-target]');
  closeEditorButton = $('.close-btn');
  overlay = $('#overlay');

  openEditorButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const editor = document.querySelector(button.dataset.modalTarget);
      openEditor(editor);
    });
  });

  closeEditorButton.on('click', () => {
    const editor = $('.editor');
    closeEditor(editor);
  });
};
