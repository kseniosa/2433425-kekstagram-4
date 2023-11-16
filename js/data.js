// модуль генерации данных
import {getRandomInteger, createRandomId} from './util.js';

const commentCount = 30;
const photosCount = 25;
const avatarsCount = 6;
const likesMinCount = 15;
const likesMaxCount = 200;

// массив подписей к фото
const DESCRIPTIONS = [
  'Какой сегодня замечательный день!',
  'Всем добра и позитива <3',
  'Ставь лайк, если любишь маму...',
  'Кто поставит лайк, тот найдет айфон под подушкой!',
  'Любите эту жизнь! Кайфуйте!!!',
  'Как придумать интересную подпись??',
  'Мне просто надо пережить эту неделю...',
  'Я - лучше всех!',
  'А вы знаете, что скоро ретроградный меркурий?...'
];

// массив имен комментаторов
const NAMES = [
  'Анна',
  'Анастасия',
  'Дарья',
  'Мария',
  'Никита',
  'Евгений',
  'Максим',
  'Александр'
];

// массив предложений для комментариев
const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

// генерация индекса комментария
const generateCommentId = createRandomId(1, commentCount);

//генерация одного комментария
const createComments = () => ({
  id: generateCommentId(),
  avatar: (`img/avatar-${getRandomInteger(1, avatarsCount)}.svg`),
  message: MESSAGES[getRandomInteger(0, MESSAGES.length - 1)],
  name: NAMES[getRandomInteger(0, NAMES.length - 1)]
});

// генерация индекса фото
const generateId = createRandomId(1, photosCount);

//генерация одного объекта с описанием
const createPublication = () => ({
  id: generateId(),
  url: (`photos/${getRandomInteger(1, photosCount)}.jpg`),
  description: DESCRIPTIONS[getRandomInteger(0, DESCRIPTIONS.length - 1)],
  likes: getRandomInteger(likesMinCount, likesMaxCount),
  comments: Array.from({length: getRandomInteger(0,commentCount)},  (_, index) => createComments(index + 1)) // массив комментариев
});

// массив описаний фотографий
const arrayPublications = Array.from({length: photosCount}, createPublication);

export {arrayPublications};
