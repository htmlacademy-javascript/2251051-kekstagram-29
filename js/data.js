import { getRandomInteger, getRandomId, getRandomArrayElement } from './util.js';

const MESSAGE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = [
  'Марина',
  'Иван',
  'Сергей',
  'Николай',
  'Алексей',
  'Татьяна',
  'Михаил',
  'Александр',
  'Владимир',
  'Геннадий'
];

const DESCRIPTIONS_COUNT = 25;
const COMMENTS_ID_COUNT = 1000;
const COMMENTS_COUNT = 30;
const PHOTOS_COUNT = 25;
const AVATARS_COUNT = 6;
const Likes = {
  MIN: 25,
  MAX: 200
};

const createRandomIdComment = getRandomId(1, COMMENTS_ID_COUNT);

const createRandomPhoto = getRandomId(1, PHOTOS_COUNT);

const createComment = () => ({
  id: createRandomIdComment(),
  avatar: `img/avatar-${getRandomInteger(1, AVATARS_COUNT)}.svg`,
  message: getRandomArrayElement(MESSAGE),
  name: getRandomArrayElement(NAMES),
});

const createRandomComment = () => {
  const randomCommentCount = getRandomInteger(0, COMMENTS_COUNT);
  return Array.from({length: randomCommentCount}, createComment);
};

const createDescription = () => {
  const createRandomIdDescription = getRandomId(1, DESCRIPTIONS_COUNT);

  return {
    id: createRandomIdDescription(),
    url: `photos/${createRandomPhoto()}.jpg`,
    description: 'Какое-то описание. Сказано придумайте сами... Это типа пофиг какой получается?',
    likes: getRandomInteger(Likes.MIN, Likes.MAX),
    comment: createRandomComment(),
  };
};

const getRandomDescriptions = () => Array.from({length: DESCRIPTIONS_COUNT}, createDescription);

export {getRandomDescriptions, createRandomComment};
