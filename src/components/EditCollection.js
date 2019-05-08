import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import ActionButton from './ActionButton';
import CardItemList from './CardItemList';
import { filterCardsCollectionId } from '../selectors/cards';
import { getCollectionFromId } from '../selectors/collections';
import HeaderTitle from './HeaderTitle';
import { startRemoveCollection } from '../actions/collections';

class EditCollection extends React.Component {
  state = {
    userJustPressedSubmit: false
  };

  onHandleRemoveCollection = () => {
    this.props.startRemoveCollection(this.props.collectionId);

    this.setState(() => ({
      userJustPressedSubmit: true
    }));
  };

  handleAddCardButton = () => {
    this.props.history.push(`/collection/add/${this.props.collectionId}`);
  };

  render() {
    if (this.state.userJustPressedSubmit) {
      return <Redirect to={'/dashboard'} />;
    }

    if (!this.props.collectionId) {
      return <Redirect to={'/404'} />;
    }

    return (
      <div>
        <HeaderTitle
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
  const collection = getCollectionFromId(state.collections, collectionId);
  const cards = filterCardsCollectionId(state.cards, collectionId);

  return {
    cards,
    collection,
    collectionId
  };
};

const mapDispatchToProps = dispatch => ({
  startRemoveCollection: collectionId => dispatch(startRemoveCollection(collectionId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditCollection);
