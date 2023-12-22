// модуль с вспомогательными функциями
const FILE_TYPES = ['jpg', 'jpeg', 'png'];


const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

// проверка, является ли нажатая кнопка эскейпом
const isEscapeKey = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

export {isEscapeKey, debounce, FILE_TYPES};
