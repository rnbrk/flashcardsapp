import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Redirect } from 'react-router-dom';

import { startEditCard, startRemoveCard } from '../actions/cards';
import CardForm from './CardForm';
import ScreenTitle from './ScreenTitle';

class EditCard extends React.Component {
  state = {
    userJustPressedSubmit: false,
    card: undefined
  };

  onHandleSubmit = () => {
    this.setState(() => ({
      userJustPressedSubmit: true
    }));
  };

  onHandleRemoveCard = () => {
    this.props.startRemoveCard(this.props.match.params.cardId);
    this.onHandleSubmit();
  };

  updateCardInStore = (textFront, textBack) => {
    const card = {
      dateModified: moment()
        .startOf('day')
        .valueOf(),
      textBack,
      textFront
    };

    this.props.startEditCard(this.props.match.params.cardId, card);
    this.onHandleSubmit();
  };

  render() {
    if (this.state.userJustPressedSubmit) {
      return <Redirect to={`/collection/${this.props.card.collectionId}`} />;
    }

    return (
      <div>
        {this.props.card ? (
          <div>
            <ScreenTitle title="Edit Card" subtitle={this.props.card.collectionName} />
            <CardForm
              textFront={this.props.card.textFront}
              textBack={this.props.card.textBack}
              handleSubmit={this.updateCardInStore}
            />
          </div>
        ) : (
          <p>Loading...</p>
        )}
        <button onClick={this.onHandleRemoveCard}>Remove card</button>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  card: state.cards.find(card => card.id === props.match.params.cardId)
});

const mapDispatchToProps = dispatch => ({
  startEditCard: (cardId, updates) => dispatch(startEditCard(cardId, updates)),
  startRemoveCard: cardId => dispatch(startRemoveCard(cardId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditCard);
