const pictireTemplate = document.querySelector('#picture').content.querySelector('.picture');
const pictures = document.querySelector('.pictures');

const createElement = (picture) => {
  const {url, description, likes, comments} = picture;
  const newMiniature = pictireTemplate.cloneNode(true);

  newMiniature.querySelector('.picture__img').src = url;
  newMiniature.querySelector('.picture__img').alt = description;
  newMiniature.querySelector('.picture__likes').innerHTML = likes;
  newMiniature.querySelector('.picture__comments').innerHTML = comments.length;

  return newMiniature;
};

const pictureListFragment = document.createDocumentFragment();

const createElements = (photos) => {
  photos.forEach((photo) => {
    pictureListFragment.appendChild(createElement(photo));
  });

  pictures.appendChild(pictureListFragment);
};

export {createElements};

