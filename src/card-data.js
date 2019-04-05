/** @module ./card-data.js */

import util from './utils.js';

const MAX_RATING = 10;
const MAX_MINUTES = 250;
const FIRST_ELEM_INDEX = 0;

const SentencesNum = {
  MIN: 1,
  MAX: 3
};

const commentsNum = {
  MIN: 0,
  MAX: 150
};

export default {
  titles: [`The Mule`,
    `I Am Not a Witch`,
    `The Favourite`,
    `Mission: Impossible – Fallout`,
    `Bisbee ’17`,
    `Burning`,
    `Leave No Trace`,
    `A Prayer Before Dawn`,
    `The Endless`,
    `Paddington 2`,
    `Filmworker`,
    `The Ballad of Buster Scruggs`,
    `24 Frames`,
    `Shoplifters`,
    `A Private War`,
    `Thunder Road`,
    `Eighth Grade`],
  genres: [`horror`, `indian`, `documentary`, `fantasy`, `comedy`, `drama`, `mucho drama`],
  releaseDates: [`1984-12-31`, `1932-09-01`, `1965-04-12`, `2005-08-09`, `2019-01-25`, `1919-08-15`, `1973-11-03`],
  descriptions: [`Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
    `Cras aliquet varius magna, non porta ligula feugiat eget.`,
    `Fusce tristique felis at fermentum pharetra.`,
    `Aliquam id orci ut lectus varius viverra.`,
    `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
    `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
    `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
    `Sed sed nisi sed augue convallis suscipit in sed felis.`,
    `Aliquam erat volutpat.`,
    `Nunc fermentum tortor ac porta dapibus.`,
    `In rutrum ac purus sit amet tempus.`],
  images: [`accused`, `blackmail`, `blue-blazes`, `fuga-da-new-york`, `moonrise`, `three-friends`],
  comments: [
    {
      author: `Tim Macoveev`,
      timestamp: 1554300516370,
      text: `So long-long story, boring!`,
      emoji: `sleeping`,
      removable: false
    }
  ],
  get title() {
    return this.titles[util.getRandomNumber(FIRST_ELEM_INDEX, this.titles.length - 1)];
  },
  get description() {
    const sentences = [];
    const randomNumber = util.getRandomNumber(SentencesNum.MIN, SentencesNum.MAX);
    while (sentences.length < randomNumber) {
      const randomEl = this.descriptions[util.getRandomNumber(FIRST_ELEM_INDEX, this.descriptions.length - 1)];
      if (!sentences.includes(randomEl)) {
        sentences.push(randomEl);
      }
    }
    return sentences.join(` `);
  },
  get rating() {
    return (Math.random() * MAX_RATING).toFixed(2, 10);
  },
  get genre() {
    return this.genres[util.getRandomNumber(FIRST_ELEM_INDEX, this.genres.length - 1)];
  },
  get releaseDate() {
    return this.releaseDates[util.getRandomNumber(FIRST_ELEM_INDEX, this.releaseDates.length - 1)];
  },
  get runtime() {
    return util.getRandomNumber(0, MAX_MINUTES);
  },
  get commentsNumber() {
    return util.getRandomNumber(commentsNum.MIN, commentsNum.MAX);
  },
  get imageUrl() {
    return `./images/posters/${this.images[util.getRandomNumber(FIRST_ELEM_INDEX, this.images.length - 1)]}.jpg`;
  }
};
