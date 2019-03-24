/** @module ./card */

import Component from './component.js';

export default class CardDetails extends Component {
  constructor(data) {
    super();
    this._description = data.description;
    this._genre = data.genre;
    this._poster = data.imageUrl;
    this._rating = data.rating;
    this._title = data.title;

    this._onClick = null;
    this._onCloseBtnClick = this._onCloseBtnClick.bind(this);
    this._onRatingClick = this._onRatingClick.bind(this);
    this._onCommentPress = this._onCommentPress.bind(this);
  }

  _onCloseBtnClick() {
    return typeof this._onClose === `function` && this._onClose();
  }

  _onRatingClick() {

  }

  _onCommentPress() { // комментарий

  }

  _addListener() {
    this._element.querySelector(`.film-details__close-btn`)
      .addEventListener(`click`, this._onCloseBtnClick);
    this._element.querySelector(`.film-details__user-rating-score`)
      .addEventListener(`click`, this._onRatingClick);
    this._element.querySelector(`.film-details__comment-input`)
      .addEventListener(`keypress`, this._onCommentPress);
  }

  _removeListener() {
    this._element.querySelector(`.film-details__close-btn`)
      .removeEventListener(`click`, this._onCloseBtnClick);
    this._element.querySelector(`.film-details__user-rating-score`)
      .removeEventListener(`click`, this._onRatingClick);
    this._element.querySelector(`.film-details__comment-input`)
      .removeEventListener(`keypress`, this._onCommentPress);
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

  set onClose(fn) {
    this._onClose = fn;
  }
}
