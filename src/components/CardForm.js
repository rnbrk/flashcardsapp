import React from 'react';

import moment from 'moment';
import uuid from 'uuid';

import ActionButton from './ActionButton';

class CardForm extends React.Component {
  state = {
    textFront: '',
    textBack: ''
  };

  componentDidMount() {
    const { textFront, textBack } = this.props;

    this.setState(() => ({
      textFront,
      textBack
    }));
  }

  handleChange = event => {
    const elementName = event.target.name;
    const elementValue = event.target.value;

    if (elementName === 'textFront') {
      this.setState(() => ({
        textFront: elementValue
      }));
    } else if (elementName === 'textBack') {
      this.setState(() => ({
        textBack: elementValue
      }));
    }
  };

  handleSubmit = event => {
    const card = {
      id: uuid(),
      dateAdded: moment()
        .utc()
        .valueOf(),
      textFront: this.state.textFront,
      textBack: this.state.textBack
    };

    this.props.handleSubmit(card);

    event.preventDefault();
  };

  render() {
    const { textFront, textBack } = this.state;

    return (
      <form onSubmit={this.handlesubmit}>
        <label>
          Front
          <textarea value={textFront} onChange={this.handleChange} name="textFront" />
        </label>

        <label>
          Back
          <textarea value={textBack} onChange={this.handleChange} name="textBack" />
        </label>

        <ActionButton handleActionButtonPress={this.handleSubmit} />
      </form>
    );
  }
}

export default CardForm;
