import { bodySection } from './big-picture.js';
import { isEscapeKey } from './util.js';

const uploadForm = document.querySelector('.img-upload__form');
const uploadImage = document.querySelector('.img-upload__input');
const imageEditField = document.querySelector('.img-upload__overlay');
const buttonCloseUpload = document.querySelector('.cancel');

const errorUploadWindow = document.querySelector('#error').content.querySelector('.error');
const successUploadWindow = document.querySelector('#success').content.querySelector('.success');

const successWindow = successUploadWindow.cloneNode(true);
const errorWindow = errorUploadWindow.cloneNode(true);

const pristine = new Pristine(uploadForm, false);

const onDocumentEscErrorSuccessWindow = (evt) => {
  if (isEscapeKey) {
    evt.preventDefault();
    errorWindow.remove();
  }
};

function removeSuccessWindow () {
  successWindow.remove();
  imageEditField.classList.add('hidden');

  document.removeEventListener('keydown', onDocumentEscErrorSuccessWindow);
}

function renderSuccessWindow () {
  const successButton = successWindow.querySelector('.success__button');

  bodySection.append(successWindow);

  successButton.addEventListener('click', removeSuccessWindow);
}

function removeErrorWindow () {
  errorWindow.remove();
  document.removeEventListener('keydown', onDocumentEscErrorSuccessWindow);
}

const renderErrorWindow = () => {
  const errorButton = errorWindow.querySelector('.error__button');

  bodySection.append(errorWindow);

  errorButton.addEventListener('click', removeErrorWindow);
};

const descriptionField = document.querySelector('.text__description');
const hashtagField = document.querySelector('.text__hashtags');

function validateDescription (value) {
  const isTrue = value.trim().length <= 140;
  return isTrue;
}

function validateHashatg (value) {
  const hashtags = value.toLowerCase().split(' ');

  if (hashtags.length > 5) {
    return false;
  }

  const uniqueHashtags = new Set(hashtags);
  if (uniqueHashtags.size !== hashtags.length) {
    return false;
  }

  const regex = /^#[a-zA-Zа-я0-9]{1,19}$/;
  hashtags.forEach((hashtag) => {
    if (!regex.test(hashtag)) {
      return false;
    }
  });

  return true;
}

pristine.addValidator(descriptionField, validateDescription, 'ошибка');
pristine.addValidator(hashtagField, validateHashatg);

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();

  if (isValid) {
    renderSuccessWindow();
  } else {
    renderErrorWindow();
  }
});

const onDocumentEsc = (evt) => {
  const nonClosingElements = [descriptionField, hashtagField];

  if (isEscapeKey && !nonClosingElements.includes(document.activeElement)) {
    evt.preventDefault();
    imageEditField.classList.add('hidden');
  }
};

function openImageUpload () {
  imageEditField.classList.remove('hidden');
  bodySection.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentEsc);
}

function closeImageUpload() {
  imageEditField.classList.add('hidden');
  bodySection.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentEsc);
}

uploadImage.addEventListener('change', () => {
  uploadImage.value = '';
  openImageUpload();
});

buttonCloseUpload.addEventListener('click', () => {
  closeImageUpload();
});
