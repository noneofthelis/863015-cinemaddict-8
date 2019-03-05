/** @module ./create-card */

const CARD_PROPERTIES = [
  {name: `title`, value: `Incredibles 2`},
  {name: `rating`, value: `9.8`},
  {name: `year`, value: 2018},
  {name: `duration`, value: `1h 13m`},
  {name: `genre`, value: `Comedy`},
  {name: `poster`, value: `./images/posters/accused.jpg`},
  {name: `comments`, value: `13 comments`}
];

/**
 * returns markup of card element template as document fragment
 * @param {boolean} hasControls
 * @return {DocumentFragment}
 */
export default (hasControls) => {
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
