const filtersImageContainer = document.querySelector('.img-filters__form');
const buttonCollection = document.querySelectorAll('.img-filters__button');
const defaultFilterButton = document.querySelector('#filter-default');
const randomFilterButton = document.querySelector('#filter-random');
const discussedFilterButton = document.querySelector('#filter-discussed');

filtersImageContainer.addEventListener('click', (evt) => {
  const clickedButton = evt.target;

  buttonCollection.forEach((button) => {
    button.classList.remove('img-filters__button--active');
  });

  if(clickedButton.id === 'filter-default') {
    defaultFilterButton.classList.add('img-filters__button--active');
  } else if (clickedButton.id === 'filter-random') {
    randomFilterButton.classList.add('img-filters__button--active');
  } else if (clickedButton.id === 'filter-discussed') {
    discussedFilterButton.classList.add('img-filters__button--active');
  }
});
