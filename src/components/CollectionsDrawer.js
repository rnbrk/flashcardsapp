import React from 'react';
import { connect } from 'react-redux';

import WrapperNavDrawer from '../layout/WrapperNavDrawer';
import Loading from './Loading';
import NavListLink from './NavListLink';
import { startAddCollection } from '../actions/collections';
import TextInputButtonToggle from './TextInputButtonToggle';

class CollectionsDrawer extends React.Component {
  handleSubmitAddCollection = textInputValue => {
    const collection = {
      dailyStudyLimit: 20,
      cardsToStudyToday: [],
      indexOfCurrentCard: 0,
      name: textInputValue,
      visibilityfilter: 'SHOW_ALL'
    };

    this.props.startAddCollection(collection);
  };

  render() {
    if (this.props.collections) {
      return (
        <WrapperNavDrawer>
          <div className="drawer__section">
            <h2 className="drawer__section-title">Menu</h2>
            <NavListLink
              key={'Dashboard'}
              materialIconName={'home'}
              firstText={'Dashboard'}
              firstLink={`/dashboard`}
            />
          </div>

          <div className="drawer__section">
            <h2 className="drawer__section-title">Collections</h2>
            {this.props.collections.map(collection => (
              <NavListLink
                key={collection.name}
                materialIconName={'edit'}
                firstText={collection.name}
                firstLink={`/collection/${collection.id}`}
                secondText={'study'}
                secondLink={`/collection/study/${collection.id}`}
              />
            ))}

            <TextInputButtonToggle
              key={'TextInputButtonToggle'}
              buttonText="Add collection"
              inputPlaceholder="Collection name"
              handleSubmit={this.handleSubmitAddCollection}
            />
          </div>
        </WrapperNavDrawer>
      );
    }

    return <LoadingPage />;
  }
}

const mapStateToProps = ({ collections }) => ({
  collections
});

const mapDispatchToProps = dispatch => ({
  startAddCollection: collection => dispatch(startAddCollection(collection))
});

const ConnectedCollectionsDrawer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CollectionsDrawer);

export default ConnectedCollectionsDrawer;
