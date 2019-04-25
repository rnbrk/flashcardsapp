import React from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid';

import CardItem from './CardItem';

const CardItemList = ({ cards }) => {
  console.log(cards);
  return (
    <div>
      {cards.map(card => (
        <CardItem
          key={uuid()}
          id={card.id}
          front={card.front}
          back={card.back}
          dateAdded={card.dateAdded}
        />
      ))}
    </div>
  );
};

const mapStateToProps = ({ cards }) => ({
  cards
});

export default connect(mapStateToProps)(CardItemList);
