import React from 'react';
import PropTypes from 'prop-types';

export default class ButtonRow extends React.Component {
  onHandleClick = event => {
    const returnValue = event.target.value;
    this.props.onHandleClick(returnValue);
  };

  render() {
    return (
      <div className="button-row">
        {this.props.buttonObjects.map(({ buttonText, returnValue, arrayOfClasses }) => (
          <button
            type="button"
            key={buttonText}
            value={returnValue}
            onClick={this.onHandleClick}
            className={arrayOfClasses.join(' ')}
          >
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
      buttonText: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      returnValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      arrayOfClasses: PropTypes.arrayOf(PropTypes.string)
    })
  ).isRequired,
  onHandleClick: PropTypes.func.isRequired
};
