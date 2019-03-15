/** @module ./card */

export default class CardDetails {
  constructor(data) {
    this._description = data.description;
    this._genre = data.genre;
    this._poster = data.imageUrl;
    this._rating = data.rating;
    this._title = data.title;

    this._element = null;
    this._onClick = null;
    this._onCloseBtnClick = this._onCloseBtnClick.bind(this);
  }

  _onCloseBtnClick() {
    return typeof this._onClick === `function` && this._onClick();
  }

  _addListener() {
    this._element.querySelector(`.film-details__close-btn`)
      .addEventListener(`click`, this._onCloseBtnClick);
  }

  _removeListener() {
    this._element.querySelector(`.film-details__close-btn`)
      .removeEventListener(`click`, this._onCloseBtnClick);
  }

  render() {
    this._element = this.template;
    this._addListener();
    return this._element;
  }

  removeElement() {
    this._removeListener();
    this._element.remove();
    this._element = null;
  }

  get template() {
    const template = document.querySelector(`#details-template`)
      .content.cloneNode(true).querySelector(`.film-details`);
    template.querySelector(`.film-details__poster`).src = this._poster;

    template.querySelector(`.film-details__total-rating`).textContent = this._rating;
    template.querySelector(`.film-details__title`).textContent = this._title;
    template.querySelector(`.film-details__user-rating-title`).textContent = this._title;

    template.querySelector(`.film-details__genre`).textContent = this._genre;
    template.querySelector(`.film-details__film-description`).textContent = this._description;

    return template;
  }

  set onClick(fn) {
    this._onClick = fn;
  }
}
