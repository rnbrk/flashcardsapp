import React from 'react';

import CardForm from './CardForm';
import ScreenTitle from './ScreenTitle';

const AddCard = ({ collectionName }) => (
  <div>
    <ScreenTitle title="Add Card" subtitle={`Collections > ${collectionName}`} />
    <CardForm frontText="1" backText="2" />
  </div>
);

export default AddCard;
