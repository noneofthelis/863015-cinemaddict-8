/** @module ./card */

export default class Card {
  constructor(data, hasControls = false) {
    this._comments = data.comments;
    this._description = data.description;
    this._duration = data.duration;
    this._genre = data.genre;
    this._poster = data.imageUrl;
    this._rating = data.rating;
    this._title = data.title;
    this._year = data.year;

    this._hasControls = hasControls;
    this._element = null;
  }

  render() {
    this._element = this.template;
    return this._element;
  }

  get template() {
    const template = document.querySelector(`#card-template`)
      .content.cloneNode(true).querySelector(`.film-card`);
    const poster = template.querySelector(`img`);
    poster.src = this._poster;

    template.querySelector(`.film-card__comments`).textContent = this._comments;
    template.querySelector(`.film-card__duration`).textContent = this._duration;
    template.querySelector(`.film-card__genre`).textContent = this._genre;
    template.querySelector(`.film-card__rating`).textContent = this._rating;
    template.querySelector(`.film-card__title`).textContent = this._title;
    template.querySelector(`.film-card__year`).textContent = this._year;

    if (this._hasControls) {
      const controls = document.querySelector(`#card-controls-template`).content.cloneNode(true);
      const description = document.querySelector(`#card-description-template`).content.cloneNode(true);
      description.querySelector(`.film-card__description`).textContent = this._description;
      template.appendChild(controls);
      template.insertBefore(description, poster);
    } else {
      template.classList.add(`film-card--no-controls`);
    }

    return template;
  }
}
