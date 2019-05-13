import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const NavListLink = ({ firstText, firstLink, secondText, secondLink, materialIconName }) => (
  <div className="drawer__item">
    <Link className="drawer__item-left-side" to={firstLink}>
      {materialIconName && <i className="material-icons md-24">{materialIconName}</i>}
      <div>{firstText}</div>
    </Link>
    {secondText && secondLink && (
      <Link className="drawer__item-right-side" to={secondLink}>
        <h2 className="drawer__section-title">{secondText}</h2>
      </Link>
    )}
  </div>
);

NavListLink.propTypes = {
  firstText: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  firstLink: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  secondText: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  secondLink: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

NavListLink.defaultProps = {
  secondText: '',
  secondLink: '/'
};

export default NavListLink;
