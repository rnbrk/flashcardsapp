import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import ActionButton from './ActionButton';
import CardItemList from './CardItemList';
import ScreenTitle from './ScreenTitle';
import { startRemoveCollection } from '../actions/collections';
import { startRemoveAllCardsFromCollection } from '../actions/cards';
import { updateCardsToActiveCollecton } from '../actions/appState';

class EditCollection extends React.Component {
  state = {
    userJustPressedSubmit: false
  };

  componentDidMount() {
    if (this.props.match.params.collectionId) {
      this.props.updateCardsToActiveCollecton(this.props.match.params.collectionId);
    }
  }

  componentDidUpdate() {
    if (this.props.collectionId !== this.props.match.params.collectionId) {
      this.props.updateCardsToActiveCollecton(this.props.match.params.collectionId);
    }
  }

  onHandleRemoveCollection = () => {
    this.props.startRemoveCollection(this.props.collectionId);

    this.setState(() => ({
      userJustPressedSubmit: true
    }));
  };

  handleAddCardButton = () => {
    this.props.history.push(`/collection/${this.props.collectionId}/add`);
  };

  render() {
    if (this.state.userJustPressedSubmit) {
      return <Redirect to={'/'} />;
    }

    return (
      <div>
        <ScreenTitle
          title={'Edit collection'}
          subtitle={this.props.collection ? this.props.collection.name : ''}
        />

        {this.props.cards.length > 0 ? (
          <CardItemList cards={this.props.cards} />
        ) : (
          <div>No cards in this collection</div>
        )}

        <ActionButton handleActionButtonPress={this.handleAddCardButton} />
        <button onClick={this.onHandleRemoveCollection}>Remove collection</button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const collectionId = state.appState.activeCollection;
  const collection = state.collections.find(coll => coll.id === collectionId);
  const cards = state.cards;

  return {
    cards,
    collection,
    collectionId
  };
};

const mapDispatchToProps = dispatch => ({
  updateCardsToActiveCollecton: collectionId =>
    dispatch(updateCardsToActiveCollecton(collectionId)),
  startRemoveCollection: collectionId => dispatch(startRemoveCollection(collectionId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditCollection);
