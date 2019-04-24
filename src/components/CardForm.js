import React from 'react';

import { connect } from 'react-redux';
import moment from 'moment';
import uuid from 'uuid';

import ActionButton from './ActionButton';
import { addCard } from '../actions/cards';

class CardForm extends React.Component {
  state = {
    frontText: '',
    backText: ''
  };

  componentDidMount() {
    const { frontText, backText } = this.props;

    this.setState(() => ({
      frontText,
      backText
    }));
  }

  handleChange = event => {
    const elementName = event.target.name;
    const elementValue = event.target.value;

    if (elementName === 'frontText') {
      this.setState(() => ({
        frontText: elementValue
      }));
    } else if (elementName === 'backText') {
      this.setState(() => ({
        backText: elementValue
      }));
    }
  };

  handleSubmit = event => {
    const newCard = {
      id: uuid(),
      dateAdded: moment()
        .utc()
        .unix(),
      front: this.state.frontText,
      back: this.state.backText
    };

    this.props.addCard(newCard);

    event.preventDefault();
  };

  render() {
    const { frontText, backText } = this.state;

    return (
      <div>
        <form onSubmit={this.handlesubmit}>
          <label>
            Front
            <textarea value={frontText} onChange={this.handleChange} name="frontText" />
          </label>

          <label>
            Back
            <textarea value={backText} onChange={this.handleChange} name="backText" />
          </label>

          <ActionButton handleActionButtonPress={this.handleSubmit} />
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addCard: card => dispatch(addCard(card))
});

export default connect(
  undefined,
  mapDispatchToProps
)(CardForm);
