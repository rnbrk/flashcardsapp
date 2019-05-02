import React from 'react';

import CardItem from './CardItem';

const CardItemList = ({ cards }) => {
  return (
    <div>
      {cards.map(card => (
        <CardItem
          key={card.id}
          id={card.id}
          textFront={card.textFront}
          textBack={card.textBack}
          dateAdded={card.dateAdded}
        />
      ))}
    </div>
  );
};

export default CardItemList;
