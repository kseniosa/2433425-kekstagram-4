// модуль с вспомогательными функциями


const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};


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

// проверка, является ли нажатая кнопка эскейпом
const isEscapeKey = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

export {getRandomInteger, createRandomId, isEscapeKey, debounce};
