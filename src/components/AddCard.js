import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Redirect } from 'react-router-dom';
import uuid from 'uuid';

import { startAddCard } from '../actions/cards';
import CardForm from './CardForm';
import ScreenTitle from './ScreenTitle';

class AddCard extends React.Component {
  state = {
    userJustPressedSubmit: false
  };

  addCardToStore = (textFront, textBack) => {
    const card = {
      collectionId: 'collection1',
      collectionName: 'Spanish words',
      dateAdded: moment()
        .startOf('day')
        .valueOf(),
      dateLastStudied: null,
      dateModified: moment()
        .startOf('day')
        .valueOf(),
      dateNextStudy: null,
      easinessFactor: 2.5,
      // id: uuid(),
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
    const { collectionName } = this.props;

    if (this.state.userJustPressedSubmit) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <ScreenTitle title="Add Card" subtitle={`Collections > ${collectionName}`} />
        <CardForm
          textBack=""
          textFront=""
          collectionId="collection1"
          collectionName={collectionName}
          handleSubmit={this.addCardToStore}
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  startAddCard: card => dispatch(startAddCard(card))
});

export default connect(
  undefined,
  mapDispatchToProps
)(AddCard);
