import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import ActionButton from './ActionButton';
import LoadingPage from './LoadingPage';

import {
  filterCardsDueToday,
  filterCardsRepeatedToday,
  filterCardsStudiedToday
} from '../selectors/cards';

import { startAnswerCard } from '../actions/cards';

import HeaderTitle from './HeaderTitle';

class StudySession extends React.Component {
  state = {
    userHasReadFrontOfCard: false
  };

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
    if (!this.props.collectionId) {
      return <Redirect to={'/404'} />;
    }

    // Study if card data and collection data is present
    if (this.props.currentCard && this.props.collection) {
      return (
        <div>
          <HeaderTitle title="Study" subtitle={this.props.collection.name} />

          <div
            className="progress"
            data-label={`Cards: 
            ${this.props.numCardsStudied} studied. 
            ${this.props.numCardsDue} due.
            ${this.props.numCardsRepeated} to repeat.
            `}
          >
            <span className="studied" style={{ width: `${this.props.percentageStudied}%` }} />
            <span className="repeated" style={{ width: `${this.props.percentageRepeated}%` }} />
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
    // without card data user is either done or has not added cards
    if (this.props.collection) {
      return (
        <div>
          <HeaderTitle title="Study" subtitle={this.props.collection.name} />

          {this.props.numCardsTotal > 0 ? (
            <span>Done!</span>
          ) : (
            <span>Please add cards to study.</span>
          )}
        </div>
      );
    }

    // if no data is present, still waiting for data
    return (
      <div>
        <HeaderTitle
          title="Study"
          subtitle={this.props.collection ? this.props.collection.name : ''}
        />
        <LoadingPage />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const collectionId = state.appState.activeCollection;
  const collection = state.collections.find(coll => coll.id === collectionId);
  const cards = state.cards;

  const cardsDueToday = filterCardsDueToday(state.cards, collectionId);
  const cardsRepeatedToday = filterCardsRepeatedToday(state.cards, collectionId);
  const cardsStudiedToday = filterCardsStudiedToday(state.cards, collectionId);

  const numCardsStudied = cardsStudiedToday ? cardsStudiedToday.length : 0;
  const numCardsDue = cardsDueToday ? cardsDueToday.length - cardsRepeatedToday.length : 0;
  const numCardsRepeated = cardsRepeatedToday ? cardsRepeatedToday.length : 0;
  const numCardsTotal = numCardsStudied + numCardsDue + numCardsRepeated;

  const percentageStudied = (numCardsStudied / numCardsTotal) * 100;
  const percentageRepeated = (numCardsRepeated / numCardsTotal) * 100;

  const { 0: currentCard } = cardsDueToday;

  return {
    collectionId,
    collection,
    cards,
    cardsDueToday,
    cardsRepeatedToday,
    cardsStudiedToday,
    currentCard,
    numCardsStudied,
    numCardsDue,
    numCardsRepeated,
    numCardsTotal,
    percentageStudied,
    percentageRepeated
  };
};

const mapDispatchToProps = dispatch => ({
  startAnswerCard: (card, grade) => dispatch(startAnswerCard(card, grade))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudySession);
