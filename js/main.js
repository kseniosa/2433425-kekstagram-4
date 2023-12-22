//  точка входа
import { createElements } from './miniatures.js'; // функция создания миниатюр
import { getPictures } from './api-work.js';
import { showErrorModal } from './messages.js';
import './form.js';

getPictures(createElements, showErrorModal);
