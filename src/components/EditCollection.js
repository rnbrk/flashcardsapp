import React from 'react';
import { connect } from 'react-redux';

import ActionButton from './ActionButton';
import CardItemList from './CardItemList';
import ScreenTitle from './ScreenTitle';
import { startSetCards } from '../actions/cards';

class EditCollection extends React.Component {
  cardsDuePerDay = 20;
  collectionName = 'Spanish words';
  collectionId = 'collection1';

  componentDidMount() {
    this.props.startSetCards(this.collectionId);
  }

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

const mapDispatchToProps = dispatch => ({
  startSetCards: collectionId => {
    dispatch(startSetCards(collectionId));
  }
});

export default connect(
  undefined,
  mapDispatchToProps
)(EditCollection);
