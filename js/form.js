import {isEscapeKey} from './util.js';

// const MAX_LENGTH = 20; // максимальная длина хэштега
// const MAX_COUNT = 5; // максимальне количество хэштегов

const uploadForm = document.querySelector('.img-upload__form');
const uploadFile = document.querySelector('.img-upload__input'); // выбор файла для загрузки
const overlay = document.querySelector('.img-upload__overlay');
const uploadCancel = document.querySelector('.img-upload__cancel'); // крестик
const hashtag = document.querySelector('.text__hashtags');
// const description = document.querySelector('.text__description');
const uploadButton = document.querySelector('.img-upload__submit');

let errorText = ''; // текст ошибки

const findDuplicates = (arr) => arr.filter((item, index) => arr.indexOf(item) !== index);

const error = () => errorText; // текст ошибки но по-другому

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper', // родительский элемент, куда отправится класс ошибки/успеха
  errorClass: 'invalid',
  succesClass: 'valid',
  errorTextParent: 'img-upload__field-wrapper', // класс родителя, к которому добавляется текстовый элемент ошибки
  errorTextTag: 'div', // тип элемента, который нужно создать для текста ошибки
  errorTextClass: 'img-upload__error' // класс текстового элемента ошибки
});


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

const hashtagHandler = (value) => {
  errorText = '';
  const re = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
  const hashtagText = value.toLowerCase().trim(); // текст хэштегов без пробелов и больших букв
  const hashtagTextArray = hashtagText.split(/\s+/); // сплит по всем пробелам между хэштегами

  uploadButton.disabled = false; // делаем кнопку активной по умолчанию

  if (hashtagTextArray.length === 0 || hashtagTextArray[0] === '') {
    return true;
  } // если хэштегов нет, то разрешаем загрузку

  const duplicates = findDuplicates(hashtagTextArray); // ищем дублированные хэштеги

  if (duplicates.length > 0) { // если есть дублированные хэштеги
    errorText = 'Нельзя дублировать хэштеги!'; // задаем сообщение об ошибке
    uploadButton.disabled = true; // отключаем кнопку
    return false; // возвращаем ошибку при валидации
  }

  if (hashtagTextArray.length > 5) { // если хэштегов больше 5 штук
    errorText = 'Нельзя указать больше 5 хэштегов!';
    uploadButton.disabled = true;
    return false;
  }

  hashtagTextArray.forEach((element) => { // проверяем каждый хэштег в массиве
    if (!re.test(element)) { errorText = 'Хэштег может состоять только из букв и чисел!'; }// проверяем хэштег регулярным выражением
    if (element.length >= 20) { errorText = 'Максимальная длина хэштега - 20 символов!'; } // проверяем длину хэштега
    if (element[0] === '#' && element.length === 1) { errorText = 'Хэштег не может состоять только из #!'; } // проверяем наличие текста в хэштеге
    if (element[0] !== '#') { errorText = 'Каждый хэштег должен начинаться с #!'; } // проверяем решетку в начале
  });

  if (errorText !== ''){ // если была хоть одна ошибка
    uploadButton.disabled = true;
    return false;
  }

  uploadButton.disabled = false; // если ошибок не было, включаем кнопку
  return true; // возвращаем что всё хорошо

};

pristine.addValidator(hashtag, hashtagHandler, error, 2, false); // добравляем валидатор на хэштег

const onHashtagInput = () => {

}; // дописать!!! ввод текста в поле хэштега

uploadFile.addEventListener('change', onUploadFileChange); // обрабочик изменения состояния файла
uploadCancel.addEventListener('click', onUploadCancelClick); // обработчик клика на крестик
hashtag.addEventListener('input', onHashtagInput); // обрабочик ввода текста в поле хэштега

export { closeForm };
