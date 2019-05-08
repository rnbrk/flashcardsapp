import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const NavListLink = ({ firstText, firstLink, secondText, secondLink }) => (
  <li>
    <Link to={firstLink}>{firstText}</Link>

    {secondText && secondLink && (
      <div>
        <Link to={secondLink}>{secondText}</Link>
      </div>
    )}
  </li>
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
