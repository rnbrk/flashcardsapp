import React from 'react';

import moment from 'moment';
import uuid from 'uuid';

import ActionButton from './ActionButton';

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
    const card = {
      id: uuid(),
      dateAdded: moment()
        .utc()
        .valueOf(),
      front: this.state.frontText,
      back: this.state.backText
    };

    this.props.handleSubmit(card);

    event.preventDefault();
  };

  render() {
    const { frontText, backText } = this.state;

    return (
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
    );
  }
}

export default CardForm;
