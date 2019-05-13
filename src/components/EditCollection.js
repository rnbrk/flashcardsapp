import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import ActionButton from './ActionButton';
import CardItemList from './CardItemList';
import { filterCardsCollectionId } from '../selectors/cards';
import { getCollectionFromId } from '../selectors/collections';
import WrapperPageContent from './WrapperPageContent';
import { startRemoveCollection } from '../actions/collections';

class EditCollection extends React.Component {
  state = {
    userPressedSubmit: false
  };

  onHandleRemoveCollection = () => {
    this.props.startRemoveCollection(this.props.activeCollectionId);

    this.setState(() => ({
      userJustPressedSubmit: true
    }));
  };

  handleAddCardButton = () => {
    this.props.history.push(`/collection/add/${this.props.activeCollectionId}`);
  };

  render() {
    const hasActiveCollection = this.props.activeCollectionId;
    const hasCardsInCollection = this.props.cards.length > 0;
    const userPressedSubmit = this.state.userPressedSubmit;

    if (userPressedSubmit) {
      return <Redirect to={'/dashboard'} />;
    }

    if (!hasActiveCollection) {
      return <Redirect to={'/404'} />;
    }

    return (
      <WrapperPageContent>
        {hasCardsInCollection ? (
          <CardItemList cards={this.props.cards} />
        ) : (
          <div>No cards in this collection</div>
        )}

        <ActionButton handleActionButtonPress={this.handleAddCardButton} />
        <button className="button button--secondary" onClick={this.handleAddCardButton}>
          Add card
        </button>
        <button className="button button--white" onClick={this.onHandleRemoveCollection}>
          Remove collection
        </button>
      </WrapperPageContent>
    );
  }
}

const mapStateToProps = state => {
  const activeCollectionId = state.appState.activeCollection;
  const collection = getCollectionFromId(state.collections, activeCollectionId);
  const cards = filterCardsCollectionId(state.cards, activeCollectionId);

  return {
    cards,
    collection,
    activeCollectionId
  };
};

const mapDispatchToProps = dispatch => ({
  startRemoveCollection: collectionId => dispatch(startRemoveCollection(collectionId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditCollection);
