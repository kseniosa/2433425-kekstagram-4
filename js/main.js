// массив подписей к фото
const DESCRIPTIONS = [
  'Какой сегодня замечательный день!',
  'Всем добра и позитива <3',
  'Ставь лайк, если любишь маму...',
  'Кто поставит лайк, тот найдет айфон под подушкой!',
  'Любите эту жить! Кайфуйте!!!'
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

// функция получения рандомного числа из промежутка
const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

// функция получения рандомного айди (без повторений)
const createRandomId = (min, max) => {
  const usedIdArray = [];

  return function () {
    let randomId = getRandomInteger(min, max);
    if (usedIdArray.length >= (max - min + 1)) {
      return null; // использованы все имеющиеся id
    }
    while (usedIdArray.includes(randomId)) {
      randomId = getRandomInteger(min, max);
    }
    usedIdArray.push(randomId);
    return randomId;
  };
};

// генерация индекса комментария
const generateCommentId = createRandomId(1, 30);

//генерация одного комментария
const createComments = () => ({
  id: generateCommentId(),
  avatar: ('img/avatar-', getRandomInteger(1, 6), '.svg'),
  message: MESSAGES[getRandomInteger(0, MESSAGES.length - 1)],
  name: NAMES[getRandomInteger(0, NAMES.length - 1)]

});

// генерация индекса фото
const generateId = createRandomId(1, 25);

//генерация одного объекта с описанием
const createPublication = () => ({
  id: generateId(),
  url: ('photos/', getRandomInteger(1, 25), '.jpg'),
  description: DESCRIPTIONS[getRandomInteger(0, DESCRIPTIONS.length - 1)],
  likes: getRandomInteger(15, 200),
  comments: Array.from({length: getRandomInteger(0,30)}, createComments) // массив комментариев
});

// массив описаний фотографий
const arrayPublication = Array.from({length: 25}, createPublication);
arrayPublication();
