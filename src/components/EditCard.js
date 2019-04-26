import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { editCard, removeCard } from '../actions/cards';
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
    this.props.removeCard(this.props.match.params.id);
    this.onHandleSubmit();
  };

  updateCardInStore = card => {
    this.props.editCard(this.props.match.params.id, card);
    this.onHandleSubmit();
  };

  render() {
    console.log(this.props.match);

    const { collectionName } = this.props;

    if (this.state.userJustPressedSubmit) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <ScreenTitle title="Edit Card" subtitle={`Collections > ${collectionName}`} />
        {this.props.card ? (
          <CardForm
            textFront={this.props.card.textFront}
            textBack={this.props.card.textBack}
            handleSubmit={this.updateCardInStore}
          />
        ) : (
          <p>Loading...</p>
        )}
        <button onClick={this.onHandleRemoveCard}>Remove card</button>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  card: state.cards.find(card => card.id === props.match.params.id)
});

const mapDispatchToProps = dispatch => ({
  editCard: (id, updates) => dispatch(editCard(id, updates)),
  removeCard: id => dispatch(removeCard(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditCard);
