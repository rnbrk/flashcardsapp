import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import LoadingPage from './LoadingPage';
import { startAddCollection } from '../actions/collections';

class NavDrawer extends React.Component {
  DEFAULT_INPUT_FIELD_VALUE = 'Collection name';

  state = {
    inputFieldValue: this.DEFAULT_INPUT_FIELD_VALUE,
    userClickedAddCollection: false
  };

  handleKeyDown = event => {
    if (event.key === 'Escape') {
      event.preventDefault();
      this.handleToggleAddCollection();
    }
  };

  handleSubmitAddCollection = event => {
    event.preventDefault();

    const collection = {
      dailyStudyLimit: 20,
      cardsToStudyToday: [],
      indexOfCurrentCard: 0,
      name: this.state.inputFieldValue,
      visibilityfilter: 'SHOW_ALL'
    };

    this.props.startAddCollection(collection);
    this.handleToggleAddCollection();
  };

  handleToggleAddCollection = () => {
    this.setState(() => ({
      userClickedAddCollection: !this.state.userClickedAddCollection,
      inputFieldValue: this.DEFAULT_INPUT_FIELD_VALUE
    }));
  };

  handleChangeInputAddCollection = event => {
    const inputFieldValue = event.target.value;
    this.setState(() => ({
      inputFieldValue
    }));
  };

  render() {
    if (this.props.collections) {
      return (
        <nav id="drawer">
          <h2>
            <Link to="/">Home</Link>
          </h2>
          <h2>Collections</h2>
          <ul>
            {this.props.collections.map(collection => (
              <li key={collection.id}>
                <Link to={`/collection/${collection.id}`} key={`link-${collection.id}`}>
                  {collection.name}
                </Link>
                <span> | </span>
                <Link to={`/collection/study/${collection.id}`} key={`study-${collection.id}`}>
                  study
                </Link>
              </li>
            ))}

            {this.state.userClickedAddCollection ? (
              <form
                onSubmit={this.handleSubmitAddCollection}
                onBlur={this.handleToggleAddCollection}
                onKeyDown={this.handleKeyDown}
              >
                <input
                  autoFocus
                  onChange={this.handleChangeInputAddCollection}
                  placeholder={this.state.inputFieldValue}
                  type="text"
                />
              </form>
            ) : (
              <button type="button" onClick={this.handleToggleAddCollection}>
                Add collection
              </button>
            )}
          </ul>
        </nav>
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

const ConnectedNavDrawer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NavDrawer);

const withNavDrawer = Component => {
  return props => (
    <div>
      <ConnectedNavDrawer />
      <Component {...props} />
    </div>
  );
};

export default withNavDrawer;
