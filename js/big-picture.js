import {isEscapeKey} from './util.js';

const COMMENTS_STEP = 5;

const bigPicture = document.querySelector('.big-picture');
const bigPictureImage = bigPicture.querySelector('.big-picture__img img');
const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel'); // крестик
const bigPictureLikes = bigPicture.querySelector('.likes-count');
const bigPictureDescription = bigPicture.querySelector('.social__caption');

// шаблон комментария
const commentTemplate = document.querySelector('#comments').content.querySelector('li');

const socialComments = bigPicture.querySelector('.social__comments');
const commentsCount = bigPicture.querySelector('.comments-count');
const commentsCounter = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');

let shownCommentsCount = COMMENTS_STEP; // количество показанных комментариев
let commentsArray = []; // массив комментариев


// создание одного комментария
const createComment = (comment) => {
  const {avatar, name, message} = comment;
  const currentComment = commentTemplate.cloneNode(true); // клонируем шаблон

  currentComment.querySelector('.social__picture').src = avatar;
  currentComment.querySelector('.social__picture').alt = name;
  currentComment.querySelector('.social__text').textContent = message;

  // возвращает заполненный шаблон
  return currentComment;
};

// создание всех комментариев под фото
const createComments = () => {
  // обнуляем комментарии с предыдущей публикации
  socialComments.innerHTML = '';

  // сравниваем длину массива и отображаемое число комментариев
  shownCommentsCount = (shownCommentsCount > commentsArray.length) ? commentsArray.length : shownCommentsCount;

  // копируем в массив отображаемых комментариев кол-во комментариев, которые надо отобразить
  const shownComments = commentsArray.slice(0, shownCommentsCount);

  // скрытие/отображение кнопки "загрузить еще"
  if (commentsArray.length <= COMMENTS_STEP || shownCommentsCount >= commentsArray.length) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }

  commentsCounter.textContent = `${shownCommentsCount} из ${commentsCount.textContent} комментариев`;

  const commentFragment = document.createDocumentFragment();

  // проходится по каждому комментарию в массиве комментариев
  shownComments.forEach((element) => {
    // создает комментарий с данными из массива и добавляет в документ
    commentFragment.append(createComment(element));
  });

  socialComments.append(commentFragment); // добавляем полученные к новой открытой публикации
};

// закрытие большой каринки
const closeBigPicture = () => {
  bigPicture.classList.add('hidden'); // добавляем скрывающий класс
  document.body.classList.remove('modal-open');

  shownCommentsCount = COMMENTS_STEP;
  commentsArray = [];
};

// нажатие на "загрузить еще" (комментарии)
const onCommentsLoaderClick = () => {
  shownCommentsCount += COMMENTS_STEP;
  createComments(); // отрисовываем заново предыдущие комментарии + 5 новых
};

// нажатие на эскейп
const onBigPictureEscKeydown = (evt) => {
  // если нажатая кнопка - эскейп:
  if (isEscapeKey(evt)) {
    evt.preventDefault();

    closeBigPicture();
    document.removeEventListener('keydown', onBigPictureEscKeydown); // удаляем обработчик
  }
};

// нажатие на крестик
const onBigPictureCancelClick = () => {
  closeBigPicture();

  document.removeEventListener('keydown', onBigPictureEscKeydown); // удаляем обработчик эскейпа
  bigPictureCancel.removeEventListener('click', onBigPictureCancelClick); // и обработчик клика
};

// открытие большой картинки
const openBigPicture = (picture) => {
  const {url, description, likes, comments} = picture;

  bigPicture.classList.remove('hidden'); // удаляем скрывающий класс
  document.body.classList.add('modal-open');

  // добавляем большй картинке содержание аналогичной маленькой
  bigPictureImage.src = url;
  bigPictureLikes.textContent = likes;
  bigPictureDescription.textContent = description;
  commentsCount.textContent = comments.length;

  commentsArray = comments.slice(); // копируем все комментарии в массив
  createComments();

  commentsLoader.addEventListener('click', onCommentsLoaderClick);

  document.addEventListener('keydown', onBigPictureEscKeydown); // добавляем обработчик эскейпа
  bigPictureCancel.addEventListener('click', onBigPictureCancelClick); // и обрабочик клика
};

export {openBigPicture};
