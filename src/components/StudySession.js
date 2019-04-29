import React from 'react';
import { connect } from 'react-redux';

import ActionButton from '../components/ActionButton';
import { answerCard } from '../actions/cards';
import { getCardsForStudy } from '../selectors/study';
import ScreenTitle from './ScreenTitle';

class StudySession extends React.Component {
  state = {
    userHasReadFrontOfCard: false,
    currentCard: undefined,
    currentCardIndex: 0
  };

  onHandleSubmit = () => {
    this.setState(() => ({
      userHasReadFrontOfCard: true
    }));
  };

  onHandleCorrect = () => {
    this.props.answerCard(this.props.cards[this.state.currentCardIndex].id, 4);
    this.setState(() => ({
      userHasReadFrontOfCard: false,
      currentCardIndex: this.state.currentCardIndex + 1
    }));
  };

  onHandleFalse = () => {
    this.props.answerCard(this.props.cards[this.state.currentCardIndex].id, 2);
    this.setState(() => ({
      userHasReadFrontOfCard: false,
      currentCardIndex: this.state.currentCardIndex + 1
    }));
  };

  render() {
    console.log(this.props.cards);

    const { collectionName } = this.props;
    const percentageComplete = (this.state.currentCardIndex / this.props.cards.length) * 100;

    if (this.state.currentCardIndex >= this.props.cards.length) {
      return (
        <div>
          <ScreenTitle title="Study" subtitle={`Collections > ${collectionName}`} />
          <div>Done!</div>
        </div>
      );
    }

    return (
      <div>
        <ScreenTitle title="Study" subtitle={`Collections > ${collectionName}`} />

        <div
          className="progress"
          data-label={`${this.state.currentCardIndex} of ${this.props.cards.length} complete`}
        >
          <span className="value" style={{ width: `${percentageComplete}%` }} />
        </div>

        <form onSubmit={this.handlesubmit}>
          <label>
            Front
            <textarea
              value={this.props.cards[this.state.currentCardIndex].textFront}
              name="textFront"
              disabled
            />
          </label>

          {this.state.userHasReadFrontOfCard && (
            <label>
              Back
              <textarea
                value={this.props.cards[this.state.currentCardIndex].textBack}
                name="textBack"
                disabled
              />
            </label>
          )}

          {this.state.userHasReadFrontOfCard || (
            <ActionButton handleActionButtonPress={this.onHandleSubmit} />
          )}

          {this.state.userHasReadFrontOfCard && (
            <div>
              <button type="button" onClick={this.onHandleCorrect}>
                Correct
              </button>
              <button type="button" onClick={this.onHandleFalse}>
                False
              </button>
            </div>
          )}
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  cards: getCardsForStudy(state.cards, 20)
});

const mapDispatchToProps = dispatch => ({
  answerCard: (id, grade) => dispatch(answerCard(id, grade))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudySession);
