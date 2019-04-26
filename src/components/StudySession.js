import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import ScreenTitle from './ScreenTitle';
import ActionButton from '../components/ActionButton';

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
    this.setState(() => ({
      userHasReadFrontOfCard: false,
      currentCardIndex: this.state.currentCardIndex + 1
    }));
  };

  onHandleFalse = () => {
    this.setState(() => ({
      userHasReadFrontOfCard: false,
      currentCardIndex: this.state.currentCardIndex + 1
    }));
  };

  render() {
    console.log(this.props.match);

    const { collectionName } = this.props;

    const percentageComplete = (this.state.currentCardIndex / this.props.cards.length) * 100;

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
              value={this.props.cards[this.state.currentCardIndex].front}
              name="frontText"
              disabled
            />
          </label>

          {this.state.userHasReadFrontOfCard && (
            <label>
              Back
              <textarea
                value={this.props.cards[this.state.currentCardIndex].back}
                name="backText"
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
  cards: state.cards
});

// const mapDispatchToProps = dispatch => ({
//   editCard: (id, updates) => dispatch(editCard(id, updates)),
//   removeCard: id => dispatch(removeCard(id))
// });

export default connect(mapStateToProps)(StudySession);
// mapStateToProps,
// mapDispatchToProps
