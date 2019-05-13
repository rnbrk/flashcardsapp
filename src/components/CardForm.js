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
      <div className="card-collection">
        <div className="card">
          <div className="card--top">Card</div>
          <div className="card--content">
            <form onSubmit={this.handlesubmit}>
              <div className="card--content-text card--content-textfront">
                <label>
                  <textarea
                    className="card--textarea"
                    value={textFront}
                    onChange={this.handleChange}
                    name="textFront"
                  />
                </label>
              </div>
              <div className="card--content-text card--content-textback">
                <label>
                  <textarea
                    className="card--textarea"
                    value={textBack}
                    onChange={this.handleChange}
                    name="textBack"
                  />
                </label>
              </div>
              <ActionButton handleActionButtonPress={this.handleSubmit} />
            </form>
          </div>
        </div>
      </div>
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
