import moment from 'moment';

const rangeRandomInt = (startRange, endRange) =>
  Math.floor(startRange + Math.random() * (endRange - startRange));

const updateStudyProgress = (oldCard, grade) => {
  const card = { ...oldCard };

  // Update interval and times card has repeated
  if (grade >= 3) {
    card.timesRepeated += 1;

    if (card.timesRepeated === 0) {
      card.intervalInDays = 1;
    } else if (card.timesRepeated === 1) {
      card.intervalInDays = 6 + rangeRandomInt(-1, 2);
    } else {
      card.intervalInDays =
        Math.round(card.intervalInDays * card.easinessFactor) + rangeRandomInt(-2, 3);
    }
  } else {
    card.timesRepeated = 0;
    card.intervalInDays = 1;
  }

  // Update dates
  card.dateLastStudied = moment().startOf('day');
  card.dateNextStudy = moment()
    .startOf('day')
    .add(card.intervalInDays, 'days');

  // Update card difficulty
  const newEasinessFactor = card.easinessFactor + (0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02));
  card.easinessFactor = newEasinessFactor < 1.3 ? 1.3 : newEasinessFactor;

  return card;
};

export default updateStudyProgress;
