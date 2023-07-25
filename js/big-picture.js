import { onShowMoreClick, showMore } from './miniature-list.js';
import { isEscapeKey } from './util.js';

const bodySection = document.querySelector('body');
const userBigPicture = document.querySelector('.big-picture');
const bigPictureLikes = userBigPicture.querySelector('.likes-count');
const bigPictureCommentsCount = userBigPicture.querySelector('.comments-count');
const bigPictureComments = userBigPicture.querySelector('.social__comments');
const userBigPictureImage = userBigPicture.querySelector('.big-picture__img img');
const userBigPictureClose = userBigPicture.querySelector('.cancel');

const onDocumentKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    userBigPicture.classList.add('hidden');
  }
};

function openUserModal() {
  userBigPicture.classList.remove('hidden');
  bodySection.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeyDown);
}

function closeUserModal() {
  userBigPicture.classList.add('hidden');
  bodySection.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeyDown);
  showMore.removeEventListener('click, keydown', onShowMoreClick);
}

userBigPictureClose.addEventListener('click', () => {
  closeUserModal();
});

export { userBigPicture, userBigPictureImage, openUserModal, bigPictureLikes, bigPictureCommentsCount, bigPictureComments, bodySection };
