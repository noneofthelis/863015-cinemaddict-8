/** @module ./component */

export default class Component {
  constructor() {
    if (new.target === Component) {
      throw new Error(`Can't instantiate Component, only concrete one.`);
    }
    this._element = null;
    this._userData = {
      rating: null,
      comment: null,
      state: {
        isFavourite: false,
        isWatched: false,
        inWatchlist: false
      }

    };
  }

  render() {
    this._element = this.template;
    this._addListeners();
    return this._element;
  }

  removeElement() {
    this._removeListeners();
    this._element.remove();
    this._element = null;
  }

  updateUserData(data) {
    this._userData = data;
  }

  _addListeners() {}

  _removeListeners() {}

  get template() {
    throw new Error(`You have to define template.`);
  }

}
