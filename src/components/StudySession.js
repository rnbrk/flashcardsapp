import React from 'react';
import { connect } from 'react-redux';

import ActionButton from '../components/ActionButton';
import { startAnswerCard } from '../actions/cards';
import { getCardsToStudy, incrementCardsStudied, repeatCard } from '../actions/collections';
import ScreenTitle from './ScreenTitle';

class StudySession extends React.Component {
  state = {
    userHasReadFrontOfCard: false
  };

  componentDidMount() {
    if (this.props.cardsToStudyToday.length === 0) {
      this.props.getCardsToStudy(this.props.collectionId);
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
    const percentageComplete =
      (this.props.indexOfCurrentCard / this.props.cardsToStudyToday.length) * 100;

    if (
      this.props.cardsToStudyToday.length > 0 &&
      this.props.indexOfCurrentCard >= this.props.cardsToStudyToday.length
    ) {
      return (
        <div>
          <ScreenTitle title="Study" subtitle={`Collections > ${this.props.collectionName}`} />
          <div>Done!</div>
        </div>
      );
    }

    if (this.props.currentCard) {
      return (
        <div>
          <ScreenTitle title="Study" subtitle={this.props.collectionName} />

          <div
            className="progress"
            data-label={`${this.props.indexOfCurrentCard} of ${
              this.props.cardsToStudyToday.length
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

    return (
      <div>
        <ScreenTitle title="Study" subtitle={this.props.collectionName} />
        <div>Loading</div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const collectionId = props.match.params.collectionId;
  const collectionName = state.collections[collectionId].name;
  const cardsToStudyToday = state.collections[collectionId].cardsToStudyToday;
  const indexOfCurrentCard = state.collections[collectionId].indexOfCurrentCard;
  const currentCard = state.cards.find(card => card.id === cardsToStudyToday[indexOfCurrentCard]);

  console.log('indexOfCurrentCard', indexOfCurrentCard);

  return {
    collectionId,
    cardsToStudyToday,
    collectionName,
    indexOfCurrentCard,
    currentCard
  };
};

const mapDispatchToProps = dispatch => ({
  startAnswerCard: (card, grade) => dispatch(startAnswerCard(card, grade)),
  getCardsToStudy: collectionId => dispatch(getCardsToStudy(collectionId)),
  incrementCardsStudied: collectionId => dispatch(incrementCardsStudied(collectionId)),
  repeatCard: (cardId, collectionId) => dispatch(repeatCard(cardId, collectionId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudySession);
