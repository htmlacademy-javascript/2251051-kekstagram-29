import { renderMiniatures } from './miniature-list.js';

fetch('https://29.javascript.pages.academy/kekstagram/data')
  .then((response) => response.json())
  .then((images) => {
    console.log(images);
    renderMiniatures(images);
  });
