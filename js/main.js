//  точка входа
import { createElements } from './miniatures.js'; // функция создания миниатюр
import { getPictures } from './api-work.js';
import { showErrorModal } from './messages.js';
import { showSections } from './sort.js';
import './form.js';

let pictures = [];

const addPictures = (newPictures) => {
  pictures = newPictures.slice();
  createElements(pictures);
};

getPictures(addPictures, showErrorModal);
showSections();

export {pictures};
