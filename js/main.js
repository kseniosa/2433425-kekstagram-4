//  точка входа
import {arrayPublications} from './data.js'; // массив публикаций
import {createElements} from './miniatures.js'; // функция создания миниатюр
import './form.js';

createElements(arrayPublications); // создаем миниатюры по массиву публикаций
