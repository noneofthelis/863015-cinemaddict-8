/** @module ./create-card */

/**
 * returns markup of card element template as document fragment
 * @param {Object} cardData
 * @param {Array} properties
 * @param {boolean} hasControls
 * @return {DocumentFragment}
 */
export default (cardData, properties, hasControls) => {
  const card = document.querySelector(`#card-template`).content.cloneNode(true);
  const fragment = document.createDocumentFragment();
  const parentDiv = card.querySelector(`.film-card`);
  const poster = card.querySelector(`img`);

  poster.src = cardData.imageUrl;

  properties.forEach((property) => {
    card.querySelector(`.film-card__${property}`).textContent = cardData[property];
  });

  if (hasControls) {
    const controls = document.querySelector(`#card-controls-template`).content.cloneNode(true);
    const description = document.querySelector(`#card-description-template`).content.cloneNode(true);
    parentDiv.appendChild(controls);
    parentDiv.insertBefore(description, poster);
  } else {
    parentDiv.classList.add(`film-card--no-controls`);
  }

  fragment.appendChild(card);

  return fragment;
};
