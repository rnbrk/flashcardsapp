import React from 'react';
import PropTypes from 'prop-types';

const StudyCard = ({ textFront, textBack, isVisible }) => (
  <div>
    <textarea value={textFront} name="textFront" disabled />

    {isVisible && <textarea value={textBack} name="textBack" disabled />}
  </div>
);

StudyCard.propTypes = {
  textFront: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  textBack: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  isVisible: PropTypes.bool.isRequired
};

export default StudyCard;
