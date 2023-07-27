import { bodySection } from './big-picture.js';

const successWindowTemplate = document.querySelector('#success').content.querySelector('.success');
const errorWindowTemplate = document.querySelector('#error').content.querySelector('.error');

function closeWindow(window, closeButtonClass, eventListener) {
  const closeButton = window.querySelector(closeButtonClass);
  closeButton.removeEventListener('click', eventListener);
  window.remove();
}

function renderWindow(window, closeButtonClass, eventListener) {
  const closeButton = window.querySelector(closeButtonClass);
  closeButton.addEventListener('click', () => {
    closeWindow(window, closeButtonClass, eventListener);
  });

  bodySection.append(window);
}

function renderSuccessWindow() {
  const successWindow = successWindowTemplate.cloneNode(true);
  const closeSuccessButtonClass = '.success__button';
  const closeSuccessWindow = () => {
    closeWindow(successWindow, closeSuccessButtonClass, closeSuccessWindow);
  };

  renderWindow(successWindow, closeSuccessButtonClass, closeSuccessWindow);
}

function renderErrorWindow() {
  const errorWindow = errorWindowTemplate.cloneNode(true);
  const closeErrorButtonClass = '.error__button';
  const closeErrorWindow = () => {
    closeWindow(errorWindow, closeErrorButtonClass, closeErrorWindow);
  };

  renderWindow(errorWindow, closeErrorButtonClass, closeErrorWindow);
}

export {renderSuccessWindow, renderErrorWindow};
