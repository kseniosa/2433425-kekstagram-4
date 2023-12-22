import {openBigPicture} from './big-picture.js';

const pictireTemplate = document.querySelector('#picture').content.querySelector('.picture'); // шаблон
const pictures = document.querySelector('.pictures'); // все картинки

// создание одной минатюры
const createElement = (picture) => {
  const {url, description, likes, comments} = picture;
  const newMiniature = pictireTemplate.cloneNode(true); // клонируем шаблон

  newMiniature.querySelector('.picture__img').src = url;
  newMiniature.querySelector('.picture__img').alt = description;
  newMiniature.querySelector('.picture__likes').innerHTML = likes;
  newMiniature.querySelector('.picture__comments').innerHTML = comments.length;

  const onNewMiniatureClick = (evt) => {
    evt.preventDefault();
    openBigPicture(picture); // при нажатии на миниатюру открыть большую картинку
  };

  newMiniature.addEventListener('click', onNewMiniatureClick); // обработчик клика на миниатюру

  return newMiniature;
};

// создает много миниатюр
const createElements = (photos) => {
  const pictureListFragment = document.createDocumentFragment();
  // проходимся по элементам переданного массива с фотографиями
  photos.forEach((photo) => {
    // для каждого элемента массива создаем миниатюру и добавляем ее в документ
    pictureListFragment.appendChild(createElement(photo));
  });
  // добавляем список полученных миниатюр во все картинки
  pictures.appendChild(pictureListFragment);
};

const removeElements = () => {
  document.querySelectorAll('.picture').forEach((picture) => picture.remove());
};

export {createElements, removeElements};
