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
});

effectsList.addEventListener('change', (evt) => {
  if (evt.target.id === 'effect-chrome') {
    effectSlider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1,
      },

      start: 1,
      step: 0.1,
    });

    imagePreview.style.filter = `grayscale(${effectSlider.noUiSlider.get()})`;

  } else if (evt.target.id === 'effect-sepia') {

    effectSlider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1,
      },

      start: 1,
      step: 0.1,
    });

    imagePreview.style.filter = `sepia(${effectSlider.noUiSlider.get()})`;
  } else if (evt.target.id === 'effect-marvin') {

    effectSlider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 100,
      },

      start: 100,
      step: 1,
    });

    imagePreview.style.filter = `invert(${effectSlider.noUiSlider.get()}%)`;

  } else if (evt.target.id === 'effect-phobos') {

    effectSlider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 3,
      },

      start: 3,
      step: 0.1,
    });

    imagePreview.style.filter = `blur(${effectSlider.noUiSlider.get()}px)`;
  } else if (evt.target.id === 'effect-heat') {

    effectSlider.noUiSlider.updateOptions({
      range: {
        min: 1,
        max: 3,
      },

      start: 3,
      step: 0.1,
    });

    imagePreview.style.filter = `brightness(${effectSlider.noUiSlider.get()})`;
  }
});

// По умолчанию должен быть выбран эффект «Оригинал».
// На изображение может накладываться только один эффект.
// Интенсивность эффекта регулируется перемещением ползунка в слайдере.
// Слайдер реализуется сторонней библиотекой для реализации слайдеров noUiSlider.
// Уровень эффекта записывается в поле .effect-level__value.
// При изменении уровня интенсивности эффекта (предоставляется API слайдера), CSS-стили картинки внутри .img-upload__preview обновляются следующим образом:
// Для эффекта «Хром» — filter: grayscale(0..1) с шагом 0.1;
// Для эффекта «Сепия» — filter: sepia(0..1) с шагом 0.1;
// Для эффекта «Марвин» — filter: invert(0..100%) с шагом 1%;
// Для эффекта «Фобос» — filter: blur(0..3px) с шагом 0.1px;
// Для эффекта «Зной» — filter: brightness(1..3) с шагом 0.1;
// Для эффекта «Оригинал» CSS-стили filter удаляются.
// При выборе эффекта «Оригинал» слайдер и его контейнер (элемент .img-upload__effect-level) скрываются.
// При переключении эффектов, уровень насыщенности сбрасывается до начального значения (100%): слайдер, CSS-стиль изображения и значение поля должны обновляться.
