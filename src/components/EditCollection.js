import React from 'react';
import { connect } from 'react-redux';

import ActionButton from './ActionButton';
import CardItemList from './CardItemList';
import ScreenTitle from './ScreenTitle';
import { updateCardsToActiveCollecton } from '../actions/appState';

class EditCollection extends React.Component {
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

  handleAddCardButton = () => {
    this.props.history.push(`/collection/${this.props.collectionId}/add`);
  };

  render() {
    if (this.props.cards) {
      return (
        <div>
          <ScreenTitle title={'Edit collection'} subtitle={this.props.collectionName} />
          <CardItemList cards={this.props.cards} />
          <ActionButton handleActionButtonPress={this.handleAddCardButton} />
        </div>
      );
    }
    return <div>Loading</div>;
  }
}

const mapStateToProps = state => {
  const collectionId = state.appState.activeCollection;
  const collection = state.collections.find(coll => coll.id === collectionId);
  const cards = state.cards;

  return {
    cards,
    collection,
    collectionId
  };
};

const mapDispatchToProps = dispatch => ({
  updateCardsToActiveCollecton: collectionId => dispatch(updateCardsToActiveCollecton(collectionId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditCollection);
