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
      collectionId: this.props.collectionId,
      collectionName: this.props.collectionName,
      dateAdded: moment()
        .startOf('day')
        .valueOf(),
      dateLastStudied: null,
      dateModified: moment()
        .startOf('day')
        .valueOf(),
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
    console.log('this.props.history', this.props.history);
    const { collectionId, collectionName } = this.props;

    if (this.state.userJustPressedSubmit) {
      return <Redirect to={`/collection/${collectionId}`} />;
    }

    return (
      <div>
        <ScreenTitle title="Add Card" subtitle={collectionName} />
        <CardForm
          textBack=""
          textFront=""
          collectionId={collectionId}
          collectionName={collectionName}
          handleSubmit={this.addCardToStore}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ collections }, props) => {
  console.log('AddCard props', props);

  return {
    collectionId: props.match.params.collectionId,
    collectionName: collections[props.match.params.collectionId].name
  };
};

const mapDispatchToProps = dispatch => ({
  startAddCard: card => dispatch(startAddCard(card))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCard);
