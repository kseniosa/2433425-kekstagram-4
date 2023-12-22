import { FILE_TYPES, isEscapeKey } from './util.js';
import { showMessage } from './messages.js';
import { sendPicture } from './api-work.js';
import './nouislider.js';

const uploadForm = document.querySelector('.img-upload__form');
const uploadFile = document.querySelector('.img-upload__input');
const overlay = document.querySelector('.img-upload__overlay');
const uploadCancel = document.querySelector('.img-upload__cancel');
const hashtag = document.querySelector('.text__hashtags');
const uploadButton = document.querySelector('.img-upload__submit');
const smallerSizeButton = document.querySelector('.scale__control--smaller');
const biggerSizeButton = document.querySelector('.scale__control--bigger');
const sizeLabel = document.querySelector('.scale__control--value');
const imagePreview = document.querySelector('.img-upload__preview img');
const slider = document.querySelector('.effect-level__slider');
const filtersSelect = document.querySelectorAll('.effects__item');
const sliderUpload = document.querySelector('.img-upload__effect-level');
const effectLevel = document.querySelector('.effect-level__value');
const successTemplate = document.querySelector('#success').content.querySelector('section');
const errorTemplate = document.querySelector('#error').content.querySelector('section');

let currentFilter = document.querySelector('.effects_radio');

let errorText = '';

const findDuplicates = (arr) => arr.filter((item, index) => arr.indexOf(item) !== index);

const error = () => errorText;

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'invalid',
  succesClass: 'valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__error'
});

const filters = {
  none: () => {
    sliderUpload.classList.add('visually-hidden');
    return 'none';
  },

  sepia: () => {
    sliderUpload.classList.remove('visually-hidden');
    return `sepia(${parseInt(slider.value, 10) * 0.01})`;
  },

  chrome: () => {
    sliderUpload.classList.remove('visually-hidden');
    return `grayscale(${parseInt(slider.value, 10) * 0.01})`;
  },

  marvin: () => {
    sliderUpload.classList.remove('visually-hidden');
    return `invert(${Math.floor(slider.value)}%)`;
  },

  phobos: () => {
    sliderUpload.classList.remove('visually-hidden');
    return `blur(${parseInt(slider.value, 10) * 0.01 * 3}px)`;
  },

  heat: () => {
    sliderUpload.classList.remove('visually-hidden');
    return `brightness(${parseInt(slider.value, 10) * 0.01 * 3})`;
  }
};


const hashtagHandler = (value) => {
  errorText = '';
  const re = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
  const hashtagText = value.toLowerCase().trim();
  const hashtagTextArray = hashtagText.split(/\s+/);

  uploadButton.disabled = false;

  if (hashtagTextArray.length === 0 || hashtagTextArray[0] === '') {
    return true;
  }

  const duplicates = findDuplicates(hashtagTextArray);

  if (duplicates.length > 0) {
    errorText = 'Нельзя дублировать хэштеги!';
    uploadButton.disabled = true;
    return false;
  }

  if (hashtagTextArray.length > 5) {
    errorText = 'Нельзя указать больше 5 хэштегов!';
    uploadButton.disabled = true;
    return false;
  }

  hashtagTextArray.forEach((element) => {
    if (!re.test(element)) { errorText = 'Хэштег может состоять только из букв и чисел!'; }
    if (element.length >= 20) { errorText = 'Максимальная длина хэштега - 20 символов!'; }
    if (element[0] === '#' && element.length === 1) { errorText = 'Хэштег не может состоять только из #!'; }
    if (element[0] !== '#') { errorText = 'Каждый хэштег должен начинаться с #!'; }
  });

  if (errorText !== ''){
    uploadButton.disabled = true;
    return false;
  }

  uploadButton.disabled = false;
  return true;

};

const onHashtagInput = () => {

}; // дописать!!! ввод текста в поле хэштега

const onSizeButtonClick = (event) => {
  let newValue = parseInt(sizeLabel.value, 10);
  if (event.target === smallerSizeButton){
    newValue = newValue - 25 >= 25 ? newValue - 25 : 25;
  }
  else{
    newValue = newValue + 25 <= 100 ? newValue + 25 : 100;
  }

  imagePreview.style.transform = `scale(${newValue / 100})`;
  sizeLabel.value = `${newValue}%`;
};

const onSliderUpdate = () => {
  slider.value = slider.noUiSlider.get();
  effectLevel.value = slider.value;
  if (currentFilter) {
    imagePreview.style.filter = filters[currentFilter]();
  }
  else {
    imagePreview.style.filter = filters['none']();
  }
};

const openForm = () => {
  filtersSelect.forEach((filter) => {
    filter.addEventListener('change', onFilterChange);
  });

  sizeLabel.value = '100%';
  if (!slider.noUiSlider){
    noUiSlider.create(slider, {
      range: {
        min: 0,
        max: 100,
      },
      start: 100,
      step: 10,
      connect: 'lower'
    });}

  hashtag.addEventListener('input', onHashtagInput); // обрабочик ввода текста в поле хэштега
  smallerSizeButton.addEventListener('click', onSizeButtonClick); // обработчик клика на кнопки размера
  biggerSizeButton.addEventListener('click', onSizeButtonClick);
  slider.noUiSlider.on('update', onSliderUpdate);
  uploadForm.addEventListener('submit', onFormSubmit);

};

const onFilterChange = (event) => {
  currentFilter = event.currentTarget.querySelector('.effects__radio').value;
  imagePreview.style.filter = filters[currentFilter]();
  slider.noUiSlider.set(100);
  slider.value = 100;
};

const closeForm = () => {
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  currentFilter = document.querySelector('.effects_radio');

  uploadForm.reset();
  pristine.reset();
  sizeLabel.value = '100%';
  imagePreview.style.transform = 'scale(100%)';
  uploadButton.disabled = false;

  //uploadCancel.removeEventListener('click', onUploadCancelClick);
  uploadForm.removeEventListener('submit', onFormSubmit);
  hashtag.removeEventListener('input', onHashtagInput);
  smallerSizeButton.removeEventListener('click', onSizeButtonClick);
  biggerSizeButton.removeEventListener('click', onSizeButtonClick);

  filtersSelect.forEach((filter) => {
    filter.removeEventListener('change', onFilterChange);
  });

  slider.noUiSlider.off('change', onSliderUpdate);
  imagePreview.style.filter = filters['none']();
};

const onCloseFormEscapeKeydown = (evt) => {
  if (isEscapeKey(evt) && !evt.target.classList.contains('text__hashtags') &&
  !evt.target.classList.contains('text__description')) {
    evt.preventDefault();

    closeForm();
    document.removeEventListener('keydown', onCloseFormEscapeKeydown);
  }
};

const changePreview = () => {
  const file = uploadFile.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    imagePreview.src = URL.createObjectURL(file);
  }
};

const onUploadFileChange = () => {
  overlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  openForm();
  changePreview();

  document.addEventListener('keydown', onCloseFormEscapeKeydown);
};


const onUploadCancelClick = () => {
  closeForm();
};

const onSuccess = () => {
  closeForm();
  showMessage(successTemplate);
  uploadButton.disabled = false;
};

const onFail = () => {
  showMessage(errorTemplate);
  uploadButton.disabled = false;
};

const onFormSubmit = (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  sendPicture(onSuccess, onFail, 'POST', formData);
  uploadButton.disabled = true;
};

uploadFile.addEventListener('change', onUploadFileChange); // обрабочик изменения состояния файла
pristine.addValidator(hashtag, hashtagHandler, error, 2, false); // добравляем валидатор на хэштег
uploadFile.addEventListener('change', onUploadFileChange); // обрабочик изменения состояния файла
uploadCancel.addEventListener('click', onUploadCancelClick); // обработчик клика на крестик

export { openForm, closeForm };
