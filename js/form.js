import {isEscapeKey} from './util.js';

// const MAX_LENGTH = 20; // максимальная длина хэштега
// const MAX_COUNT = 5; // максимальне количество хэштегов

// const uploadForm = document.querySelector('.img-upload__form');
const uploadFile = document.querySelector('.img-upload__input'); // выбор файла для загрузки
const overlay = document.querySelector('.img-upload__overlay');
const uploadCancel = document.querySelector('.img-upload__cancel'); // крестик
// const hashtag = document.querySelector('.text__hashtags');
// const description = document.querySelector('.text__description');

// let errorText = ''; // текст ошибки

// const error = () => errorText; // текст ошибки но по-другому

// const pristine = new Pristine(uploadForm, {
//   classTo: 'img-upload__item', // родительский элемент, куда отправится класс ошибки/успеха
//   errorClass: 'img-upload__item--invalid',
//   succesClass: 'img-upload__item--valid',
//   errorTextParent: 'img-upload__item', // класс родителя, к которому добавляется текстовый элемент ошибки
//   errorTextTag: 'div', // тип элемента, который нужно создать для текста ошибки
//   errorTextClass: 'img-upload__error' // класс текстового элемента ошибки
// });


// закрытие формы
const closeForm = () => {
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');

  uploadCancel.reset(); // сброс значения поля выбора
};

const onCloseFormEscapeKeydown = (evt) => {
  // закрытие по эскейпу если хэштег и описание НЕ активные поля
  if (isEscapeKey(evt) && !evt.target.classList.contains('text__hashtags') &&
  !evt.target.classList.contains('text__description')) {
    evt.preventDefault();

    closeForm();
    document.removeEventListener('keydown', onCloseFormEscapeKeydown); // удаляем обработчик
  }
};

// зактытие формы при клике на крестик
const onUploadCancelClick = () => {
  closeForm();
};

// загрузка картинки
const onUploadFileChange = () => {
  overlay.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onCloseFormEscapeKeydown); // закрытие по эскейпу
};

// const hashtagHandler = (value) => {
//   errorText = '';

//   const hashtagText = value.toLowerCase().trim(); // текст хэштегов без пробелов и больших букв
//   const hashtagTextArray = hashtagText.split(/\s+/); // сплит по всем пробелам между хэштегами

//   // проверка осталось ли что-то
//   if (hashtagTextArray.length === 0) {
//     return true;
//   }


// };

// pristine.addValidator(hashtag, hashtagHandler, error, 2, false); // добравляем валидатор на хэштег

// const onHashtagInput = () => {}; // дописать!!! ввод текста в поле хэштега

uploadFile.addEventListener('change', onUploadFileChange); // обрабочик изменения состояния файла
uploadCancel.addEventListener('click', onUploadCancelClick); // обработчик клика на крестик
// hashtag.addEventListener('input', onHashtagInput); // обрабочик ввода текста в поле хэштега

export { closeForm };
