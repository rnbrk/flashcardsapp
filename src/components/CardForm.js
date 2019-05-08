import React from 'react';
import PropTypes from 'prop-types';

import ActionButton from './ActionButton';

class CardForm extends React.Component {
  state = {
    textFront: this.props.textFront,
    textBack: this.props.textBack
  };

  handleChange = event => {
    const elementName = event.target.name;
    const elementValue = event.target.value;

    if (elementName === 'textFront') {
      this.setState(() => ({ textFront: elementValue }));
    } else if (elementName === 'textBack') {
      this.setState(() => ({ textBack: elementValue }));
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

CardForm.propTypes = {
  textFront: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  textBack: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  handleSubmit: PropTypes.func.isRequired
};

CardForm.defaultProps = {
  textFront: '',
  textBack: ''
};

export default CardForm;
