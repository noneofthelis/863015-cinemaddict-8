import createFilter from './create-filter.js';
import cardData from './card-data.js';
import CardDetails from './card-details.js';
import Card from './card.js';
import util from './utils.js';

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
  MAIN: 5,
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
 * renders certain number of cards
 * @param {number} number
 * @param {Node} container
 * @param {Object} data
 * @param {boolean} hasControls
 * @return {Node}
 */

const renderCards = (number, container, data, hasControls) => {
  return [...new Array(number)].map(() => {
    renderCard(container, data, hasControls);
  });
};

const appendElement = (container, element) => {
  container.appendChild(element);
};

/**
* inserts the resulting node (card) into the DOM tree
* @param {Node} container
* @param {Object} data
* @param {boolean} hasControls
*/
const renderCard = (container, data, hasControls) => {
  const card = createCard(data, hasControls);
  appendElement(container, card.render());
};

const createCard = (data, hasControls) => {
  const card = new Card(data, hasControls);
  const popup = createPopup(data, card);

  card.onClick = () => {
    renderPopup(popup);
  };
  return card;
};

/**
 * inserts the resulting node (popup) into the DOM tree
 * @param {Object} popup
 */
const renderPopup = (popup) => {
  appendElement(document.body, popup.render());
};

const createPopup = (data, card) => {
  const popup = new CardDetails(data);
  popup.onClose = () => {
    popup.removeElement();
  };
  popup.onUpdate = (newObject) => {
    // console.log(data, newObject, popup);
    data.userData = newObject;
    card.updateUserData(data.userData);
  };
  popup.onCommentAdd = (number) => {
    card.updateCommentsNumber(number);
  };
  return popup;
};

/**
 * inserts the resulting nodes (filters) into the DOM tree
 * @param {Array} items
 */
const renderFilters = (items) => {
  const fragment = document.createDocumentFragment();
  items.forEach((item) => {
    fragment.appendChild(createFilter(item, util.getRandomNumber(FilterInterval.MIN, FilterInterval.MAX)));
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
  renderCards(util.getRandomNumber(CardsInterval.MIN, CardsInterval.MAX), mainCardsContainer, PROPERTIES, true);
  renderCards(util.getRandomNumber(CardsInterval.MIN, CardsInterval.MAX), mostRated, PROPERTIES, false);
  renderCards(util.getRandomNumber(CardsInterval.MIN, CardsInterval.MAX), mostCommented, PROPERTIES, false);
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
renderCards(CardsNumber.MAIN, mainCardsContainer, cardData, true);
renderCards(CardsNumber.EXTRA, mostRated, cardData);
renderCards(CardsNumber.EXTRA, mostCommented, cardData);
