import { getRandomDescriptions } from './data.js';

const picturesList = document.querySelector('.pictures');
const picturesTemplate = document.querySelector('#picture').content.querySelector('.picture');

const usersPictures = getRandomDescriptions();

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
});

picturesList.appendChild(picturesFragment);
