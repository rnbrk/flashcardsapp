import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { addCard } from '../actions/cards';
import CardForm from './CardForm';
import ScreenTitle from './ScreenTitle';

class AddCard extends React.Component {
  state = {
    userJustPressedSubmit: false
  };

  addCardToStore = card => {
    this.props.addCard(card);
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
  addCard: card => dispatch(addCard(card))
});

export default connect(
  undefined,
  mapDispatchToProps
)(AddCard);
