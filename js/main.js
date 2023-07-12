/* eslint-disable */

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
const MIN_ID = 1;
const MAX_ID = 25;

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const getRandomId = (min, max) => {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);

    if (previousValues.length >= (max - min + 1)) {
      return null;
    }

    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }

    previousValues.push(currentValue);
    return currentValue;
  };
};

const createRandomIdDescription = getRandomId(MIN_ID, MAX_ID);

const createRandomIdComment = getRandomId(MIN_ID, MAX_ID);

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const createComment = () => ({
  id: createRandomIdComment(),
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: getRandomArrayElement(MESSAGE),
  name: getRandomArrayElement(NAMES),
});

const createRandomComment = () => {
  const randomCommentCount = getRandomInteger(0, 30);
  return Array.from({ length: randomCommentCount }, createComment);
};


const createDescription = () => ({
  id: createRandomIdDescription(),
  url: `photos/${getRandomInteger(1, 25)}.svg`,
  description: 'Какое-то описание. Сказано придумайте сами... Это типа пофиг какой получается?',
  likes: getRandomInteger(15, 200),
  comment: createRandomComment(),
});

const getRandomDescriptions = Array.from({ length: DESCRIPTIONS_COUNT }, createDescription);
