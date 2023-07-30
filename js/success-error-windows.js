import { bodySection } from './big-picture.js';
import { closeImageUpload, imageEditField } from './form.js';
import { isEscapeKey } from './util.js';

const successWindowTemplate = document.querySelector('#success').content.querySelector('.success');
const errorWindowTemplate = document.querySelector('#error').content.querySelector('.error');

const successWindow = successWindowTemplate.cloneNode(true);
const errorWindow = errorWindowTemplate.cloneNode(true);

const closeErrorButton = errorWindow.querySelector('.error__button');
const closeSuccessButton = successWindow.querySelector('.success__button');

function createSuccessWindow() {
  bodySection.append(successWindow);
}

const closeError = () => {
  errorWindow.remove();
  removeListenersFromError();
};

const closeSuccess = () => {
  successWindow.remove();
  closeImageUpload();
  removeListenersFromSuccess();
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

const onDocumentClickError = (evt) => {
  if (evt.target.className === 'error') {
    closeError();
  }
};

const onDocumentClickSuccess = (evt) => {
  if (evt.target.className === 'success') {
    closeSuccess();
  }
};

const onDocumentKeyDownRemoveError = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeError();
    imageEditField.classList.remove('hidden');
  }
};

function removeListenersFromError () {
  closeErrorButton.removeEventListener('click', closeError);
  document.removeEventListener('keydown', onDocumentKeyDownRemoveError);
  document.removeEventListener('click', onDocumentClickError);
}

function removeListenersFromSuccess () {
  closeSuccessButton.removeEventListener('click', closeSuccess);
  document.removeEventListener('keydown', onDocumentKeyDownRemoveSucces);
  document.removeEventListener('click', onDocumentClickSuccess);
}

function renderSuccessWindow () {
  createSuccessWindow();

  closeSuccessButton.addEventListener('click', closeSuccess);
  document.addEventListener('keydown', onDocumentKeyDownRemoveSucces);
  document.addEventListener('click', onDocumentClickSuccess);
}

function renderErrorWindow () {
  createErrorWindow();

  closeErrorButton.addEventListener('click', closeError);
  document.addEventListener('keydown', onDocumentKeyDownRemoveError);
  document.addEventListener('click', onDocumentClickError);
}

export {renderSuccessWindow, renderErrorWindow};
