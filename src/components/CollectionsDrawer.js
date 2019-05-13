import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import WrapperNavDrawer from './WrapperNavDrawer';
import LoadingPage from './LoadingPage';
import NavListLink from './NavListLink';
import { startAddCollection } from '../actions/collections';
import TextInputButtonToggle from './TextInputButtonToggle';

const HomeSVG = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    <path d="M0 0h24v24H0z" fill="none" />
  </svg>
);

const EditSVG = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
    <path d="M0 0h24v24H0z" fill="none" />
  </svg>
);

const StudySVG = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
  </svg>
);

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
