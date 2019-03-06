import createFilter from './create-filter.js';
import createCard from './create-card.js';

const filtersContainer = document.querySelector(`.main-navigation`);
const CardsContainer = document.querySelector(`.films`);
const mainCardsContainer = CardsContainer.querySelector(`.films-list__container`);
const mostRated = CardsContainer.children[1].querySelector(`.films-list__container`);
const mostCommented = CardsContainer.children[2].querySelector(`.films-list__container`);

const ENTER_KEYCODE = 13;

const FilterInterval = {
  MIN: 3,
  MAX: 20
};

const CardsInterval = {
  MIN: 1,
  MAX: 10
};

const CardsNumber = {
  MAIN: 7,
  EXTRA: 2
};

const CARD_PROPERTIES = [
  {name: `title`, value: `Incredibles 2`},
  {name: `rating`, value: `9.8`},
  {name: `year`, value: 2018},
  {name: `duration`, value: `1h 13m`},
  {name: `genre`, value: `Comedy`},
  {name: `poster`, value: `./images/posters/accused.jpg`},
  {name: `comments`, value: `13 comments`}
];

const FILTERS_NAMES = [`All movies`, `Watchlist`, `History`, `Favorites`];

/**
 * returns random number between min and max inclusive
 * @param {number} min
 * @param {number} max
 * @return {number}
 */
const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

/**
 * inserts the resulting nodes (cards) into the DOM tree
 * @param {number} number
 * @param {Node} container
 * @param {boolean} hasControls
 */
const renderCards = (number, container, hasControls) => {
  const fragment = document.createDocumentFragment();
  const cards = [...new Array(number)].map(() => createCard(CARD_PROPERTIES, hasControls));
  cards.forEach((card) => {
    fragment.appendChild(card);
  });
  container.appendChild(fragment);
};

/**
 * inserts the resulting nodes (filters) into the DOM tree
 * @param {Array} items
 */
const renderFilters = (items) => {
  const fragment = document.createDocumentFragment();
  items.forEach((item) => {
    fragment.appendChild(createFilter(item, getRandomNumber(FilterInterval.MIN, FilterInterval.MAX)));
  });
  filtersContainer.appendChild(fragment);
};

/**
 * toggles checked filter
 * @param {MouseEvent} evt
 */
const toggleFilter = (evt) => {
  filtersContainer.querySelector(`.main-navigation__item--active`).className = `main-navigation__item`;
  evt.target.className = `main-navigation__item main-navigation__item--active`;
};

/**
 * creates a random number of cards
 */
const refreshCards = () => {
  mainCardsContainer.innerHTML = ``;
  mostRated.innerHTML = ``;
  mostCommented.innerHTML = ``;
  renderCards(getRandomNumber(CardsInterval.MIN, CardsInterval.MAX), mainCardsContainer, true);
  renderCards(getRandomNumber(CardsInterval.MIN, CardsInterval.MAX), mostRated, false);
  renderCards(getRandomNumber(CardsInterval.MIN, CardsInterval.MAX), mostCommented, false);
};

const onFilterClick = (evt) => {
  evt.preventDefault();
  toggleFilter(evt);
  refreshCards();
};

const onFilterPress = (evt) => {
  if (evt.keyCode === ENTER_KEYCODE) {
    evt.preventDefault();
    toggleFilter(evt);
    refreshCards();
  }
};

filtersContainer.addEventListener(`click`, onFilterClick);
filtersContainer.addEventListener(`keypress`, onFilterPress);

renderFilters(FILTERS_NAMES);
renderCards(CardsNumber.MAIN, mainCardsContainer, true);
renderCards(CardsNumber.EXTRA, mostRated, false);
renderCards(CardsNumber.EXTRA, mostCommented, false);
