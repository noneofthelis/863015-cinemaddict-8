/** @module ./component */

export default class Component {
  constructor() {
    if (new.target === Component) {
      throw new Error(`Can't instantiate Component, only concrete one.`);
    }
    this._element = null;
    this._state = {
      isFavourite: false,
      isWatched: false,
      inWatchlist: false
    };
  }

  render() {
    this._element = this.template;
    this._addListener();
    return this._element;
  }

  _addListener() {}

  get template() {
    throw new Error(`You have to define template.`);
  }

}
