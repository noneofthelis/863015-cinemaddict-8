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
    this._comments = [...data.comments];
    this._commentsNumber = data.commentsNumber;

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
    console.log(this, this._comments);
    if (evt.target.tagName === `INPUT`) { // убрать любое взаиможействие с комментом
      const newData = this._getData();
      if (typeof this._onUpdate === `function`) {
        this._onUpdate(newData);
      }
      this.updateUserData(newData);
      this._updateRating(newData);
    }
  }

  _onCommentSubmit(evt) { // комментарий
    if (evt.keyCode === KeyCode.ENTER) {
      const newData = this._getData();
      this._updateComments(newData);
      if (typeof this._onCommentAdd === `function`) {
        this._onCommentAdd(this._commentsNumber);
      }
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

  _updateComments(data) {
    if (data.comment.text) {
      this._commentsNumber++;
      this._renderCommentsNumber(this._commentsNumber);
      this._comments.push(data.comment);
      this._createComment(data.comment);
    }
  }

  _renderCommentsNumber(number) {
    document.querySelector(`.film-details__comments-count`).textContent = number;
  }

  _updateRating(data) {
    document.querySelector(`.film-details__user-rating`).textContent = `Your rate ${data.rating}`;
  }

  _createComment(data) {
    // console.log(data);
    const container = document.querySelector(`.film-details__user-rating-controls`);
    container.insertAdjacentElement(`beforeend`, CardDetails._getCommentTemplate(data));
  }

  static _processForm(formData) {
    const entry = {
      rating: null,
      comment: {}
    };

    const CardDetailsMapper = CardDetails.createMapper(entry);

    for (const pair of formData.entries()) {
      // console.log(pair);
      const [property, value] = pair;
      if (CardDetailsMapper[property]) {
        CardDetailsMapper[property](value);
      }
    }
    return entry;
  }

  static createMapper(target) {
    return {
      'comment': (value) => {
        target.comment = {
          text: value,
          timestamp: Date.now()
        };
      },
      'comment-emoji': (value) => {
        target.emoji = value;
      },
      'score': (value) => {
        target.rating = value;
      },
    };
  }

  get template() {
    const template = document.querySelector(`#details-template`)
      .content.cloneNode(true).querySelector(`.film-details`);
    const commentsList = template.querySelector(`.film-details__user-rating-controls`);
    template.querySelector(`.film-details__poster`).src = this._poster;

    template.querySelector(`.film-details__total-rating`).textContent = this._rating;
    template.querySelector(`.film-details__title`).textContent = this._title;
    template.querySelector(`.film-details__user-rating-title`).textContent = this._title;
    template.querySelector(`.film-details__comments-count`).textContent = this._commentsNumber;

    template.querySelector(`.film-details__genre`).textContent = this._genre;
    template.querySelector(`.film-details__film-description`).textContent = this._description;

    if (this._userData.rating) {
      template.querySelector(`.film-details__user-rating`).textContent = `Your rate ${this._userData.rating}`;
    }

    // console.log(this._comments);
    for (const number of this._comments) {
      // console.log(this._comments, number);
      const comment = CardDetails._getCommentTemplate(number);
      // console.log(comment);
      commentsList.insertAdjacentElement(`beforeend`, comment);
    }

    return template;
  }

  static _getCommentTemplate(data) {
    const template = document.querySelector(`#comment-template`)
      .content.cloneNode(true).querySelector(`.film-details__comment`);
   // console.log(typeof data.timestamp, data.timestamp);
    const momento = moment(data.timestamp).fromNow();

    template.querySelector(`.film-details__comment-author`).textContent = data.author;
    template.querySelector(`.film-details__comment-text`).textContent = data.text;
    template.querySelector(`.film-details__comment-day`).textContent = momento;
    template.querySelector(`.film-details__comment-emoji`).textContent = EmojiDict[data.emoji];

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
