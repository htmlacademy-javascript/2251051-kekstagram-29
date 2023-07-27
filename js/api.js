import { closeUserModal } from './big-picture.js';
import { setUserFormSubmit } from './form.js';
import { renderMiniatures } from './miniature-list.js';
import { showAlert } from './util.js';


fetch('https://29.javascript.pages.academy/kekstagram/data')
  .then((response) => response.json())
  .then((images) => {
    renderMiniatures(images);
  })
  .catch(() => {
    const errorMessage = 'Сервер не хочет работать...';
    showAlert(errorMessage);
  });

setUserFormSubmit(closeUserModal);
