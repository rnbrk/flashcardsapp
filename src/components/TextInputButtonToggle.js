import React from 'react';
import PropTypes from 'prop-types';

export default class TextInputButtonToggle extends React.Component {
  state = {
    textInputValue: this.props.inputPlaceholder,
    buttonIsClicked: false
  };

  handleKeyDown = event => {
    if (event.key === 'Escape') {
      event.preventDefault();
      this.handleToggleAddCollection();
    }
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.handleSubmit(this.state.textInputValue);
    this.handleToggle();
  };

  handleToggle = () => {
    this.setState(() => ({
      buttonIsClicked: !this.state.buttonIsClicked,
      textInputValue: this.props.inputPlaceholder
    }));
  };

  handleTextChange = event => {
    const textInputValue = event.target.value;
    this.setState(() => ({ textInputValue }));
  };

  render() {
    return (
      <div>
        {this.state.buttonIsClicked ? (
          <form
            onSubmit={this.handleSubmit}
            onBlur={this.handleToggle}
            onKeyDown={this.handleKeyDown}
          >
            <input
              autoFocus
              onChange={this.handleTextChange}
              placeholder={this.state.textInputValue}
              type="text"
            />
          </form>
        ) : (
          <button type="button" onClick={this.handleToggle}>
            {this.props.buttonText}
          </button>
        )}
      </div>
    );
  }
}

TextInputButtonToggle.propTypes = {
  buttonText: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  inputPlaceholder: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  handleSubmit: PropTypes.func.isRequired
};

TextInputButtonToggle.defaultProps = {
  inputPlaceholder: ''
};
