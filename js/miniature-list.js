import { userBigPicture, bigPictureComments, bigPictureCommentsCount, bigPictureLikes, openUserModal, userBigPictureImage } from './big-picture.js';
import { getRandomDescriptions } from './data.js';

const picturesList = document.querySelector('.pictures');
const picturesTemplate = document.querySelector('#picture').content.querySelector('.picture');
const showMore = document.querySelector('.comments-loader');
const pictureComment = bigPictureComments.querySelector('.social__comment');
const commentCountFromTo = userBigPicture.querySelector('.social__comment-count');

const usersPictures = getRandomDescriptions();

let limitedComments = [];

let currentPictureComments = [];

let displayedComments = 5;

const renderComments = () => {
  limitedComments = currentPictureComments.slice(0, displayedComments);
  const commentFragment = document.createDocumentFragment();

  limitedComments.forEach(({ avatar, name, message }) => {
    const commentElement = pictureComment.cloneNode(true);

    const pictureCommentImage = commentElement.querySelector('.social__picture');
    const pictureCommentText = commentElement.querySelector('.social__text');

    pictureCommentImage.src = avatar;
    pictureCommentImage.alt = name;
    pictureCommentText.textContent = message;

    commentFragment.append(commentElement);
  });

  bigPictureComments.innerHTML = '';
  bigPictureComments.append(commentFragment);

  commentCountFromTo.textContent = `${displayedComments} из ${currentPictureComments.length} комментариев`;

  if (displayedComments >= currentPictureComments.length) {
    showMore.style.display = 'none';
  } else {
    showMore.style.display = 'block';
  }
};

const renderMiniatures = () => {
  const picturesFragment = document.createDocumentFragment();

  usersPictures.forEach(({ url, description, likes, comment }) => {
    const picturesElement = picturesTemplate.cloneNode(true);
    const pictureImage = picturesElement.querySelector('.picture__img');
    const picturesLikes = picturesElement.querySelector('.picture__likes');
    const pictureComments = picturesElement.querySelector('.picture__comments');

    pictureImage.src = url;
    pictureImage.alt = description;
    picturesLikes.textContent = likes;
    pictureComments.textContent = comment.length;

    picturesList.appendChild(picturesElement);

    const onMiniatureClick = (evt) => {
      openUserModal();
      renderComments();

      const miniatureImage = evt.target.closest('.picture__img');

      if (miniatureImage) {
        userBigPictureImage.src = miniatureImage.src;
        bigPictureLikes.textContent = picturesLikes.textContent;
        bigPictureCommentsCount.textContent = pictureComments.textContent;

        currentPictureComments = comment;
        if (currentPictureComments.length <= 5) {
          displayedComments = currentPictureComments.length;
        } else {
          displayedComments = 5;
        }
        renderComments();
      }

      picturesElement.removeEventListener('click', onMiniatureClick);
    };

    picturesElement.addEventListener('click', onMiniatureClick);
  });

  picturesList.appendChild(picturesFragment);
};

const onShowMoreClick = () => {
  displayedComments += 5;

  if (displayedComments > currentPictureComments.length) {
    displayedComments = currentPictureComments.length;
  }

  renderComments();
};

showMore.addEventListener('click', onShowMoreClick);

renderMiniatures();

export {renderMiniatures, picturesList, onShowMoreClick, showMore};
