import createFilter from './create-filter.js';
import createCard from './create-card.js';
import cardData from './card-data.js';
import getRandomNumber from './utils.js';

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

const PROPERTIES = [`title`,
  `rating`,
  `year`,
  `duration`,
  `genre`,
  `poster`,
  `comments`];

const FILTERS_NAMES = [`All movies`, `Watchlist`, `History`, `Favorites`];

/**
 * inserts the resulting nodes (cards) into the DOM tree
 * @param {number} number
 * @param {Node} container
 * @param {Array} properties
 * @param {boolean} hasControls
 */
const renderCards = (number, container, properties, hasControls) => {
  const fragment = document.createDocumentFragment();
  const cards = [...new Array(number)].map(() => createCard(cardData, properties, hasControls));
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
  if (evt.target.classList.contains(`main-navigation__item`)) {
    filtersContainer.querySelector(`.main-navigation__item--active`).classList.remove(`main-navigation__item--active`);
    evt.target.classList.add(`main-navigation__item--active`);
  }
};

/**
 * creates a random number of cards
 */
const refreshCards = () => {
  mainCardsContainer.innerHTML = ``;
  mostRated.innerHTML = ``;
  mostCommented.innerHTML = ``;
  renderCards(getRandomNumber(CardsInterval.MIN, CardsInterval.MAX), mainCardsContainer, PROPERTIES, true);
  renderCards(getRandomNumber(CardsInterval.MIN, CardsInterval.MAX), mostRated, PROPERTIES, false);
  renderCards(getRandomNumber(CardsInterval.MIN, CardsInterval.MAX), mostCommented, PROPERTIES, false);
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
renderCards(CardsNumber.MAIN, mainCardsContainer, PROPERTIES, true);
renderCards(CardsNumber.EXTRA, mostRated, PROPERTIES, false);
renderCards(CardsNumber.EXTRA, mostCommented, PROPERTIES, false);
