import React from 'react';
import { connect } from 'react-redux';

import ActionButton from './ActionButton';
import { addCollection } from '../actions/collections';
import CardItemList from './CardItemList';
import { getCardsFromCollectionId } from '../selectors/study';
import ScreenTitle from './ScreenTitle';
import { startSetCards } from '../actions/cards';
import { setDailyStudyLimit } from '../actions/collections';

class EditCollection extends React.Component {
  state = {
    dailyStudyLimit: this.props.dailyStudyLimit,
    collectionId: this.props.collectionId // State only used to detect changes in card collection
  };

  componentDidMount() {
    this.props.startSetCards(this.props.collectionId);
  }

  componentDidUpdate() {
    if (this.state.collectionId !== this.props.collectionId) {
      this.props.startSetCards(this.props.collectionId);
      this.setState(() => ({
        collectionId: this.props.collectionId,
        dailyStudyLimit: this.props.dailyStudyLimit
      }));
    }
  }

  handleAddCardButton = () => {
    this.props.history.push(`/collection/${this.props.collectionId}/add`);
  };

  handleChangeDailyStudyLimit = event => {
    let dailyStudyLimit = Number(event.target.value);
    this.setState(() => ({ dailyStudyLimit }));
  };

  handleSubmitDailyStudyLimit = event => {
    this.props.setDailyStudyLimit(this.props.dailyStudyLimit, this.props.collectionId);
    event.preventDefault();
  };

  render() {
    return (
      <div>
        <ScreenTitle title={'Edit collection'} subtitle={this.props.collectionName} />

        <form onSubmit={this.handleSubmitDailyStudyLimit}>
          <label>
            Cards due per day:
            <input
              type="text"
              name="daily-study-limit"
              value={this.state.dailyStudyLimit}
              onChange={this.handleChangeDailyStudyLimit}
            />
          </label>
          <button>Submit</button>
        </form>

        <CardItemList cards={this.props.cards} />
        <ActionButton handleActionButtonPress={this.handleAddCardButton} />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  dailyStudyLimit: state.collections[props.match.params.collectionId].dailyStudyLimit,
  cards: getCardsFromCollectionId(state.cards, props.match.params.collectionId),
  collectionName: state.collections[props.match.params.collectionId].name,
  collectionId: props.match.params.collectionId
});

const mapDispatchToProps = dispatch => ({
  startSetCards: collectionId => dispatch(startSetCards(collectionId)),
  setDailyStudyLimit: (collectionId, dailyStudyLimit) =>
    dispatch(setDailyStudyLimit(collectionId, dailyStudyLimit))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditCollection);
