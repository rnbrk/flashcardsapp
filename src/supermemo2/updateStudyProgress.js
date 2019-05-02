import moment from 'moment';

const rangeRandomInt = (startRange, endRange) =>
  Math.floor(startRange + Math.random() * (endRange - startRange));

const updateStudyProgress = (card, grade) => {
  let intervalInDays;
  let timesRepeated;

  // Update interval and times card has repeated
  if (grade >= 3) {
    if (card.timesRepeated === 0) {
      intervalInDays = 1;
    } else if (card.timesRepeated === 1) {
      intervalInDays = 6 + rangeRandomInt(-1, 2);
    } else {
      intervalInDays =
        Math.round(card.intervalInDays * card.easinessFactor) + rangeRandomInt(-2, 3);
    }
    timesRepeated = card.timesRepeated + 1;
  } else {
    timesRepeated = 0;
    intervalInDays = 1;
  }

  // Update dates
  const dateLastStudied = moment()
    .startOf('day')
    .valueOf();
  const dateNextStudy = moment()
    .startOf('day')
    .add(intervalInDays, 'days')
    .valueOf();

  // Update card difficulty
  const intermediateEasinessFactor =
    card.easinessFactor + (0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02));
  const easinessFactor = intermediateEasinessFactor < 1.3 ? 1.3 : intermediateEasinessFactor;

  return {
    intervalInDays,
    timesRepeated,
    dateLastStudied,
    dateNextStudy,
    easinessFactor
  };
};

export default updateStudyProgress;
