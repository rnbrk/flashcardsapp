import React from 'react';
import PropTypes from 'prop-types';

const StudyCard = ({ textFront, textBack, isVisible, handleClick }) => (
  <div>
    <div onClick={handleClick} className="card--content-text card--content-textfront">
      {textFront}
    </div>
    {isVisible && <div className="card--content-text card--content-textback">{textBack}</div>}
  </div>
);

StudyCard.propTypes = {
  textFront: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  textBack: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  isVisible: PropTypes.bool.isRequired
};

export default StudyCard;
