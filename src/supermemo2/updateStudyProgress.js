import moment from 'moment';

/*
  Uses the SM-2 algorithmn.

  Input is a card object + a grade from 1 to 5.
  Output is the new interval and updated repeats

  getInterval calculates the next interval when the card should return
  based on how often the card has been repeated, the previous interval and easiness.

  If the user answers incorrectly, how often the card has repeated resets to 0.

  Grades:
  5 correct, easy
  4 correct
  3 correct, hard
  2 incorrect
  1 incorrect, card repeats the same day
  */

const rangeRandomInt = (startRange, endRange) =>
  Math.floor(startRange + Math.random() * (endRange - startRange));

const getDateAsTimestamp = (daysInTheFuture = 0) =>
  moment()
    .add(daysInTheFuture, 'days')
    .valueOf();

const getEasinessFactor = (card, grade) => {
  const intermediateEasinessFactor =
    card.easinessFactor + (0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02));
  return intermediateEasinessFactor < 1.3 ? 1.3 : intermediateEasinessFactor;
};

const getInterval = (card, grade) => {
  let intervalInDays;
  let timesRepeated;

  if (grade >= 3) {
    // user answered correct
    if (card.timesRepeated === 0) {
      intervalInDays = 1;
    } else if (card.timesRepeated === 1) {
      intervalInDays = 6 + rangeRandomInt(-1, 2);
    } else {
      intervalInDays =
        Math.round(card.intervalInDays * card.easinessFactor) + rangeRandomInt(-2, 3);
    }
    timesRepeated = card.timesRepeated + 1;
  } else if (grade === 2) {
    // User answered wrongly
    intervalInDays = 1;
    timesRepeated = 0;
  } else {
    // Card wll repeat the same day
    intervalInDays = 0;
    timesRepeated = 0;
  }

  return {
    intervalInDays,
    timesRepeated
  };
};

const updateStudyProgress = (card, grade) => {
  const { intervalInDays, timesRepeated } = getInterval(card, grade);
  const dateLastStudied = getDateAsTimestamp();
  const dateNextStudy = getDateAsTimestamp(intervalInDays);
  const easinessFactor = getEasinessFactor(card, grade);

  return {
    intervalInDays,
    timesRepeated,
    dateLastStudied,
    dateNextStudy,
    easinessFactor
  };
};

export default updateStudyProgress;
