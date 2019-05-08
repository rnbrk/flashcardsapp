import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import NavDrawer from './NavDrawer';
import LoadingPage from './LoadingPage';
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
        <NavDrawer>
          <h2>
            <Link to="/">Home</Link>
          </h2>
          <h2>Collections</h2>
          <ul>
            {this.props.collections.map(collection => (
              <NavListLink
                key={collection.name}
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
          </ul>
        </NavDrawer>
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

const withCollectionsDrawer = Component => {
  return props => (
    <div>
      <ConnectedCollectionsDrawer />
      <Component {...props} />
    </div>
  );
};

export default withCollectionsDrawer;
