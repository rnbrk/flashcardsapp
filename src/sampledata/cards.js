import uuid from 'uuid';
import moment from 'moment';

const randomInt = () => Math.floor(Math.random() * 10);

const cards = [
  {
    id: uuid(),
    collectionId: 'collection1',
    collectionName: 'Spanish words',
    dateAdded: moment()
      .startOf('day')
      .add(randomInt(), 'hours')
      .add(randomInt(), 'days')
      .valueOf(),
    dateModified: moment()
      .startOf('day')
      .add(randomInt(), 'hours')
      .add(randomInt(), 'days')
      .valueOf(),
    dateLastStudied: null,
    dateNextStudy: null,
    easinessFactor: 2.5,
    intervalInDays: 0,
    timesRepeated: 0,
    textBack: '¡Felicidades!',
    textFront: 'Congratulations!'
  },

  {
    id: uuid(),
    collectionId: 'collection1',
    collectionName: 'Spanish words',
    dateAdded: moment()
      .startOf('day')
      .add(randomInt(), 'hours')
      .add(randomInt(), 'days')
      .valueOf(),
    dateModified: moment()
      .startOf('day')
      .add(randomInt(), 'hours')
      .add(randomInt(), 'days')
      .valueOf(),
    dateLastStudied: null,
    dateNextStudy: null,
    easinessFactor: 2.5,
    intervalInDays: 0,
    timesRepeated: 0,
    textBack: 'Estudia.',
    textFront: 'Study.'
  },

  {
    id: uuid(),
    collectionId: 'collection1',
    collectionName: 'Spanish words',
    dateAdded: moment()
      .startOf('day')
      .add(randomInt(), 'hours')
      .add(randomInt(), 'days')
      .valueOf(),
    dateModified: moment()
      .startOf('day')
      .add(randomInt(), 'hours')
      .add(randomInt(), 'days')
      .valueOf(),
    dateLastStudied: null,
    dateNextStudy: null,
    easinessFactor: 2.5,
    intervalInDays: 0,
    timesRepeated: 0,
    textBack: 'Bienvenida.',
    textFront: 'Welcome.'
  },

  {
    id: uuid(),
    collectionId: 'collection1',
    collectionName: 'Spanish words',
    dateAdded: moment()
      .startOf('day')
      .add(randomInt(), 'hours')
      .add(randomInt(), 'days')
      .valueOf(),
    dateModified: moment()
      .startOf('day')
      .add(randomInt(), 'hours')
      .add(randomInt(), 'days')
      .valueOf(),
    dateLastStudied: null,
    dateNextStudy: null,
    easinessFactor: 2.5,
    intervalInDays: 0,
    timesRepeated: 0,
    textBack: 'Llueve.',
    textFront: 'It is raining.'
  },

  {
    id: uuid(),
    collectionId: 'collection1',
    collectionName: 'Spanish words',
    dateAdded: moment()
      .startOf('day')
      .add(randomInt(), 'hours')
      .add(randomInt(), 'days')
      .valueOf(),
    dateModified: moment()
      .startOf('day')
      .add(randomInt(), 'hours')
      .add(randomInt(), 'days')
      .valueOf(),
    dateLastStudied: null,
    dateNextStudy: null,
    easinessFactor: 2.5,
    intervalInDays: 0,
    timesRepeated: 0,
    textBack: 'Sígueme.',
    textFront: 'Follow me.'
  },

  {
    id: uuid(),
    collectionId: 'collection1',
    collectionName: 'Spanish words',
    dateAdded: moment()
      .startOf('day')
      .add(randomInt(), 'hours')
      .add(randomInt(), 'days')
      .valueOf(),
    dateModified: moment()
      .startOf('day')
      .add(randomInt(), 'hours')
      .add(randomInt(), 'days')
      .valueOf(),
    dateLastStudied: null,
    dateNextStudy: null,
    easinessFactor: 2.5,
    intervalInDays: 0,
    timesRepeated: 0,
    textBack: 'Disculpe.',
    textFront: 'Sorry.'
  }
];

export default cards;
