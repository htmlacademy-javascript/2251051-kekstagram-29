import { bodySection } from './big-picture.js';
import { sliderContainer } from './picture-filters.js';
import { isEscapeKey } from './util.js';

const uploadForm = document.querySelector('.img-upload__form');
const uploadImage = document.querySelector('.img-upload__input');
const imageEditField = document.querySelector('.img-upload__overlay');
const buttonCloseUpload = document.querySelector('.cancel');

const MAX_HASHTAG_COUNT = 5;
const VALID_SYMBOLS = /^#[a-zA-Zа-я0-9]{1,19}$/;

const descriptionField = document.querySelector('.text__description');
const hashtagField = document.querySelector('.text__hashtags');

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
});

const normalizeTags = (tagString) => tagString
  .trim()
  .split(' ')
  .filter((tag) => Boolean(tag.length));

const hasValidSymbols = (value) => normalizeTags(value).every((tag) => VALID_SYMBOLS.test(tag));

const hasValidCount = (value) => normalizeTags(value).length <= MAX_HASHTAG_COUNT;

const hasUniqueTags = (value) => {
  const tagsLower = normalizeTags(value).map((tag) => tag.toLowerCase());
  return tagsLower.length === new Set(tagsLower).size;
};

pristine.addValidator(
  hashtagField,
  hasValidCount,
  'Превышено количество хэш-тегов',
  3,
  true
);

pristine.addValidator(
  hashtagField,
  hasValidSymbols,
  'Введён невалидный хэш-тег',
  2,
  true
);

pristine.addValidator(
  hashtagField,
  hasUniqueTags,
  'Хэш-теги повторяются',
  1,
  true
);

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
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
  sliderContainer.classList.add('hidden');
  bodySection.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentEsc);
}

function closeImageUpload() {
  imageEditField.classList.add('hidden');
  bodySection.classList.remove('modal-open');
  pristine.reset();
  hashtagField.textContent = '';
  descriptionField.textContent = '';

  document.removeEventListener('keydown', onDocumentEsc);
}

uploadImage.addEventListener('change', () => {
  uploadImage.value = '';
  openImageUpload();
});

buttonCloseUpload.addEventListener('click', () => {
  closeImageUpload();
});
