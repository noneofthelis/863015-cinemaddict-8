/* 1. Подключите файл bundle.js из директории public в конце файла public/index.html с помощью тега <script>.

2. Ознакомьтесь с разметкой в index.html. Ваша задача: подготовить шаблоны для описания фильтров и карточек фильмов.

3. В директории src/ создайте модуль и опишите в нем функцию для отрисовки отдельного фильтра.
Функция должна уметь отрисовывать любой фильтр, предусмотренный макетом.

4. Создайте еще один модуль с функцией для отрисовки одной карточки фильма. Пока у нас нет данных о реальных
фильмах, пусть функция формирует шаблон карточки опираясь на данные из макета.

5. В файле main.js подключите созданные модули.

6. При помощи функции, описанной в пункте 3 отрисуйте все фильтры, предусмотренные макетом:
«All movies», «Watchlist», «History», «Favorites». Не забудьте возле фильтров «Watchlist», «History» и «Favorites»
вывести произвольное число, которое будет притворяться количеством фильмов, пока у нас нет настоящих данных..

7. Используя функцию из пункта 4 отрисуйте семь одинаковых карточек фильмов.
Ещё по две карточки отрисуйте в блоки «Top rated» и «Most commented»

8. Добавьте обработчик для переключения фильтров. При их переключении удаляйте все ранее созданные фильмы
 и добавляйте случайное количество новых.*/

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
 * returns markup of filter element template as document fragment
 * @param {string} name
 * @param {number} number
 * @return {DocumentFragment}
 */
const createFilter = (name, number) => {
  const filter = document.querySelector(`#filter-template`).content.cloneNode(true);
  const fragment = document.createDocumentFragment();
  const parentDiv = filter.querySelector(`.main-navigation__item`);
  const numberOfFilms = filter.querySelector(`.main-navigation__item-count`);
  const href = name.toLowerCase().split(` `)[0];

  if (href === `all`) {
    parentDiv.textContent = ``;
    parentDiv.classList.add(`main-navigation__item--active`);
  } else {
    numberOfFilms.textContent = number;
  }

  parentDiv.insertAdjacentText(`afterbegin`, name);
  parentDiv.setAttribute(`href`, `#${href}`);

  fragment.appendChild(filter);

  return fragment;
};

/**
 * returns markup of card element template as document fragment
 * @param {boolean} hasControls
 * @return {DocumentFragment}
 */
const createCard = (hasControls) => {
  const card = document.querySelector(`#card-template`).content.cloneNode(true);
  const fragment = document.createDocumentFragment();
  const parentDiv = card.querySelector(`.film-card`);

  CARD_PROPERTIES.forEach((property) => {
    card.querySelector(`.film-card__${property.name}`).textContent = property.value;
  });

  if (hasControls) {
    const controls = document.querySelector(`#card-controls-template`).content.cloneNode(true);
    const description = document.querySelector(`#card-description-template`).content.cloneNode(true);
    parentDiv.appendChild(controls);
    parentDiv.insertBefore(description, card.querySelector(`img`));
  } else {
    parentDiv.classList.add(`film-card--no-controls`);
  }

  fragment.appendChild(card);

  return fragment;
};

/**
 * inserts the resulting nodes (cards) into the DOM tree
 * @param {number} number
 * @param {Node} container
 * @param {boolean} hasControls
 */
const renderCards = (number, container, hasControls) => {
  const fragment = document.createDocumentFragment();
  const cards = [...new Array(number)].map(() => createCard(hasControls));
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
