const scale = document.querySelector('.scale');
const imagePreview = document.querySelector('.img-upload__preview img');
const scaleSmaller = scale.querySelector('.scale__control--smaller');
const scaleBigger = scale.querySelector('.scale__control--bigger');
const scaleValue = scale.querySelector('.scale__control--value');

let scaleNumber = 1;

const onScaleSmallerClick = () => {
  if (scaleNumber > 0.25) {
    scaleNumber -= 0.25;
    imagePreview.style.transform = `scale(${scaleNumber})`;
    scaleValue.value = `${scaleNumber * 100}%`;
  }
};

const onScaleBiggerClick = () => {
  if (scaleNumber < 1) {
    scaleNumber += 0.25;
    imagePreview.style.transform = `scale(${scaleNumber})`;
    scaleValue.value = `${scaleNumber * 100}%`;
  }
};

const addScaleSmallerClick = () => {
  scaleSmaller.removeEventListener('click', onScaleSmallerClick);
  scaleSmaller.addEventListener('click', onScaleSmallerClick);
};

const addScaleBiggerClick = () => {
  scaleBigger.removeEventListener('click', onScaleBiggerClick);
  scaleBigger.addEventListener('click', onScaleBiggerClick);
};

addScaleSmallerClick();
addScaleBiggerClick();

// Значение должно изменяться с шагом в 25.
// Например, если значение поля установлено в 50%, после нажатия на «+», значение должно стать равным 75%.
// Максимальное значение — 100%, минимальное — 25%. Значение по умолчанию — 100%;

// При изменении значения поля .scale__control--value изображению внутри .img-upload__preview должен добавляться соответствующий стиль CSS;
// который с помощью трансформации scale задаёт масштаб. Например, если в поле стоит значение 75%, то в стиле изображения должно быть написано transform: scale(0.75);
