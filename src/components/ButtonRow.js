import React from 'react';
import PropTypes from 'prop-types';

export default class ButtonRow extends React.Component {
  onHandleClick = event => {
    const returnValue = event.target.value;
    this.props.onHandleClick(returnValue);
  };

  render() {
    return (
      <div>
        {this.props.buttonObjects.map(({ buttonText, returnValue }) => (
          <button type="button" key={buttonText} value={returnValue} onClick={this.onHandleClick}>
            {buttonText}
          </button>
        ))}
      </div>
    );
  }
}

ButtonRow.propTypes = {
  buttonObjects: PropTypes.arrayOf(
    PropTypes.shape({
      buttonText: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      returnValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    })
  ).isRequired,
  onHandleClick: PropTypes.func.isRequired
};
