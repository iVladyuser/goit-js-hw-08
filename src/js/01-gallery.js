// Описаний в документації
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';

// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

console.log(galleryItems);

const container = document.querySelector('.gallery');
const markup = galleryItems.map(
  ({ preview, original, description }) => `<li class="gallery__item">
    <a class="gallery__link" href="${original}">
        <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
    />
    </a>
</li>`
);

container.insertAdjacentHTML('beforeend', markup.join(''));
container.addEventListener('click', openFullSize);

function openFullSize(evt) {
  if (!evt.target.classList.contains('gallery__image')) {
    return;
  }
  evt.preventDefault();

  const originalImgLink = evt.target.dataset.source;
  const instance = basicLightbox.create(
    `<img src="${originalImgLink}"
`,
    {
      onShow: () => {
        document.addEventListener('keydown', onListenerEscape);
      },
      onClose: () => {
        document.removeEventListener('keydown', onListenerEscape);
      },
    }
  );

  instance.onShow();

  document.addEventListener('keydown', evt => {
    if (evt.key === 'Escape') {
      // const visible = basicLightbox.visible();
      // if (visible) {
      instance.onClose();
      // }
    }
  });
}

const galleryList = new SimpleLightbox('.gallery a');
