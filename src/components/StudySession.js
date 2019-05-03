import React from 'react';
import { connect } from 'react-redux';

import ActionButton from '../components/ActionButton';
import { updateCardsToActiveCollecton } from '../actions/appState';
import { startAnswerCard } from '../actions/cards';
import { getCardsToStudy, incrementCardsStudied, repeatCard } from '../actions/collections';
import ScreenTitle from './ScreenTitle';

class StudySession extends React.Component {
  state = {
    userHasReadFrontOfCard: false
  };

  componentDidMount() {
    if (this.props.match.params.collectionId) {
      this.props.updateCardsToActiveCollecton(this.props.match.params.collectionId);
      this.props.getCardsToStudy(this.props.match.params.collectionId);
    }
  }

  componentDidUpdate() {
    if (this.props.collectionId !== this.props.match.params.collectionId) {
      this.props.updateCardsToActiveCollecton(this.props.match.params.collectionId);
      this.props.getCardsToStudy(this.props.match.params.collectionId);
    }
  }

  onHandleSubmit = () => {
    this.setState(() => ({
      userHasReadFrontOfCard: true
    }));
  };

  onHandleAnswer = event => {
    // Handles both correct and false answers
    const grade = Number(event.target.getAttribute('grade'));
    this.props.startAnswerCard(this.props.currentCard, grade);
    this.props.incrementCardsStudied(this.props.collectionId);

    // Just for the again option:
    if (grade === 1) {
      this.props.repeatCard(this.props.currentCard.id, this.props.collectionId);
    }

    this.setState(() => ({
      userHasReadFrontOfCard: false
    }));
  };

  render() {
    if (this.props.currentCard) {
      const percentageComplete =
        (this.props.collection.indexOfCurrentCard /
          this.props.collection.cardsToStudyToday.length) *
        100;

      if (
        this.props.collection.cardsToStudyToday.length > 0 &&
        this.props.collection.indexOfCurrentCard >= this.props.collection.cardsToStudyToday.length
      ) {
        return (
          <div>
            <ScreenTitle title="Study" subtitle={`Collections > ${this.props.collection.name}`} />
            <div>Done!</div>
          </div>
        );
      }

      return (
        <div>
          <ScreenTitle title="Study" subtitle={this.props.collection.name} />

          <div
            className="progress"
            data-label={`${this.props.collection.indexOfCurrentCard} of ${
              this.props.collection.cardsToStudyToday.length
            } complete`}
          >
            <span className="studied" style={{ width: `${percentageComplete}%` }} />
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
  const currentCard = state.cards.find(
    card => card.id === collection.cardsToStudyToday[collection.indexOfCurrentCard]
  );

  console.log('collection', collection);
  console.log('currentCard', currentCard);

  return {
    collectionId,
    collection,
    currentCard
  };
};

const mapDispatchToProps = dispatch => ({
  updateCardsToActiveCollecton: collectionId =>
    dispatch(updateCardsToActiveCollecton(collectionId)),
  startAnswerCard: (card, grade) => dispatch(startAnswerCard(card, grade)),
  getCardsToStudy: collectionId => dispatch(getCardsToStudy(collectionId)),
  incrementCardsStudied: collectionId => dispatch(incrementCardsStudied(collectionId)),
  repeatCard: (cardId, collectionId) => dispatch(repeatCard(cardId, collectionId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudySession);
