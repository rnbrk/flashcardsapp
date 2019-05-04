import React from 'react';
import { connect } from 'react-redux';

import ActionButton from '../components/ActionButton';

import {
  filterCardsDueToday,
  filterCardsRepeatedToday,
  filterCardsStudiedToday
} from '../selectors/study';

import { updateCardsToActiveCollecton } from '../actions/appState';
import { startAnswerCard } from '../actions/cards';

import ScreenTitle from './ScreenTitle';

class StudySession extends React.Component {
  state = {
    userHasReadFrontOfCard: false
  };

  componentDidMount() {
    if (this.props.match.params.collectionId) {
      this.props.updateCardsToActiveCollecton(this.props.match.params.collectionId);
    }
  }

  componentDidUpdate() {
    if (this.props.collectionId !== this.props.match.params.collectionId) {
      this.props.updateCardsToActiveCollecton(this.props.match.params.collectionId);
    }
  }

  onHandleSubmit = () => {
    this.setState(() => ({
      userHasReadFrontOfCard: true
    }));
  };

  onHandleAnswer = event => {
    const grade = Number(event.target.getAttribute('grade'));
    this.props.startAnswerCard(this.props.currentCard, grade);

    this.setState(() => ({
      userHasReadFrontOfCard: false
    }));
  };

  render() {
    if (this.props.currentCard) {
      const numCardsStudied = this.props.cardsStudiedToday.length;
      const numCardsDue = this.props.cardsDueToday.length - this.props.cardsRepeatedToday.length;
      const numCardsRepeated = this.props.cardsRepeatedToday.length;
      const numCardsTotal = numCardsStudied + numCardsDue + numCardsRepeated;

      const percentageStudied = (numCardsStudied / numCardsTotal) * 100;
      const percentageRepeated = (numCardsRepeated / numCardsTotal) * 100;

      return (
        <div>
          <ScreenTitle title="Study" subtitle={this.props.collection.name} />

          <div
            className="progress"
            data-label={`Cards: 
            ${numCardsStudied} studied. 
            ${numCardsDue} due.
            ${numCardsRepeated} to repeat.
            `}
          >
            <span className="studied" style={{ width: `${percentageStudied}%` }} />
            <span className="repeated" style={{ width: `${percentageRepeated}%` }} />
          </div>

          <form onSubmit={this.handlesubmit}>
            <label>
              Front
              <textarea value={this.props.currentCard.textFront} name="textFront" disabled />
            </label>

            {this.state.userHasReadFrontOfCard && (
              <label>
                Back
                <textarea value={this.props.currentCard.textBack} name="textBack" disabled />
              </label>
            )}

            {this.state.userHasReadFrontOfCard || (
              <ActionButton handleActionButtonPress={this.onHandleSubmit} />
            )}

            {this.state.userHasReadFrontOfCard && (
              <div>
                <button type="button" grade="5" onClick={this.onHandleAnswer}>
                  Easy
                </button>
                <button type="button" grade="4" onClick={this.onHandleAnswer}>
                  Correct
                </button>
                <button type="button" grade="3" onClick={this.onHandleAnswer}>
                  Hard
                </button>

                <button type="button" grade="2" onClick={this.onHandleAnswer}>
                  False
                </button>
                <button type="button" grade="1" onClick={this.onHandleAnswer}>
                  Again
                </button>
              </div>
            )}
          </form>
        </div>
      );
    }

    return <div>Loading</div>;
  }
}

const mapStateToProps = state => {
  const collectionId = state.appState.activeCollection;
  const collection = state.collections.find(coll => coll.id === collectionId);

  const cardsDueToday = filterCardsDueToday(state.cards, collectionId);
  const cardsRepeatedToday = filterCardsRepeatedToday(state.cards, collectionId);
  const cardsStudiedToday = filterCardsStudiedToday(state.cards, collectionId);

  const { 0: currentCard } = cardsDueToday;

  return {
    collectionId,
    collection,
    cardsDueToday,
    cardsRepeatedToday,
    cardsStudiedToday,
    currentCard
  };
};

const mapDispatchToProps = dispatch => ({
  updateCardsToActiveCollecton: collectionId =>
    dispatch(updateCardsToActiveCollecton(collectionId)),
  startAnswerCard: (card, grade) => dispatch(startAnswerCard(card, grade))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudySession);
