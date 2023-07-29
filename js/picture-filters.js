// Масштабирование картинки

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

// Фильтры

const effectsList = document.querySelector('.effects__list');
const effectSlider = document.querySelector('.effect-level__slider');
const effectValue = document.querySelector('.effect-level__value');
const sliderContainer = document.querySelector('.img-upload__effect-level');

noUiSlider.create(effectSlider, {
  range: {
    min: 0,
    max: 100,
  },

  start: 100,
  connect: 'lower',
});

effectSlider.noUiSlider.on('update', () => {
  effectValue.value = effectSlider.noUiSlider.get();

  if (effectsList.querySelector('#effect-chrome').checked) {
    imagePreview.style.filter = `grayscale(${effectSlider.noUiSlider.get()})`;
  } else if (effectsList.querySelector('#effect-sepia').checked) {
    imagePreview.style.filter = `sepia(${effectSlider.noUiSlider.get()})`;
  } else if (effectsList.querySelector('#effect-marvin').checked) {
    imagePreview.style.filter = `invert(${effectSlider.noUiSlider.get()}%)`;
  } else if (effectsList.querySelector('#effect-phobos').checked) {
    imagePreview.style.filter = `blur(${effectSlider.noUiSlider.get()}px)`;
  } else if (effectsList.querySelector('#effect-heat').checked) {
    imagePreview.style.filter = `brightness(${effectSlider.noUiSlider.get()})`;
  }
});

effectsList.addEventListener('change', (evt) => {
  sliderContainer.classList.remove('hidden');

  if (evt.target.id === 'effect-chrome') {
    effectSlider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1,
      },

      start: 1,
      step: 0.1,
    });

  } else if (evt.target.id === 'effect-sepia') {

    effectSlider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1,
      },

      start: 1,
      step: 0.1,
    });

  } else if (evt.target.id === 'effect-marvin') {

    effectSlider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 100,
      },

      start: 100,
      step: 1,
    });

  } else if (evt.target.id === 'effect-phobos') {

    effectSlider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 3,
      },

      start: 3,
      step: 0.1,
    });

  } else if (evt.target.id === 'effect-heat') {

    effectSlider.noUiSlider.updateOptions({
      range: {
        min: 1,
        max: 3,
      },

      start: 3,
      step: 0.1,
    });

  } else if (evt.target.id === 'effect-none') {
    imagePreview.style.filter = 'initial';
    sliderContainer.classList.add('hidden');
  }
});

export { sliderContainer, imagePreview, effectsList };
