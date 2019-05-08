import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Redirect } from 'react-router-dom';

import CardForm from './CardForm';
import { getCollectionFromId } from '../selectors/collections';
import HeaderTitle from './HeaderTitle';
import { startAddCard } from '../actions/cards';

class AddCard extends React.Component {
  state = { userPressedSubmit: false };

  addCardToStore = (textFront, textBack) => {
    const card = {
      collectionId: this.props.activeCollectionId,
      collectionName: this.props.collection.name,
      dateAdded: moment().valueOf(),
      dateLastStudied: null,
      dateModified: moment().valueOf(),
      dateNextStudy: null,
      easinessFactor: 2.5,
      intervalInDays: 0,
      textBack,
      textFront,
      timesRepeated: 0
    };

    this.props.startAddCard(card);
    this.setState(() => ({ userPressedSubmit: true }));
  };

  render() {
    const hasActiveCollection = this.props.activeCollectionId;
    const userPressedSubmit = this.state.userPressedSubmit;

    if (!hasActiveCollection) {
      return <Redirect to={'/404'} />;
    }

    if (userPressedSubmit) {
      return <Redirect to={`/collection/${this.props.collection.id}`} />;
    }

    return (
      <div>
        <HeaderTitle title="Add Card" subtitle={this.props.collection.name} />
        <CardForm handleSubmit={this.addCardToStore} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const activeCollectionId = state.appState.activeCollection;
  const collection = getCollectionFromId(state.collections, activeCollectionId);

  return {
    activeCollectionId,
    collection
  };
};

const mapDispatchToProps = dispatch => ({
  startAddCard: card => dispatch(startAddCard(card))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCard);
