const urls = {
  GET: 'https://29.javascript.pages.academy/kekstagram/data',
  POST: 'https://29.javascript.pages.academy/kekstagram',
};

const sendRequest = (onSuccess, onFail, method, body) =>{
  fetch (
    urls[method],
    {
      method: method,
      body: body,
    },
  )
    .then((response) => response.json())
    .then((data) => {
      onSuccess(data);
    })
    .catch((err) => {
      onFail(err);
    });
};

const getPictures = (onSuccess, onFail, method = 'GET') => sendRequest(onSuccess, onFail, method);

const sendPicture = (onSuccess, onFail, method = 'POST', body) => sendRequest(onSuccess, onFail, method, body);

export {getPictures, sendPicture};
