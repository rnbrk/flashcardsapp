import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Redirect } from 'react-router-dom';

import { startAddCard } from '../actions/cards';
import CardForm from './CardForm';
import ScreenTitle from './ScreenTitle';

class AddCard extends React.Component {
  state = {
    userJustPressedSubmit: false
  };

  addCardToStore = (textFront, textBack) => {
    const card = {
      collectionId: this.props.collection.id,
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
    this.setState(() => ({
      userJustPressedSubmit: true
    }));
  };

  render() {
    if (this.state.userJustPressedSubmit) {
      return <Redirect to={`/collection/${this.props.collection.id}`} />;
    }

    return (
      <div>
        <ScreenTitle title="Add Card" subtitle={this.props.collection.name} />
        <CardForm
          textBack=""
          textFront=""
          collectionId={this.props.collection.id}
          collectionName={this.props.collection.name}
          handleSubmit={this.addCardToStore}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    collectionId: props.match.params.collectionId,
    collection: state.collections.find(coll => coll.id === props.match.params.collectionId)
  };
};

const mapDispatchToProps = dispatch => ({
  startAddCard: card => dispatch(startAddCard(card))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCard);
