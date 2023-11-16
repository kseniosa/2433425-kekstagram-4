import {arrayPublications} from './data.js';

const pictireTemplate = document.querySelector('#picture').content.querySelector('.picture');
const pictures = document.querySelector('.pictures');

const createElement = (picture) => {
  const {url, description, likes, comments} = picture;
  const newMiniature = pictireTemplate.cloneNode(true);

  newMiniature.querySelector('.picture__img').src = url;
  newMiniature.querySelector('.picture__img').alt = description;
  newMiniature.querySelector('.picture__likes').innerHTML = likes;
  newMiniature.querySelector('.picture__comments').innerHTML = comments;

  return newMiniature;
};

const createElements = arrayPublications();
const pictureListFragment = document.createDocumentFragment();

createElements.forEach(() => {
  pictureListFragment.appendChild(createElement());
});

pictures.appendChild(pictureListFragment);

export {createElements};

