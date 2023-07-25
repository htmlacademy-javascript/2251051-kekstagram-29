import { bodySection } from './big-picture.js';
import { isEscapeKey } from './util.js';

const uploadImage = document.querySelector('.img-upload__input');
const imageEditField = document.querySelector('.img-upload__overlay');
const buttonCloseUpload = document.querySelector('.cancel');

const onDocumentEsc = (evt) => {
  if (isEscapeKey) {
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
  openImageUpload();
});

buttonCloseUpload.addEventListener('click', () => {
  closeImageUpload();
});
