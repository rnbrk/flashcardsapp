import React from 'react';

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
    this.props.handleSubmit(this.state.textFront, this.state.textBack);
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
