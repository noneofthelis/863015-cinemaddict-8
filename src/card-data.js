/** @module ./card-data.js */

import getRandomNumber from './utils.js';

const MAX_RATING = 10;
const MAX_MINUTES = 59;
const FIRST_ELEM_INDEX = 0;

const FilmHours = {
  MIN: 1,
  MAX: 3
};

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
  years: [`1984`, `1932`, `1965`, `2001`, `2019`, `1919`, `1973`],
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
  get title() {
    return this.titles[getRandomNumber(FIRST_ELEM_INDEX, this.titles.length - 1)];
  },
  get description() {
    const sentences = [];
    const randomNumber = getRandomNumber(SentencesNum.MIN, SentencesNum.MAX);
    while (sentences.length < randomNumber) {
      const randomEl = this.descriptions[getRandomNumber(FIRST_ELEM_INDEX, this.descriptions.length - 1)];
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
    return this.genres[getRandomNumber(FIRST_ELEM_INDEX, this.genres.length - 1)];
  },
  get year() {
    return this.years[getRandomNumber(FIRST_ELEM_INDEX, this.years.length - 1)];
  },
  get duration() {
    let minutes = getRandomNumber(0, MAX_MINUTES);
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    return `${getRandomNumber(FilmHours.MIN, FilmHours.MAX)} h. ${minutes} m.`;
  },
  get comments() {
    const number = getRandomNumber(commentsNum.MIN, commentsNum.MAX);
    return number === 1 ? `${number} comment` : `${number} comments`;
  },
  get imageUrl() {
    return `../public/images/posters/${this.images[getRandomNumber(FIRST_ELEM_INDEX, this.images.length - 1)]}.jpg`;
  }
};
