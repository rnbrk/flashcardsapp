import React from 'react';

import ActionButton from './ActionButton';
import CardItemList from './CardItemList';
import ScreenTitle from './ScreenTitle';

export default class EditCollection extends React.Component {
  cardsDuePerDay = 20;
  collectionName = 'Spanish words';
  id = 'id12345';

  handleAddCardButton = () => {
    this.props.history.push('/add');
  };

  render() {
    return (
      <div>
        <ScreenTitle title={'Edit collection'} subtitle={`Collections > ${this.collectionName}`} />
        <h3>Cards due per day: {this.cardsDuePerDay}</h3>
        <CardItemList />
        <ActionButton handleActionButtonPress={this.handleAddCardButton} />
      </div>
    );
  }
}
