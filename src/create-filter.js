/** @module ./create-filter */

/**
 * returns markup of filter element template as document fragment
 * @param {string} name
 * @param {number} number
 * @return {DocumentFragment}
 */
export default (name, number) => {
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
