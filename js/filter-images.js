const filtersImageContainer = document.querySelector('.img-filters');

const MINIATURES_COUNT = 10;

const Filters = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

let filterCurrent = Filters.DEFAULT;
let miniatures = [];

const randomizedSort = () => Math.random() - 0.5;

const mostDiscussedSort = (miniatureA, miniatureB) => miniatureB.comments.length - miniatureA.comments.length;

const getFilteredMiniatures = () => {
  switch (filterCurrent) {
    case Filters.RANDOM:
      return [...miniatures].sort(randomizedSort).slice(0, MINIATURES_COUNT);
    case Filters.DISCUSSED:
      return [...miniatures].sort(mostDiscussedSort);
    default:
      return [...miniatures];
  }
};

const onButtonFilterClick = (callback) => {
  filtersImageContainer.addEventListener('click', (evt) => {
    if (!evt.target.classList.contains('img-filters__button')) {
      return;
    }

    const clickedButton = evt.target;

    if (clickedButton.id === filterCurrent) {
      return;
    }

    filtersImageContainer.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');

    clickedButton.classList.add('img-filters__button--active');
    filterCurrent = clickedButton.id;

    callback(getFilteredMiniatures());
  });
};

const initFilter = (loadedPictures, callback) => {
  filtersImageContainer.classList.remove('img-filters--inactive');
  miniatures = [...loadedPictures];
  onButtonFilterClick(callback);
};

export { initFilter, getFilteredMiniatures };

