import { bodySection } from './big-picture.js';
import { isEscapeKey } from './util.js';

const uploadForm = document.querySelector('.img-upload__form');
const uploadImage = document.querySelector('.img-upload__input');
const imageEditField = document.querySelector('.img-upload__overlay');
const buttonCloseUpload = document.querySelector('.cancel');
const commentField = document.querySelector('.text__description');
const hashtagField = document.querySelector('.text__hashtags');

const onDocumentEsc = (evt) => {
  const nonClosingElements = [commentField, hashtagField];

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
