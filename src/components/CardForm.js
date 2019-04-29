import React from 'react';

import moment from 'moment';
import uuid from 'uuid';

import ActionButton from './ActionButton';

class CardForm extends React.Component {
  state = {
    collectionId: '',
    collectionName: '',
    textFront: '',
    textBack: ''
  };

  componentDidMount() {
    const { collectionId, collectionName, textFront, textBack } = this.props;

    this.setState(() => ({
      collectionId,
      collectionName,
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
      collectionId: this.state.collectionId,
      collectionName: this.state.collectionName,
      dateAdded: moment()
        .startOf('day')
        .valueOf(),
      dateLastStudied: null,
      dateModified: moment()
        .startOf('day')
        .valueOf(),
      dateNextStudy: null,
      easinessFactor: 2.5,
      id: uuid(),
      intervalInDays: 0,
      textBack: this.state.textBack,
      textFront: this.state.textFront,
      timesRepeated: 0
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
