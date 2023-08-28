const form = document.querySelector('.feedback-form');

import throttle from 'lodash.throttle';

const formSaveStorage = 'feedback-form-state';

let textStorage = {};

window.addEventListener('DOMContentLoaded', () => {
  try {
    const data = localStorage.getItem(formSaveStorage);
    if (!data) return;
    textStorage = JSON.parse(data);
    Object.entries(textStorage).forEach(([key, value]) => {
      form.elements[key].value = value;
    });
  } catch (error) {
    console.log(error.message);
  }
});

function setStorage() {
  localStorage.setItem(formSaveStorage, JSON.stringify(textStorage));
}

form.addEventListener(
  'input',
  throttle(e => {
    textStorage[e.target.name] = e.target.value;
    setStorage();
  }, 500)
);

form.addEventListener('submit', e => {
  e.preventDefault();

  console.log(textStorage);
  textStorage = {};
  e.target.reset();
  localStorage.removeItem(formSaveStorage);
});
