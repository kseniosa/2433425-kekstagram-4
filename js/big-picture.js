import {isEscapeKey} from './util.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureImage = bigPicture.querySelector('.big-picture__img img');
const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
const bigPictureLikes = bigPicture.querySelector('.likes-count');
const bigPictureDescription = bigPicture.querySelector('.social__caption');

const commentTemplate = document.querySelector('#comments').content.querySelector('li');

const socialComments = bigPicture.querySelector('.social__comments');
const commentsCount = bigPicture.querySelector('.comments-count');
const commentsCounter = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');

const createComment = (comment) => {
  const {avatar, name, message} = comment;
  const currentComment = commentTemplate.cloneNode(true);

  currentComment.querySelector('.social__picture').src = avatar;
  currentComment.querySelector('.social__picture').alt = name;
  currentComment.querySelector('.social__text').textContent = message;

  return currentComment;
};

const createComments = (comments) => {
  const commentFragment = document.createDocumentFragment();

  comments.forEach((element) => {
    commentFragment.append(createComment(element));
  });

  socialComments.innerHTML = '';
  socialComments.append(commentFragment);
};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

const onBigPictureEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();

    closeBigPicture();
    document.removeEventListener('keydown', onBigPictureEscKeydown);
  }
};

const onBigPictureCancelClick = () => {
  closeBigPicture();

  document.removeEventListener('keydown', onBigPictureEscKeydown);
  bigPictureCancel.removeEventListener('click', onBigPictureCancelClick);
};

const openBigPicture = (picture) => {
  const {url, description, likes, comments} = picture;

  bigPicture.classList.remove('hidden');
  commentsCounter.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  document.body.classList.add('modal-open');

  bigPictureImage.src = url;
  bigPictureLikes.textContent = likes;
  bigPictureDescription.textContent = description;
  commentsCount.textContent = comments.lenght;
  createComments(comments);

  document.addEventListener('keydown', onBigPictureEscKeydown);
  bigPictureCancel.addEventListener('click', onBigPictureCancelClick);
};

export {openBigPicture};
