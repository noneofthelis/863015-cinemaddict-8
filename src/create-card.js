/** @module ./create-card */

/**
 * returns markup of card element template as document fragment
 * @param {Array} properties
 * @param {boolean} hasControls
 * @return {DocumentFragment}
 */
export default (properties, hasControls) => {
  const card = document.querySelector(`#card-template`).content.cloneNode(true);
  const fragment = document.createDocumentFragment();
  const parentDiv = card.querySelector(`.film-card`);

  properties.forEach((property) => {
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
