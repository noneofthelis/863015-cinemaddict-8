/** @module ./card */

import Component from './component.js';
import moment from 'moment';

const EmojiDict = {
  'neutral-face': `😐`,
  'sleeping': `😴`,
  'grinning': `😀`
};

const KeyCode = {
  ENTER: 13,
  CTRL: 17
};

export default class CardDetails extends Component {
  constructor(data) {
    super();
    this._description = data.description;
    this._genre = data.genre;
    this._poster = data.imageUrl;
    this._rating = data.rating;
    this._title = data.title;
    this._runtime = data.runtime;
    this._comments = [...data.comments];
    this._commentsNumber = data.commentsNumber;
    this._releaseDate = data.releaseDate;

    this._onClose = null;
    this._onUpdate = null;
    this._onCommentAdd = null;
    this._onCloseBtnClick = this._onCloseBtnClick.bind(this);
    this._onRatingClick = this._onRatingClick.bind(this);
    this._onCommentSubmit = this._onCommentSubmit.bind(this);
  }

  _onCloseBtnClick() {
    return typeof this._onClose === `function` && this._onClose();
  }

  _onRatingClick(evt) {
    if (evt.target.tagName === `INPUT`) {
      const newData = evt.target.value;
      if (typeof this._onUpdate === `function`) {
        this._onUpdate(newData);
      }
      this._updateUserRating(newData);
      CardDetails._changeUserRating(newData);
    }
  }

  _onCommentSubmit(evt) {
    if (evt.keyCode === KeyCode.ENTER) {
      const newData = this._getData();
      this._updateComments(newData);
      if (typeof this._onCommentAdd === `function`) {
        this._onCommentAdd(this._commentsNumber);
      }
      evt.target.value = ``;
    }
  }

  _addListeners() {
    this._element.querySelector(`.film-details__close-btn`)
      .addEventListener(`click`, this._onCloseBtnClick);
    this._element.querySelector(`.film-details__user-rating-score`)
      .addEventListener(`click`, this._onRatingClick);
    this._element.querySelector(`.film-details__comment-input`)
      .addEventListener(`keypress`, this._onCommentSubmit);
  }

  _removeListeners() {
    this._element.querySelector(`.film-details__close-btn`)
      .removeEventListener(`click`, this._onCloseBtnClick);
    this._element.querySelector(`.film-details__user-rating-score`)
      .removeEventListener(`click`, this._onRatingClick);
    this._element.querySelector(`.film-details__comment-input`)
      .removeEventListener(`keypress`, this._onCommentPress);
  }

  _getData() {
    const formData = new FormData(this._element.querySelector(`.film-details__inner`));
    return CardDetails._processForm(formData);
  }

  _updateComments(comment) {
    if (comment.text) {
      this._commentsNumber++;
      this._comments.push(comment);
      this._renderCommentsNumber(this._commentsNumber);
      CardDetails._createComment(comment);
    }
  }

  _renderCommentsNumber(number) {
    document.querySelector(`.film-details__comments-count`).textContent = number;
  }

  _updateUserRating(newRating) {
    this._userData.rating = newRating;
  }

  static _changeUserRating(newRating) {
    document.querySelector(`.film-details__user-rating`).textContent = `Your rate ${newRating}`;
  }

  static _createComment(comment) {
    const container = document.querySelector(`.film-details__user-rating-controls`);
    container.insertAdjacentElement(`beforeend`, CardDetails._getCommentTemplate(comment));
  }

  static _processForm(formData) {
    const entry = {};

    const CardDetailsMapper = CardDetails._createMapper(entry);

    for (const pair of formData.entries()) {
      const [property, value] = pair;
      if (CardDetailsMapper[property]) {
        CardDetailsMapper[property](value);
      }
    }
    return entry;
  }

  static _createMapper(target) {
    target.timestamp = Date.now();
    target.removable = true;
    target.author = `You`;
    return {
      'comment': (value) => {
        target.text = value;
      },
      'comment-emoji': (value) => {
        target.emoji = value;
      },
    };
  }

  get template() {
    const template = document.querySelector(`#details-template`)
      .content.cloneNode(true).querySelector(`.film-details`);
    const commentsList = template.querySelector(`.film-details__user-rating-controls`);
    const filmInfo = template.querySelector(`.film-details__table tbody`);
    template.querySelector(`.film-details__poster`).src = this._poster;

    template.querySelector(`.film-details__total-rating`).textContent = this._rating;
    template.querySelector(`.film-details__title`).textContent = this._title;
    template.querySelector(`.film-details__user-rating-title`).textContent = this._title;
    template.querySelector(`.film-details__film-description`).textContent = this._description;
    template.querySelector(`.film-details__comments-count`).textContent = this._commentsNumber;

    template.querySelector(`.film-details__genre`).textContent = this._genre;
    filmInfo.children[4].children[1].textContent = `${this._runtime} min`;
    filmInfo.children[3].children[1].textContent = moment(this._releaseDate).format(`D MMMM YYYY`);

    if (this._userData.rating) {
      template.querySelector(`.film-details__user-rating`).textContent = `Your rate ${this._userData.rating}`;
    }

    for (const number of this._comments) {
      const comment = CardDetails._getCommentTemplate(number);
      commentsList.insertAdjacentElement(`beforeend`, comment);
    }

    return template;
  }

  static _getCommentTemplate(comment) {
    const template = document.querySelector(`#comment-template`)
      .content.cloneNode(true).querySelector(`.film-details__comment`);

    template.querySelector(`.film-details__comment-author`).textContent = comment.author;
    template.querySelector(`.film-details__comment-text`).textContent = comment.text;
    template.querySelector(`.film-details__comment-day`).textContent = moment(comment.timestamp).fromNow();
    template.querySelector(`.film-details__comment-emoji`).textContent = EmojiDict[comment.emoji];

    return template;
  }

  set onClose(fn) {
    this._onClose = fn;
  }

  set onUpdate(fn) {
    this._onUpdate = fn;
  }

  set onCommentAdd(fn) {
    this._onCommentAdd = fn;
  }
}
