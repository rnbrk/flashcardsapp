import React from 'react';
import moment from 'moment';

const CardItem = ({ id, dateAdded, front, back }) => (
  <div
    className="card-container"
    id={id}
    onClick={() => {
      console.log(`Clicked card with id ${id}`);
    }}
    role="button"
    tabIndex="0"
  >
    <div>Added: {moment(dateAdded).format('DD MMM YYYY hh:mm')}</div>
    <div>
      <div>{front}</div>
      <div>{back}</div>
    </div>
  </div>
);

export default CardItem;
