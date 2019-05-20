import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import ActionButton from '../components/ActionButton';
import CardItemList from '../components/CardItemList';
import { filterCardsCollectionId } from '../selectors/cards';
import { getCollectionFromId } from '../selectors/collections';
import WrapperPageContent from '../layout/WrapperPageContent';
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
          <article className="card margin-bottom-small">
            <div className="card__top" />
            <div className="card__text-content card__text-contentfront">
              No cards in this collection
            </div>
          </article>
        )}

        <ActionButton handleActionButtonPress={this.handleAddCardButton} />

        <div className="gutter-children-very-small">
          <button className="button button--secondary" onClick={this.handleAddCardButton}>
            Add card
          </button>
          <button className="button button--white" onClick={this.onHandleRemoveCollection}>
            Remove collection
          </button>
        </div>
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
