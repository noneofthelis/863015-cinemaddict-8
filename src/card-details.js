/** @module ./card */

import Component from './component.js';

const EmojiDict = {
  'neutral-face': `😐`,
  'sleeping': `😴`,
  'grinning': `😀`
};

// отдельно рейтинг на клик и отдельно коммент на ктр энтер

export default class CardDetails extends Component {
  constructor(data) {
    super();
    this._description = data.description;
    this._genre = data.genre;
    this._poster = data.imageUrl;
    this._rating = data.rating;
    this._title = data.title;
    this._comments = data.comments;
    this._commentsNumber = data.commentsNumber;

    this._onClose = null;
    this._onUpdate = null;
    this._onCloseBtnClick = this._onCloseBtnClick.bind(this);
    this._onRatingClick = this._onRatingClick.bind(this);
    this._onCommentPress = this._onCommentPress.bind(this);
  }

  _onCloseBtnClick() {
    return typeof this._onClose === `function` && this._onClose();
  }

  _onRatingClick(evt) {
    if (evt.target.tagName === `INPUT`) {
      const newData = this._getData();
      if (typeof this._onUpdate === `function`) {
      this._onUpdate(newData);
      }
      // debugger;
      this.updateUserData(newData);
      this._rerenderUserData(newData);
      console.log(this);
    }
  }

  _onCommentPress() { // комментарий
    // if (typeof this._onUpdate === `function`) {
    // this._onUpdate(newData);
    // }
  }

  _addListeners() {
    this._element.querySelector(`.film-details__close-btn`)
      .addEventListener(`click`, this._onCloseBtnClick);
    this._element.querySelector(`.film-details__user-rating-score`)
      .addEventListener(`click`, this._onRatingClick);
    this._element.querySelector(`.film-details__comment-input`)
      .addEventListener(`keypress`, this._onCommentPress);
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

  _rerenderUserData(data) {
    // console.log(data);
    document.querySelector(`.film-details__user-rating`).textContent = `Your rate ${data.rating}`;
    // console.log(data.comment.text);
    if (data.comment.text) {
      this._comments++;
      this._createComment(data);
    }
  }

  _createComment(data) {
    const container = document.querySelector(`.film-details__comments-list`);
    document.appendChild(container, CardDetails._getCommentTemplate(data));
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
    const commentsList = template.querySelector(`.film-details__comments-list`);
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

    /* for (const number of this._comments) {
      const comment = CardDetails._getCommentTemplate(this._comments[number]);
      commentsList.insertAdjacentElement(`beforeend`, comment);
    }*/

    return template;
  }

  static _getCommentTemplate(data) {
    const template = document.querySelector(`#comment-template`)
      .content.cloneNode(true).querySelector(`.film-details__comment`);

    template.querySelector(`.film-details__comment-author`).textContent = data.author;
    template.querySelector(`.film-details__comment-text`).textContent = data.text;
    template.querySelector(`.film-details__comment-day`).textContent = data.timestamp;
    template.querySelector(`.film-details__comment-emoji`).textContent = EmojiDict[data.emoji];

    return template;
  }

  set onClose(fn) {
    this._onClose = fn;
  }

  set onUpdate(fn) {
    this._onUpdate = fn;
  }
}
