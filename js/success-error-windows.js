import { bodySection } from './big-picture.js';
import { closeImageUpload } from './form.js';
import { isEscapeKey } from './util.js';

const successWindowTemplate = document.querySelector('#success').content.querySelector('.success');
const errorWindowTemplate = document.querySelector('#error').content.querySelector('.error');

const successWindow = successWindowTemplate.cloneNode(true);
const errorWindow = errorWindowTemplate.cloneNode(true);

function createSuccessWindow() {
  bodySection.append(successWindow);
}

const closeError = () => {
  errorWindow.remove();
};

const closeSuccess = () => {
  successWindow.remove();
  closeImageUpload();
};

function createErrorWindow() {
  bodySection.append(errorWindow);
}

const onDocumentKeyDownRemoveSucces = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    successWindow.remove();
  }
};

const onDocumentKeyDownRemoveError = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    errorWindow.remove();
  }
};

function renderSuccessWindow () {
  createSuccessWindow();
  const closeErrorButton = successWindow.querySelector('.success__button');
  closeErrorButton.addEventListener('click', closeSuccess);
  document.addEventListener('keydown', onDocumentKeyDownRemoveSucces);
}

function renderErrorWindow () {
  createErrorWindow();
  const closeErrorButton = successWindow.querySelector('.error__button');
  closeErrorButton.addEventListener('click', closeError);
  document.addEventListener('keydown', onDocumentKeyDownRemoveError);
}

export {renderSuccessWindow, renderErrorWindow};
